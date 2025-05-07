import React, { useEffect, useState } from "react";
import {
  Alert,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

import PieChart from "../common/pieChart";
import { useSharedValue, withTiming } from "react-native-reanimated";
import ConfettiCannon from "react-native-confetti-cannon";
import img from "../assets/card/startquize.jpg";
import { useTheme } from "../theme/ThemeContext";

const ResultQuizScreen = ({ route, navigation }: any) => {
  const { theme } = useTheme();

  const { resultData } = route.params;
  console.log('resultData: ', resultData);
  const progress = useSharedValue(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [confettiBursts, setConfettiBursts] = useState<number>(0);

  useEffect(() => {
    if (resultData?.totalPercentage) {
      progress.value = withTiming(resultData.totalPercentage / 100, {
        duration: 1500,
      });

      if (resultData.totalPercentage >= 80) {
        setShowCelebration(true);
      }
    }
  }, [resultData, progress]);

  const handleOverviewPress = () => {

    navigation.navigate("QuizOverview", { resultData });
  };

  const handlePressBack = () => {
    navigation.navigate("Categories");
  };

  return (
    <>
      <ImageBackground
        source={img}
        style={[
          styles.topContainer,
          { backgroundColor: theme.backgroundColor },
        ]}
        resizeMode="cover"
      >
        <PieChart progress={progress} />
        {showCelebration &&
          Array.from({ length: confettiBursts }).map((_, index) => (
            <ConfettiCannon
              key={index}
              count={300}
              origin={{ x: Math.random() * 300, y: -10 }}
              fadeOut={true}
            />
          ))}
      </ImageBackground>

      <SafeAreaView
        style={[
          styles.mainContainer,
          { backgroundColor: theme.backgroundColor },
        ]}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {resultData && (
            <>
              <Text style={[styles.headerText, { color: theme.textColor }]}>
                Quiz Results{" "}
                <Text style={styles.quizTitle}>
                  {" "}
                  for {resultData.quizId.title}
                </Text>
              </Text>

              <View style={styles.bodyContainer}>
                <View
                  style={[
                    styles.leftSection,
                    { backgroundColor: theme.cardBackgroundColor },
                  ]}
                >
                  <Text
                    style={[styles.leftHeading, { color: theme.textColor }]}
                  >
                    Total Questions
                  </Text>
                  <Text style={[styles.leftDesc, { color: theme.textColor }]}>
                    {resultData.totalQuestions}
                  </Text>
                </View>
                <View
                  style={[
                    styles.rightSection,
                    { backgroundColor: theme.cardBackgroundColor },
                  ]}
                >
                  <Text
                    style={[styles.rightHeading, { color: theme.textColor }]}
                  >
                    Total Points
                  </Text>
                  <Text style={[styles.rightDesc, { color: theme.textColor }]}>
                    {resultData.totalScore}
                  </Text>
                </View>
              </View>

              <View style={styles.bodyContainer}>
                <View
                  style={[
                    styles.leftSection,
                    { backgroundColor: theme.cardBackgroundColor },
                  ]}
                >
                  <Text
                    style={[styles.leftHeading, { color: theme.textColor }]}
                  >
                    Correct Answers
                  </Text>
                  <Text style={[styles.leftDesc, styles.correctText]}>
                    {resultData.correctAnswer}
                  </Text>
                </View>
                <View
                  style={[
                    styles.rightSection,
                    { backgroundColor: theme.cardBackgroundColor },
                  ]}
                >
                  <Text
                    style={[styles.rightHeading, { color: theme.textColor }]}
                  >
                    Incorrect Answers
                  </Text>
                  <Text style={[styles.rightDesc, styles.incorrectText]}>
                    {resultData.incorrectAnswer}
                  </Text>
                </View>
              </View>

              <View style={styles.bodyContainer}>
                <View
                  style={[
                    styles.leftSection,
                    { backgroundColor: theme.cardBackgroundColor },
                  ]}
                >
                  <Text
                    style={[styles.leftHeading, { color: theme.textColor }]}
                  >
                    Pass/Fail
                  </Text>
                  <Text style={[styles.leftDesc, styles.skippedText]}>
                    {resultData.passFail}
                  </Text>
                </View>
                <View
                  style={[
                    styles.rightSection,
                    { backgroundColor: theme.cardBackgroundColor },
                  ]}
                >
                  <Text
                    style={[styles.rightHeading, { color: theme.textColor }]}
                  >
                    Completion
                  </Text>
                  <Text style={[styles.rightDesc, { color: theme.textColor }]}>
                    {resultData.totalPercentage}%
                  </Text>
                </View>
              </View>
            </>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.leftButton,
                { backgroundColor: theme.cardBackgroundColor },
              ]}
              onPress={handleOverviewPress}
            >
              <Text style={[styles.leftButtonText, { color: theme.textColor }]}>
                Quiz Overview
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rightButton}
              onPress={handlePressBack}
            >
              <Text style={styles.rightButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: "#000",
  },
  safeAreaContainer: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  resultText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  heading: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  mainContainer: {
    flex: 1,
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
    marginBottom: 20,
  },
  quizTitle: {
    fontSize: 28,
    fontWeight: "500",
    color: "#FF681F",
    fontStyle: "italic",
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
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    marginBottom: 10,
  },
  leftDesc: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },
  rightHeading: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
  },
  rightDesc: {
    fontSize: 20,
    fontWeight: "700",
  },
  correctText: {
    color: "green",
  },
  incorrectText: {
    color: "red",
  },
  skippedText: {
    color: "#FFA500",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  leftButton: {
    flex: 1,
    // backgroundColor: "#ffffff",
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  rightButton: {
    flex: 1,
    backgroundColor: "#FF681F",
    paddingVertical: 12,
    borderRadius: 8,
  },
  leftButtonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  rightButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default ResultQuizScreen;
