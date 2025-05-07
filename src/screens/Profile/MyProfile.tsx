import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../../theme/ThemeContext";
import { useFocusEffect } from "@react-navigation/native";

const MyProfile = ({ navigation }: any) => {
  const { theme } = useTheme();

  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [])
  );

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      console.log("token: ", token);

      if (token) {
        const response = await axios.get(
          "http://localhost:3000/api/user/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("API Response:", response.data);

        if (response.data?.user) {
          setUserData(response.data.user);
          await AsyncStorage.setItem(
            "userProfile",
            JSON.stringify(response.data.user)
          );
        }
      } else {
        console.warn("No token found");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Updated userData:", {
      ...userData,
      image: userData?.image?.slice(0, 50) + "...",
    });
  }, [userData]);

  useEffect(() => {
    const loadProfileFromCache = async () => {
      setLoading(true);
      const cachedProfile = await AsyncStorage.getItem("userProfile");
      console.log("Cached Profile:", cachedProfile);
      if (cachedProfile) {
        setUserData(JSON.parse(cachedProfile));
      }
      fetchProfile();
    };
    loadProfileFromCache();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: "My Profile",
      headerRight: () => (
        <Icon
          name="edit"
          size={24}
          color={theme.text}
          style={{ marginRight: 20 }}
          onPress={() => {
            navigation.navigate("EditProfile", { profileData: userData });
          }}
        />
      ),
    });
  }, [navigation, userData, theme.text]);

  if (loading) {
    return (
      <SafeAreaView
        style={[
          styles.loaderContainer,
          { backgroundColor: theme.backgroundColor },
        ]}
      >
        <ActivityIndicator size="large" color={theme.text} />
      </SafeAreaView>
    );
  }
  console.log("gfgyh", userData.user.profilePic);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={styles.profileContainer}>
        <Image
          source={
            userData?.profilePic
              ? { uri: `data:image/jpeg;base64,${userData.user.profilePic}` }
              : require("../../assets/card/profile.png")
          }
          style={styles.avatar}
        />
      </View>

      <View style={[styles.detailsContainer, { backgroundColor: theme.card }]}>
        <Icon
          name="user-circle"
          size={20}
          color={theme.text}
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={[styles.detailsHeader, { color: theme.text }]}>
            Name
          </Text>
          <Text style={[styles.detailsDesc, { color: theme.text }]}>
            {userData?.user.fullName}
          </Text>
        </View>
      </View>

      <View style={[styles.detailsContainer, { backgroundColor: theme.card }]}>
        <Icon
          name="envelope"
          size={20}
          color={theme.text}
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={[styles.detailsHeader, { color: theme.text }]}>
            Email Address
          </Text>
          <Text style={[styles.detailsDesc, { color: theme.text }]}>
            {userData?.user.email}
          </Text>
        </View>
      </View>

      <View style={[styles.detailsContainer, { backgroundColor: theme.card }]}>
        <Icon name="user" size={20} color={theme.text} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={[styles.detailsHeader, { color: theme.text }]}>
            UserName
          </Text>
          <Text style={[styles.detailsDesc, { color: theme.text }]}>
            {userData?.user.username}
          </Text>
        </View>
      </View>

      <View style={[styles.detailsContainer, { backgroundColor: theme.card }]}>
        <Icon name="phone" size={20} color={theme.text} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={[styles.detailsHeader, { color: theme.text }]}>
            Phone Number
          </Text>
          <Text style={[styles.detailsDesc, { color: theme.text }]}>
            {userData?.user.phoneNumber}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 10,
    marginTop: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  detailsContainer: {
    width: "90%",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  icon: {
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  detailsHeader: {
    fontSize: 22,
    fontWeight: "bold",
  },
  detailsDesc: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default MyProfile;
