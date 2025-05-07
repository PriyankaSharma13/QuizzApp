import React, { useState } from "react";
import { Animated, KeyboardAvoidingView, Platform } from "react-native";
import {
  Image,
  Alert,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import { useTheme } from "../../theme/ThemeContext";
import SignatureCapture from "../../common/Signature";

function RatingScreen({ navigation }:any) {
  const [rating, setRating] = useState(0);
  const animatedValue = new Animated.Value(1);
  const { theme } = useTheme();

  const handlePress = () => {
    if (rating > 0) {
      Alert.alert("Thank You!", `You rated: ${rating} stars.`, [
        {
          text: "OK",
          onPress: () => navigation.navigate('Profile'), 
        },
      ]);
    } else {
      Alert.alert("Oops!", "Please select a rating before submitting.");
    }
  };
  

 

  const animateStar = () => {
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <View
        style={[
          styles.ratingContainerMain,
          { backgroundColor: theme.cardBackgroundColor },
        ]}
      >
        <LinearGradient
          colors={["#ff7e5f", "#feb47b"]}
          style={styles.gradientBackground}
        >
          <Image
            source={require("../../assets/card/profile.png")}
            style={styles.avatar}
          />
        </LinearGradient>

        <Text style={[styles.title, { color: theme.text }]}>Quiz App</Text>
        <Text style={styles.subtitle}>Please rate your experience</Text>

        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => {
                setRating(star);
                animateStar();
              }}
              activeOpacity={0.7}
            >
              <Animated.View
                style={{
                  transform: [{ scale: rating === star ? animatedValue : 1 }],
                }}
              >
                <Icon
                  name={star <= rating ? "star" : "star-o"}
                  size={50}
                  color="#FFD700"
                  style={styles.starIcon}
                />
              </Animated.View>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Display Selected Rating */}
        {rating > 0 && (
          <Text style={[styles.ratingText, { color: theme.text }]}>
            You rated: {rating} star{rating !== 1 && "s"}
          </Text>
        )}

        

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handlePress}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gradientBackground: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -50,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  ratingContainerMain: {
    backgroundColor: "#fff",
    width: "85%",
    borderRadius: 15,
    paddingVertical: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 5,
  },
  backButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    color: "#ff7e5f",
    marginBottom: 20,
    textAlign: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  starIcon: {
    marginHorizontal: 6,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#4CAF50",
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default RatingScreen;
