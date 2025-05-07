import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ModelPopUpProps, RootStackParamList} from '../types';
import { useTheme } from '../theme/ThemeContext';

const ModelPopUp: React.FC<ModelPopUpProps> = ({
  visible,
  onClose,
  questions,
  id,
  
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const quizId = questions?.[0]?._id || '';
  const {theme} =useTheme();

  if (!quizId) {
    Alert.alert('Error', 'Quiz ID is missing.');
    return null;
  }

  const handlePress = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
     
      const apiUrl = `https://quizz3.onrender.com/api/result/${id}`;

      const response = await axios.get(apiUrl, {
    
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      console.log('response: ', response);
      const resultData = response.data.data;
      console.log('resultDatadd: ', resultData);
      if (!resultData) {
        Alert.alert('Error', 'No quiz result found.');
        return;
      }

      onClose();
      navigation.navigate('ResultQuizScreen', {resultData});
    } catch (error) {
      console.error('Error fetching results:', error);
      Alert.alert('Error', 'Failed to fetch quiz results.');
    }
  };

  if (!visible) return null;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.card },
    ]}>
      <TouchableOpacity onPress={onClose} style={styles.backButton}>
        <Icon name="checkmark" size={40} color="#fff" />
      </TouchableOpacity>
      <Text style={[styles.title, { color: theme .textColor }]}>Quiz Completed</Text>
      <Text style={[styles.subtitle,{ color: theme .textColor }]}>Successfully</Text>
      <TouchableOpacity style={styles.startButton} onPress={handlePress}>
        <Text style={styles.startButtonText}>Go to Quiz Result</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: Platform.OS === 'ios' ? 20 : 30,
    paddingHorizontal: Platform.OS === 'ios' ? 15 : 30,
    elevation: 5,
    width: '95%',
  },
  backButton: {
    alignSelf: 'center',
    marginBottom: 20,
    backgroundColor: 'green',
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
   
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: '700',
  },
  startButton: {
    backgroundColor: '#FF681F',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ModelPopUp;
