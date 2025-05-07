import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import { useTheme } from "../theme/ThemeContext";

const QuizOverview = ({ route }: any) => {
  const { resultData } = route.params;
  console.log("resultDatartrtrt: ", resultData);
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <FlatList
        data={resultData.questionDetails}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={[styles.questionCard, { backgroundColor: theme.card }]}>
            <Text style={[styles.questionText, { color: theme.textColor }]}>
              {item.questionText}
            </Text>
            <Text style={[styles.optionheading, { color: theme.text }]}>
              Options
            </Text>
            {item.options.map((option: string, index: number) => {
              const isUserAnswer = option === item.userAnswer;
              const isCorrectAnswer = option === item.correctAnswer;
              const isSelected = isUserAnswer || isCorrectAnswer;

              return (
                <View key={index} style={styles.optionContainer}>
                  <View
                    style={[
                      styles.radioCircle,
                      isSelected && {
                        backgroundColor: isCorrectAnswer
                          ? theme.correctAnswerColor
                          : theme.incorrectAnswerColor,
                        borderColor: isCorrectAnswer
                          ? theme.correctAnswerColor
                          : theme.incorrectAnswerColor,
                      },
                    ]}
                  />
                  <Text
                    style={[
                      styles.optionText,
                      { color: theme.text },
                      isCorrectAnswer && {
                        color: theme.correctAnswerColor,
                        fontWeight: "bold",
                      },
                      isUserAnswer &&
                        !isCorrectAnswer && {
                          color: theme.incorrectAnswerColor,
                          fontWeight: "bold",
                        },
                    ]}
                  >
                    {option}
                  </Text>
                </View>
              );
            })}

            <Text
              style={[
                styles.resultText,
                item.isCorrect
                  ? { color: theme.correctAnswerColor }
                  : { color: theme.incorrectAnswerColor },
              ]}
            >
              {item.isCorrect ? "✅ Correct" : "❌ Incorrect"}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={
          resultData.signature ? (
            <View
              style={[
                styles.signatureContainer,
                { backgroundColor: theme.backgroundColor },
              ]}
            >
              <Text style={[styles.signatureHeading, { color: theme.textColor }]}>
                Signature {resultData.fullName}
              </Text>
      
              <Image
                source={{ uri: resultData.signature }}
                style={styles.signatureImage}
                resizeMode="contain"
              />
            </View>
          ) : null
        }
      />
 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  questionCard: {
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: 8,
  },
  optionheading: {
    fontSize: 14,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  resultText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  signatureContainer: {
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    borderTopColor: "red",
    borderTopWidth: 2,
  },
  signatureHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  signatureImage: {
    width: 150,
    height: 100,
    marginTop: 5,
  },
});

export default QuizOverview;
