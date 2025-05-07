import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  HelpCenterData,
  notificationData,
  settingsData,
} from "../../data/profiledata"; 
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import { logoutApi } from "../../redux/Slice/IndexApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { loginSuccess, setToken } from "../../redux/Slice/authSlice";
import { useTheme } from "../../theme/ThemeContext";

export function Settings({ navigation }: any) {
  const {theme} = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  

  const handleLogout = async () => {
    try {
      const result = await dispatch(logoutApi()).unwrap();

      Toast.show({
        type: "success",
        position: "top",
        text1: "Logout Successful",
        text2: "You have been logged out successfully!",
      });

      navigation.navigate("Login");
    } catch (error: any) {
      console.error("Logout failed:", error);

      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Logout Failed",
        text2: error || "An error occurred while logging out.",
      });

      if (error === "Unauthorized access, please login first") {
        dispatch(loginSuccess(null));
        dispatch(setToken(null));
        navigation.navigate("Login");
      }
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.listContainer}>
        {settingsData.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.detailsContainer, {backgroundColor: theme.card}]}
            onPress={() => {
              if (item.label === "Privacy Policy") {
                navigation.navigate("PrivacyPolicyScreen");
              } else if (item.label === "Terms & Conditions") {
                navigation.navigate("TermsConditionScreen");
              } else if (item.label === "Help Center") {
                navigation.navigate("HelpCenterScreen");
              } else if (item.label === "About Us") {
                navigation.navigate("AboutUsScreen");
          
              } else if (item.label === "Logout") {
                handleLogout();
              }
            }}
          >
            <View style={[styles.iconCircle, {backgroundColor : theme.card}]} >
              <Icon name={item.icon} size={24} color={theme.iconColor} />
            </View>
            <Text style={[styles.detailsHeader, {color: theme.textColor}]}>{item.label}</Text>
            <Icon name="chevron-right" size={22} color="#888" />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

export function Notification({ navigation }: any) {
  const { theme } = useTheme()
  return (
    <ScrollView contentContainerStyle={[styles.scrollNoteContent, { backgroundColor: theme.backgroundColor }] } >
      {notificationData.map((item, index) => (
        <View   style={[styles.notificationContainer, { backgroundColor: theme.card }]} key={index}>
          <View style={styles.icon}>
            <Icon name={item.icon} size={40} color={"orange"} />
          </View>
          <Text style={[styles.notificationHeader, { color: theme.text }]}>{item.label}</Text>
          <Text  style={[styles.notificationdesc, { color: theme.text }]}>{item.description}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.buttonText}>Go to Home</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const HelpCenterScreen = ({ navigation }: any) => {
 
    const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.safeNoteContent, {backgroundColor : theme.backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {HelpCenterData.map((item, index) => (
          <View style={[styles.notificationContainer, {backgroundColor : theme.card }]} key={index}>
            <View style={styles.icon}>
              <Icon name={item.icon} size={40} color={"#FF681F"} />
            </View>
            <Text style={[styles.notificationHeader,{color : theme.textColor }]}>{item.label}</Text>
            <Text style={[styles.notificationdesc ,{color : theme.text }]}>{item.description}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  safeNoteContent: {
    flex: 1,
    paddingTop: 20,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  scrollNoteContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  notificationContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
    marginBottom: 20,
    alignItems: "center",
    gap: 15,
  },
  icon: {
    backgroundColor: "#FAD5A5",
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
    marginBottom: 5,
  },
  notificationdesc: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 15,
  },
  listContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  button: {
    padding: 12,
    backgroundColor: "#FF681F",
    borderRadius: 5,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffe3da",
    justifyContent: "center",
    alignItems: "center",
  },
  detailsHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 15,
    flex: 1,
  },
});

export default HelpCenterScreen;
