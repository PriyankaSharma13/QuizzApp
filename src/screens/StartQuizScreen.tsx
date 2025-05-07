import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DigitalSignature from "../common/Signature";
import SignatureCapture from "../common/Signature";

const StartQuizScreen = ({ navigation, route }: any) => {
  const { quizArticleData } = route.params;
  console.log("quizArticleData: ", quizArticleData);
  const [signature, setSignature] = useState<string | null>(null);
  const scrollViewRef: any = useRef(null);
  const handlePress = () => {
    navigation.navigate("Categories");
  };

  const handlePressBack = () => {
    navigation.goBack();
  };

  const handleCanvasBegin = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.setNativeProps({ scrollEnabled: false });
    }
  };

  const handleCanvasEnd = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.setNativeProps({ scrollEnabled: true });
    }
  };
  return (
    <>
      <ImageBackground
        source={quizArticleData.backgroundImage}
        style={styles.topContainer}
        resizeMode="cover"
      >
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={handlePressBack}
        >
          <Icon name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
      </ImageBackground>

      <SafeAreaView style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{quizArticleData.title}</Text>
          </View>

          <View style={styles.bodyContainer}>
            <View style={styles.leftSection}>
              <Text style={styles.leftHeading}>
                {/* {quizArticleData?.questions?.length || 0} */}
                10 to 15
              </Text>
              <Text style={styles.leftDesc}>Questions</Text>
            </View>
            <View style={styles.rightSection}>
              <Text style={styles.rightHeading}>1 Points</Text>
              <Text style={styles.rightDesc}>Right Answer</Text>
            </View>
          </View>
          <View style={styles.bodyContainer}>
            <View style={styles.leftSection}>
              <Text style={styles.leftHeading}>
                {quizArticleData?.wrongAnswerPoints || 0}
              </Text>
              <Text style={styles.leftDesc}>Wrong Answer</Text>
            </View>
            <View style={styles.rightSection}>
              <Text style={styles.rightHeading}>
                {/* {quizArticleData?.totalTime || '0 min'} */}5 mint
              </Text>
              <Text style={styles.rightDesc}>Total Time</Text>
            </View>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>
              {quizArticleData?.description}
            </Text>
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            {/* <SignatureCapture /> */}
          </KeyboardAvoidingView>

          <TouchableOpacity style={styles.startButton} onPress={handlePress}>
            <Text style={styles.startButtonText}>Select Categories Quiz</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    height: 280,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  iconContainer: {
    position: "absolute",
    top: 50,
    left: 16,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 8,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  container: {
    padding: 16,
  },
  headerContainer: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  bodyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  leftSection: {
    flex: 1,
    marginRight: 10,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 5,
    alignItems: "center",
    shadowColor: "#ddd",
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  rightSection: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 5,
    alignItems: "center",
    shadowColor: "#ddd",
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  leftHeading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
  },
  leftDesc: {
    fontSize: 16,
    fontWeight: "500",
    color: "#777",
  },
  rightHeading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
  },
  rightDesc: {
    fontSize: 16,
    fontWeight: "500",
    color: "#777",
  },
  descriptionContainer: {
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 8,
    shadowColor: "#ddd",
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  descriptionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
    color: "#000",
  },
  descriptionText: {
    fontSize: 18,
    lineHeight: 22,
    color: "#777",
  },
  startButton: {
    backgroundColor: "#FF681F",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default StartQuizScreen;
