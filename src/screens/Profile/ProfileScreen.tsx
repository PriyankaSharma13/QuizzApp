
import React from "react";
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";
import { details } from "../../data/profiledata";
import { useTheme } from "../../theme/ThemeContext";

function ProfileScreen({navigation}:any) {
  const { theme, toggleTheme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <LinearGradient colors={["#ff7e5f", "#feb47b"]} style={styles.gradientBackground}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Profile</Text>
      </LinearGradient>

      <View style={styles.listContainer}>
        {details.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.detailsContainer, { backgroundColor: theme.card }]}
            onPress={() => navigation.navigate(item.route as never)}
          >
            <View style={[styles.iconCircle, { backgroundColor: theme.card }]}>
              <Icon name={item.icon} size={24} color={theme.iconColor} />
            </View>
            <Text style={[styles.detailsHeader, { color: theme.text }]}>{item.label}</Text>
            <Icon name="chevron-right" size={22} color={theme.text} />
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[styles.detailsContainer, { backgroundColor: theme.card }]}
          onPress={toggleTheme}
        >
          <View style={[styles.iconCircle, { backgroundColor: theme.card }]}>
            <Icon name="dark-mode" size={24} color={theme.iconColor} />
          </View>
          <Text style={[styles.detailsHeader, { color: theme.text }]}>
        {theme.mode === "light" ? "Dark Mode" : "Light Mode"}
      </Text>
      <Icon name={theme.mode === "light" ? "toggle-off" : "toggle-on"} size={30} color={theme.iconColor} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
  },
  listContainer: {
    marginTop: -30,
    paddingHorizontal: 20,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
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

export default ProfileScreen;
