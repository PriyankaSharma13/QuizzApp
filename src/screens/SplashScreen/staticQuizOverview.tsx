import React, { useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, FlatList } from 'react-native';
import { erectionData } from '../../data/questionData'; 
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/ThemeContext';

const StaticQuizOverview = () => {
  const { theme } = useTheme(); 
  const [selectedAnswers] = useState<{ [key: string]: string }>({});

  const isAnswerCorrect = (questionId: string, selectedOption: string) => {
    const correctAnswer = erectionData.find(q => q.id === questionId)?.correctAnswer;
    return selectedOption === correctAnswer;
  };

  return (
    <SafeAreaView style={[styles.safeContainer, { backgroundColor: theme.backgroundColor }]}>
      <FlatList
        data={erectionData} 
        renderItem={({ item }) => (
          <View style={[styles.cardContainer, { backgroundColor: theme.card }]}>
            <Text style={[styles.questionText, { color: theme.textColor }]}>{item.questionText}</Text>
            <Text style={[styles.optionHeading, { color: theme.text }]}>Options</Text>

            {item.options.map((option, index) => {
              const isCorrectAnswer = isAnswerCorrect(item.id, option);

              return (
                <View key={index} style={styles.optionContainer}>
                  <View
                    style={[
                      styles.radioCircle,
                      {
                        backgroundColor: isCorrectAnswer ? 'green' : 'red',
                        borderColor: isCorrectAnswer ? 'green' : 'red', 
                      },
                    ]}
                  />
                  <Text
                    style={[
                      styles.optionText,
                      isCorrectAnswer && styles.correctText,
                      !isCorrectAnswer && styles.incorrectText, 
                    ]}
                  >
                    {option}
                  </Text>

                  <Icon
                    name={isCorrectAnswer ? 'check-circle' : 'cancel'}
                    size={20}
                    color={isCorrectAnswer ? 'green' : 'red'}
                    style={styles.icon}
                  />
                </View>
              );
            })}

            {selectedAnswers[item.id] && (
              <Text
                style={[
                  styles.resultText,
                  isAnswerCorrect(item.id, selectedAnswers[item.id]) ? styles.correctText : styles.incorrectText,
                ]}
              >
                {isAnswerCorrect(item.id, selectedAnswers[item.id]) ? '✅ Correct' : '❌ Incorrect'}
              </Text>
            )}
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  cardContainer: {
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionHeading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: 8,
  },
  optionText: {
    fontSize: 16,
    flex: 1,
  },
  correctText: {
    color: 'green',
    fontWeight: 'bold',
  },
  incorrectText: {
    color: 'red',
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 10,
  },
  resultText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default StaticQuizOverview;
