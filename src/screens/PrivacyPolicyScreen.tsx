import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Animated, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { PrivacyPolicySections } from '../data/profiledata';

const PrivacyPolicyScreen = () => {
  const { theme } = useTheme();
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
  }, [fadeAnim]);



  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.backgroundColor }]}>
      <Animated.ScrollView contentContainerStyle={styles.scrollContainer} style={{ opacity: fadeAnim }}>
        {PrivacyPolicySections.map((section, index) => (
          <View key={index} style={[styles.section, { backgroundColor: theme.cardBackgroundColor }]}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>{section.title}</Text>
            <Text style={[styles.sectionText, { color: theme.text }]}>{section.content}</Text>
          </View>
        ))}
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollContainer: { padding: 20 },
  section: { marginBottom: 15, padding: 20, borderRadius: 12, backgroundColor: '#fff' },
  sectionTitle: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  sectionText: { fontSize: 16, fontWeight: '400', lineHeight: 24, textAlign: 'justify' },
});

export default PrivacyPolicyScreen;
