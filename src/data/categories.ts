import img1 from '../assets/categories/science.jpg';
import img2 from '../assets/categories/math.jpg';
import img3 from '../assets/categories/prog.jpg';
import img4 from '../assets/categories/english.jpg';

import {Article} from '../types';

export const categoriesData = [
  {
    image: require('../assets/categories/math.png'),
    name: 'Mathematics',
  },
  {
    image: require('../assets/categories/science.png'),
    name: 'Science',
  },
  {
    image: require('../assets/categories/english.png'),
    name: 'English',
  },
  {
    image: require('../assets/categories/technology.png'),
    name: 'Technology',
  },
  {
    image: require('../assets/categories/medicalBox.png'),
    name: 'Medical',
  },
  {
    image: require('../assets/categories/programming.png'),
    name: 'C Programming',
  },
  {
    image: require('../assets/categories/art.png'),
    name: 'Art',
  },
  {
    image: require('../assets/categories/coding.png'),
    name: 'Coding',
  },
  {
    image: require('../assets/categories/spports.png'),
    name: 'Sports',
  },
  {
    image: require('../assets/categories/knowledge.png'),
    name: 'General Knowledge',
  },
];

export const categoriesShortData = [
  {
    image: require('../assets/categories/math.png'),
    name: 'Mathematics',
  },
  {
    image: require('../assets/categories/science.png'),
    name: 'Science',
  },
  {
    image: require('../assets/categories/spports.png'),
    name: 'Sports',
  },
  {
    image: require('../assets/categories/technology.png'),
    name: 'Technology',
  },
  {
    image: require('../assets/categories/knowledge.png'),
    name: 'General Knowledge',
  },
  {
    image: require('../assets/categories/coding.png'),
    name: 'Coding',
  },
];


export const articles: Article[] = [
  {
    title: 'Science Wonders',
    backgroundImage: img1,
    description: 'Uncover amazing scientific discoveries!',
  },
  {title: 'Math Mastery', backgroundImage: img2,     description: 'Solve equations and sharpen your math skills!', },
  {  title: 'Sports Trivia', backgroundImage: img3 , description: 'Test your knowledge of sports history!',},
  {  title: 'English Language Quiz', backgroundImage: img4 ,description: 'Improve vocabulary and grammar with fun quizzes!',},
];


export const technologyshortCardData = [
  {
    image: require('../assets/categories/math.jpg'),
    title: 'Math Mastery',
    description: 'Solve equations and sharpen your math skills!',
  },
  {
    image: require('../assets/categories/prog.jpg'),
    title: 'Programming Basics',
    description: 'Challenge yourself with coding questions!',
  },
  {
    image: require('../assets/categories/english.jpg'),
    title: 'English Language Quiz',
    description: 'Improve vocabulary and grammar with fun quizzes!',
  },
  {
    image: require('../assets/categories/science.jpg'),
    title: 'Science Wonders',
    description: 'Uncover amazing scientific discoveries!',
  },
  {
    image: require('../assets/categories/sport.jpg'),
    title: 'Sports Trivia',
    description: 'Test your knowledge of sports history!',
  },
 
];


