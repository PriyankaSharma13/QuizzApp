import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImagePickerComponent from "../../common/ImagePicker";
import Toast from "react-native-toast-message";
import { useTheme } from "../../theme/ThemeContext";

const EditProfile = ({ route, navigation }: any) => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const { profileData } = route.params;
  console.log("profileData: ", profileData);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    profileData?.user?.profilePic?.startsWith("data:image")
      ? profileData?.user?.profilePic
      : undefined
  );

  const initialValues = {
    fullName: profileData?.user?.fullName,
    username: profileData?.user?.username,
    email: profileData?.user?.email,
    phoneNumber: profileData?.user?.phoneNumber,
  };

  const handleSave = async (values: any) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "No token found, please log in again.",
        });
        return;
      }

      const formData = new FormData();
      formData.append("fullName", values.fullName);
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("phoneNumber", values.phoneNumber);

      if (selectedImage) {
        const imageType = selectedImage.endsWith(".png") ? "image/png" : "image/jpeg";
formData.append("profilePic", {
  uri: selectedImage,
  name: imageType,
  type: imageType,
});

      }
      console.log("Selected Image URI:", selectedImage);

      console.log("FormData Content:", formData);

      // https://quizz3.onrender.com
      const response = await axios.put(
        "http://localhost:3000/api/user/profile/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 && response.data) {
        const updatedProfile = response.data.profile || response.data;
        console.log("updatedProfile: ", updatedProfile);
        await AsyncStorage.setItem(
          "userProfile",
          JSON.stringify(updatedProfile)
        );

        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Profile updated successfully!",
        });

        navigation.navigate("MyProfile", { updatedProfile });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to update profile.",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "An unexpected error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <ScrollView>
        <Formik initialValues={initialValues} onSubmit={handleSave}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.formContainer}>
              <ImagePickerComponent
                onImageSelected={(images) => {
                  console.log("Selected Image: ", images[0]?.uri); // Debugging
                  if (images.length > 0) setSelectedImage(images[0].uri);
                }}
              />

              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: theme.text }]}>
                  Full Name
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      color: theme.text,
                      backgroundColor: theme.backgroundColor,
                    },
                  ]}
                  onChangeText={handleChange("fullName")}
                  onBlur={handleBlur("fullName")}
                  value={values.fullName}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: theme.text }]}>
                  Username
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      color: theme.text,
                      backgroundColor: theme.backgroundColor,
                    },
                  ]}
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                />
              </View>
              {/* Email */}
              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: theme.text }]}>Email</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      color: theme.text,
                      backgroundColor: theme.backgroundColor,
                    },
                  ]}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                />
              </View>

              {/* Phone Number */}
              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: theme.text }]}>
                  Phone Number
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      color: theme.text,
                      backgroundColor: theme.backgroundColor,
                    },
                  ]}
                  onChangeText={handleChange("phoneNumber")}
                  onBlur={handleBlur("phoneNumber")}
                  value={values.phoneNumber}
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                />
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleSubmit()}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Save</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  formContainer: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#FF681F",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default EditProfile;
