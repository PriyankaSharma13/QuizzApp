import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Article, RootStackParamList } from '../types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width: screenWidth } = Dimensions.get('window');

const CarouselComponent: React.FC<{ articles: Article[] }> = ({ articles }:any) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = (item: Article) => {
    console.log('carousel clicked', item);
    navigation.navigate('StartQuizScreen', { quizArticleData: item });
  };
  

  const renderCarouselItem = ({ item }: { item: Article }) => {
    return (
      <TouchableOpacity onPress={() => handlePress(item)} activeOpacity={0.8}>
        <ImageBackground
         source={item.backgroundImage}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}>
          <View style={styles.overlay} />
          <View style={styles.itemContainer}>
            {/* <Text style={styles.title}>{item.title}</Text> */}
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        loop
        width={screenWidth * 0.9} 
        height={240}             
        autoPlay={true}
        data={articles}
        renderItem={renderCarouselItem}
        style={styles.carousel}
        scrollAnimationDuration={1000}
        snapEnabled={true}
        mode="parallax" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    alignItems: 'center',
  },
  carousel: {
    overflow: 'hidden',
    borderRadius: 12, 
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    borderRadius: 10, 
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)', 
    borderRadius: 10,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 4,
      },
    }),
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default CarouselComponent;
