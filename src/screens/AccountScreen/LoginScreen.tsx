import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { loginResponse } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { loginApi } from "../../redux/Slice/IndexApi";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "../../theme/ThemeContext";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please Enter your email address"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Please Enter your Password"),
});
const LoginScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const { loading } = useSelector((state: RootState) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const handleLoginForm = async (values: loginResponse) => {
    try {
      const response = await dispatch(loginApi(values)).unwrap();
      console.log('response: ', response);

      if (response?.token) {
        await AsyncStorage.multiSet([
          ["userToken", response.token],
          ["fullName", response.data.fullName],
          ["email", response.data.email],
        ]);

        Toast.show({
          type: "success",
          position: "top",
          text1: "Login Successful!",
          text2: "You have successfully logged in.",
        });
        navigation.navigate("MindblowingScreen");
      } else {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Login Failed",
          text2: "Invalid credentials or server error.",
        });
      }
    } catch (err: any) {
      console.error("Login error:", err);
      Toast.show({
        type: "error",
        position: "top",
        text1: "Login Failed",
        text2: err?.message || "An error occurred",
      });
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleLoginForm}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.formContainer}>
            <View style={styles.headingContainer}>
              <Text style={[styles.heading, { color: theme.text }]}>
                Log in
              </Text>
              <Text style={[styles.subHeading, { color: theme.text }]}>
                Welcome back! Log in to your account
              </Text>
            </View>
            <Text style={[styles.label, { color: theme.text }]}>Email</Text>
            <TextInput
              style={[
                styles.input,
                { color: theme.text, backgroundColor: theme.backgroundColor },
              ]}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType="email-address"
              placeholder="Enter your email"
            />
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            <Text style={[styles.label, { color: theme.text }]}>Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  { color: theme.text, backgroundColor: theme.backgroundColor },
                ]}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry={!showPassword}
                placeholder="Enter your password"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.iconContainer}
              >
                <Icon
                  name={showPassword ? "visibility-off" : "visibility"}
                  size={24}
                  color="#333"
                />
              </TouchableOpacity>
            </View>
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, loading && { opacity: 0.6 }]}
              onPress={() => handleSubmit()}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
               )} 
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      <View style={styles.footerContainer}>
        <Text style={[styles.footerText, { color: theme.text }]}>
          Don't have an account?{" "}
          <Text
            style={styles.signUpText}
            onPress={() => navigation.navigate("Register")}
          >
            Sign up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  headingContainer: {
    paddingVertical: 30,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    textAlign: "left",
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "600",
    color: "#000",
  },
  inputContainer: {
    position: "relative",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 8,
    fontSize: 18,
    color: "#000",
  },
  iconContainer: {
    position: "absolute",
    right: 25,
    top: "40%",
    transform: [{ translateY: -12 }],
  },
  error: {
    fontSize: 14,
    color: "red",
    marginBottom: 10,
  },
  forgotPassword: {
    textAlign: "right",
    marginBottom: 20,
    fontSize: 16,
    marginTop: 20,
    color: "#FF681F",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#FF681F",
    paddingVertical: 15,
    borderRadius: 15,
    width: "100%",
    alignSelf: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  footerContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  footerText: {
    fontSize: 16,
    // color: '#777',
  },
  signUpText: {
    color: "#FF681F",
    fontWeight: "bold",
  },
});

export default LoginScreen;
