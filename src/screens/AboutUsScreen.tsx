
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../theme/ThemeContext';

const AboutUsScreen = ({ navigation }: any) => {
  const { theme } = useTheme(); 
  const handlePressBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.backgroundColor }]}>
      <LinearGradient
        colors={['#1e3c72', '#2a5298']}
        style={styles.gradientBackground}
      >
    
          <TouchableOpacity style={styles.iconContainer} onPress={handlePressBack}>
            <Icon name="chevron-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>About Us</Text>
          <Text style={styles.headerDescription}>
            Discover more about our story, values, and team.
          </Text>
      </LinearGradient>

 {/* --------- Main Scrollable Content --------- */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
   {/* --------- Section: Our Story --------- */}
        <View style={[styles.section, { backgroundColor: theme.cardBackgroundColor }]}>
          <Text  style={[styles.sectionTitle, { color: theme.text }]}>Our Story</Text>
          <Text style={[styles.sectionText, { color: theme.text }]}>
            Founded in 2021, we started with a mission to revolutionize the tech industry. Our goal is to provide innovative solutions that create lasting impact on people's lives.
          </Text>
        </View>

   {/* --------- Section: Our Mission --------- */}
        <View style={[styles.section, { backgroundColor: theme.cardBackgroundColor }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Our Mission</Text>
          <Text style={[styles.sectionText, { color: theme.text }]}>
            Our mission is to deliver cutting-edge technologies while fostering a culture of collaboration, creativity, and excellence. We aim to build a world where technology improves quality of life for everyone.
          </Text>
        </View>

   {/* --------- Section: Our Team --------- */}
        <View style={[styles.section, { backgroundColor: theme.cardBackgroundColor }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Our Team</Text>
          <Text style={[styles.sectionText, { color: theme.text }]}>
            Our team consists of passionate professionals who are committed to bringing innovative ideas to life. We believe that great results come from great teamwork, and we work together to achieve the impossible.
          </Text>
        </View>

   {/* --------- Section: Contact Us --------- */}
        <View style={[styles.section, { backgroundColor: theme.cardBackgroundColor }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Contact Us</Text>
          <Text style={[styles.sectionText, { color: theme.text }]}>
            We would love to hear from you! Get in touch with us via email at contact@ourcompany.com or call us at +123456789.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F4F9',
  },
  gradientBackground: {
    height: 230,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    padding: 20,
    shadowColor: '#1e3c72',
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  iconContainer: {
    position: 'absolute',
    top: 30,
    left: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 12,
    borderRadius: 50,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 8,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  headerDescription: {
    fontSize: 18,
    fontWeight: '300',
    color: '#FFF',
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  section: {
    backgroundColor: '#FFF',
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
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  sectionText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666',
    lineHeight: 24,
    textAlign: 'justify',
  },
});

export default AboutUsScreen;
