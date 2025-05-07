import React from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

function SplashScreen({navigation}: any) {
  const {theme } =useTheme();
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <View style={styles.innerContainer}>
        <Text
          style={[styles.title, {color: theme.text}]}
          >
          Quiz
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  innerContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color:"#000"
  },
});

export default SplashScreen;
