import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import CarouselComponent from "../common/Carousel";
import {
  articles,
  categoriesShortData,
  technologyshortCardData,
} from "../data/categories";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useTheme } from "../theme/ThemeContext";

const HomeScreen = ({ navigation }: any) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { theme } = useTheme();
  const handlePress = () => {
    Toast.show({
      type: "success",
      text1: "Notification",
      text2: "Action in progress ⚡️",
    });
  };

  const handleCategorySelect = async (categoryName: string) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        Alert.alert("No token found. Please log in again.");
        return;
      }

      const response = await axios.get(
        `https://quizz3.onrender.com/api/user/category/${categoryName}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.length > 0) {
        navigation.navigate("QuestionsScreen", { quizzes: response.data });
      } else {
        Alert.alert("No quizzes found for this category.");
      }
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      Alert.alert("Error fetching quizzes for the selected category");
    }
  };

  return (
    <>
      <LinearGradient
        colors={
          Array.isArray(theme.gradientBackground)
            ? theme.gradientBackground
            : [theme.gradientBackground, theme.gradientBackground]
        }
        style={[
          styles.gradientBackground,
          { backgroundColor: theme.backgroundColor },
        ]}
      >
        <SafeAreaView>
          <View style={styles.headerContainer}>
            <View>
              <Text style={[styles.greeting, { color: theme.textColor }]}>
                Hello,
              </Text>
              <Text style={[styles.name, { color: theme.textColor }]}>
                {user ? user.fullName : "Guest"}! 👋
              </Text>
            </View>
            <TouchableOpacity onPress={handlePress}>
              <Icon
                name="bell"
                size={24}
                color="#ffff"
                style={styles.notificationIcon}
              />
            </TouchableOpacity>
          </View>
          <CarouselComponent articles={articles}  />

        </SafeAreaView>
      </LinearGradient>

      <ScrollView
        style={[
          styles.mainContainer,
          { backgroundColor: theme.backgroundColor },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.categorieContainer}>
          <Text style={[styles.heading, { color: theme.textColor }]}>
            Categories
          </Text>
          <Text
            style={[styles.viewText, { color: theme.textColor }]}
            onPress={() => navigation.navigate("Categories")}
          >
            View all
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >
          <View style={styles.categoryList}>
            {categoriesShortData.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.categoryItem, { backgroundColor: theme.card }]}
                onPress={() => handleCategorySelect(category.name)}
              >
                <Image source={category.image} style={styles.categoryImage} />
                <Text style={[styles.categoryText, { color: theme.text }]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View style={styles.technologyContainer}>
          <View style={styles.categorieContainer}>
            <Text style={[styles.heading, { color: theme.textColor }]}>
              Technology Quiz
            </Text>
            <Text
              style={[styles.viewText, { color: theme.textColor }]}
              onPress={() => navigation.navigate("TechnologyCardScreen")}
            >
              View all
            </Text>
          </View>
          <View style={styles.cardContainer}>
            {technologyshortCardData.map((card, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.card, { backgroundColor: theme.card }]}
                onPress={() => navigation.navigate("StaticQuizOverview")}
              >
                <Image source={card.image} style={styles.categoryCardImage} />
                <View style={styles.cardDescription}>
                  <Text style={[styles.title, { color: theme.text }]}>
                    {card.title}
                  </Text>
                  <Text
                    style={[styles.description, { color: theme.textColor }]}
                  >
                    {card.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    height: Platform.OS === "ios" ? 360 : 310,
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
  },
  safeArea: {},
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  notificationIcon: {
    marginRight: 15,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  mainContainer: {
    paddingHorizontal: 15,
    backgroundColor: "#ffffff",
  },
  categorieContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingVertical: 10,
  },
  technologyContainer: {
    marginTop: 25,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  viewText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  categoryScroll: {
    flexDirection: "row",
  },
  categoryList: {
    flexDirection: "row",
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginBottom: 10,
  },
  categoryItem: {
    width: 100,
    height: 130,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight: 8,
    shadowColor: "#000",
    shadowOpacity: Platform.OS === "ios" ? 0.1 : 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: Platform.OS === "ios" ? 0.7 : 0.9,
    borderColor: "#f0f0f0",
  },
  categoryText: {
    marginTop: 5,
    fontSize: 14,
    color: "#000",
  },
  cardContainer: {
    flexDirection: "column",
  },
  card: {
    flexDirection: "row",
    width: "100%",
    height: 130,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 10,
    padding: 15,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  categoryCardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  cardDescription: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000",
  },
  description: {
    fontSize: 16,
    color: "#666",
  },
});

export default HomeScreen;
