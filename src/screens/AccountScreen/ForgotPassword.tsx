import { Formik } from "formik";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { forgotPasswordApi } from "../../redux/Slice/IndexApi";
import { useTheme } from "../../theme/ThemeContext";

const ForgotSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please Enter your email address"),
});

const ForgotPassword = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();
  // const handleForgotPassword = async (values: { email: string }) => {
  //   setLoading(true);
  //   try {
  //     await dispatch(forgotPasswordApi(values)).unwrap();
  //     Alert.alert("Success", "A verification code has been sent to your email.");
  //     navigation.navigate('Verification', { email: values.email });
  //   } catch (error: any) {
  //     const errorMessage = error?.data?.message || error?.message || "Something went wrong, please try again.";
  //     Alert.alert("Error", errorMessage);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleForgotPassword = async (values: { email: string }) => {
    setLoading(true);
    try {
      await dispatch(forgotPasswordApi(values)).unwrap();
      Alert.alert(
        "Success",
        "A verification code has been sent to your email."
      );
      navigation.navigate("Verification", { email: values.email });
    } catch (error: any) {
      Alert.alert("Error", error || "Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <Formik
        initialValues={{ email: "" }}
        validationSchema={ForgotSchema}
        onSubmit={handleForgotPassword}
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
              <Text style={[styles.subHeading, { color: theme.text }]}>
                Enter your email for the verification process. We will send a
                4-digit code to your email.
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

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#000" />
              ) : (
                <Text style={styles.buttonText}>Send</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </Formik>
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
  subHeading: {
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    marginBottom: 14,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 18,
    color: "#000",
  },
  error: {
    fontSize: 14,
    color: "red",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#FF681F",
    paddingVertical: 15,
    borderRadius: 15,
    width: "100%",
    alignSelf: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default ForgotPassword;
