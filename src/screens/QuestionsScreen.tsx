import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import ModelPopUp from "../common/PopUp";
import Toast from "react-native-toast-message";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../theme/ThemeContext";
import SignatureCapture from "../common/Signature";

const QuestionsScreen = ({ route }: any) => {
  const { theme } = useTheme();
  const { quizzes } = route.params;
  const quizData = quizzes?.length > 0 ? quizzes[0] : null;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>(
    Array(quizData?.questions?.length || 0).fill("")
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [sentquizid, setSentquizid] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [questionTimers, setQuestionTimers] = useState<number[]>([]);
  const questions = quizData?.questions || [];
  const startTimeRef = React.useRef<number>(Date.now());

  const currentQuestion = questions[currentQuestionIndex];
  const questionText = currentQuestion?.text || "";
  const options = currentQuestion?.options || [];

  useEffect(() => {
    startTimeRef.current = Date.now();
  }, [currentQuestionIndex]);




  const handleOptionPress = (option: string) => {
    setSelectedOption(option);
  };

  const handleSubmitQuiz = async () => {
    if (!signature) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Please add your signature before submitting!",
        visibilityTime: 2000,
      });
      return;
    }
    const totalTimeSpent = [...questionTimers, Date.now() - startTimeRef.current];
    console.log("Total Time Spent:", totalTimeSpent.reduce((sum, time) => sum + time, 0));

    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await axios.post(
        "https://quizz3.onrender.com/api/submit/quiz",
        {
          quizId: quizData?._id,
          answers,
          signature,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 30000,
        }
      );
  
      if (response.status === 200) {
        setSentquizid(response.data.result._id);
        setModalVisible(true);
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Quiz submitted successfully!",
          visibilityTime: 2000,
        });
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Failed to submit quiz.",
        visibilityTime: 2000,
      });
    }
  };

  const handleNextQuestion = () => {
    if (!selectedOption) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Please select an option!",
        visibilityTime: 2000,
      });
      return;
    }

    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestionIndex] = selectedOption;

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        handleSubmitQuiz();
      }

      return newAnswers;
    });

    setSelectedOption(null);
  };

  const timeSpent = (Date.now() - startTimeRef.current) / 1000; 
  console.log('timeSpent: ', timeSpent);

  const handleModalClose = () => {
    setModalVisible(false);
    resetQuiz();
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setAnswers(Array(questions.length).fill(""));
  };

  const formatTimeSpent = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };
  
  console.log("Time Spent:", formatTimeSpent(timeSpent));
  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          { flexGrow: 1, paddingBottom: 50 },
          { backgroundColor: theme.backgroundColor },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.innerContainer}>
          <Text style={[styles.questionCounter, { color: theme.textColor }]}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </Text>

          <Text style={[styles.questionText, { color: theme.textColor }]}>
            {questionText}
          </Text>

          <View style={styles.optionsContainer}>
            {options.map((option: string, index: number) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedOption === option && styles.selectedOption,
                ]}
                onPress={() => handleOptionPress(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {currentQuestionIndex === questions.length - 1 && (
          <View>
            <SignatureCapture
              onSave={(sig) => {
                const formattedSignature = `data:image/png;base64,${sig}`;
                console.log("formattedSignature: ", formattedSignature);
                setSignature(formattedSignature);
              }}
            />
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.button,
            (!selectedOption ||
              (currentQuestionIndex === questions.length - 1 && !signature)) &&
              styles.disabledButton,
          ]}
          onPress={handleNextQuestion}
          disabled={
            !selectedOption ||
            (currentQuestionIndex === questions.length - 1 && !signature)
          }
        >
          <Text style={styles.buttonText}>
            {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Submit"}
          </Text>
        </TouchableOpacity>

        <Modal transparent visible={modalVisible} animationType="slide">
          <View style={styles.modalOverlay}>
            <ModelPopUp
              visible={modalVisible}
              onClose={handleModalClose}
              answers={answers}
              questions={questions}
              id={sentquizid}
            />
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {},
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  questionCounter: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 40,
  },
  questionText: { fontSize: 26, marginBottom: 10, fontWeight: "bold" },
  optionButton: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  selectedOption: { backgroundColor: "#FF681F" },
  optionText: { fontSize: 18, color: "black" },
  button: {
    backgroundColor: "#FF681F",
    padding: 16,
    borderRadius: 15,
    margin: 40,
  },
  disabledButton: { backgroundColor: "#ccc" },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default QuestionsScreen;
