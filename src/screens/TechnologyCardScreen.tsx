import React from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native'
import { technologyCardData } from '../data/cardsection'
import { useTheme } from '../theme/ThemeContext'
import { technologyshortCardData } from '../data/categories'


const TechnologyCardScreen = ({navigation}: any) => {
 const {theme} = useTheme();
  return (
    <SafeAreaView  style={[styles.safeArea, {backgroundColor:theme.backgroundColor}]} >
        <ScrollView>
        <View style={[styles.cardContainer, {backgroundColor:theme.backgroundColor}]}>
        {technologyshortCardData.map((card, index) => (
           <TouchableOpacity key={index}   style={[styles.card, {backgroundColor:theme.card}]} onPress={() => navigation.navigate('StaticQuizOverview')} >
            <Image source={card.image} style={styles.categoryImage} />
            <View style={styles.cardDescription}>
              <Text  style={[styles.title, {color:theme.text}]}>{card.title}</Text>
              <Text  style={[styles.description, {color:theme.text}]}>{card.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:{

  },
  scrollContent: {
    flexGrow: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    flexDirection: 'column',
  },
  card: {
    flexDirection: 'row',
    width: '100%',
    height: 130,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginVertical: 10,
    padding: 15,
    alignItems: 'center',
  },
  categoryImage: {
    width: 100,
    height: 100,
    marginRight: 15,
  },
  cardDescription: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
  detailsContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  detailsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    flex: 1,
  },
  
});

export default TechnologyCardScreen