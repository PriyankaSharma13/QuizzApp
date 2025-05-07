import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../theme/ThemeContext';

const TermsConditionScreen = ({ navigation }: any) => {
  const { theme } = useTheme(); 

  const handlePressBack = () => {
    navigation.navigate('Settings');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.backgroundColor }]}>
      <LinearGradient
        colors={["#ff7e5f", "#feb47b"]}
        style={styles.gradientBackground}
      >
        <TouchableOpacity style={styles.iconContainer} onPress={handlePressBack}>
          <Icon name="chevron-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Terms & Conditions</Text>
        <Text style={[styles.headerDescription, { color: theme.text }]}>
          Read the terms carefully before using the service.
        </Text>
      </LinearGradient>

      {/* Main Scrollable Content */}
      <ScrollView contentContainerStyle={[styles.scrollContainer, { backgroundColor: theme.backgroundColor }]}>
        {/* Section 1 */}
        <View style={[styles.section, { backgroundColor: theme.cardBackgroundColor }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>1. Agreement of Terms</Text>
          <Text style={[styles.sectionText, { color: theme.text }]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
          </Text>
        </View>

        {/* Section 2 */}
        <View style={[styles.section, { backgroundColor: theme.cardBackgroundColor }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>2. Terms of Service</Text>
          <Text style={[styles.sectionText, { color: theme.text }]}>
            Ut fringilla. Suspendisse potenti. Nulla sit amet est urna. Sed nec semper leo. Donec nec nisl ac risus tempus cursus.
          </Text>
        </View>

        {/* Section 3 */}
        <View style={[styles.section, { backgroundColor: theme.cardBackgroundColor }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>3. Condition of Use</Text>
          <Text style={[styles.sectionText, { color: theme.text }]}>
            Curabitur at felis id ipsum ullamcorper ullamcorper non ut purus. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio.
          </Text>
        </View>

        {/* Section 4 */}
        <View style={[styles.section, { backgroundColor: theme.cardBackgroundColor }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>4. Privacy Policy</Text>
          <Text style={[styles.sectionText, { color: theme.text }]}>
            Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  gradientBackground: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    padding: 20,
    shadowColor: "#FF6F61",
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    left: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 12,
    borderRadius: 50,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 4,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  headerDescription: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  section: {
    padding: 20,
    marginVertical: 15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  sectionText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    textAlign: 'justify',
  },
});

export default TermsConditionScreen;
