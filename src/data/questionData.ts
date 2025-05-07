import { CheckboxItem} from '../types';

// export const mathematicsData: Question[] = [
//   {
//     id: '1',
//     questionText:
//       'If two dice are rolled, what is the probability of getting a sum of 7?',
//     options: ['1/6', '1/12', '1/18', '1/36'],
//     correctAnswer: '1/6',
//   },
//   {
//     id: '2',
//     questionText:
//       'A box contains 3 red, 2 blue, and 5 green balls. What is the probability of randomly selecting a blue ball?',
//     options: ['1/5', '1/4', '1/2', '2/10'],
//     correctAnswer: '1/5',
//   },
//   {
//     id: '3',
//     questionText: 'What is 12 / 4?',
//     options: ['2', '3', '4', '6'],
//     correctAnswer: '3',
//   },
//   {
//     id: '4',
//     questionText: 'What is the square root of 16?',
//     options: ['2', '3', '4', '5'],
//     correctAnswer: '4',
//   },
//   {
//     id: '5',
//     questionText: 'What is the integral of f(x) = 2x?',
//     options: ['x^2 + C', '2x + C', 'x^2', '2x^2 + C'],
//     correctAnswer: 'x^2 + C',
//   },
//   {
//     id: '6',
//     questionText:
//       'The sum of the first 10 terms of an arithmetic sequence is 120. What is the first term if the common difference is 4?',
//     options: ['8', '6', '10', '12'],
//     correctAnswer: '6',
//   },
//   {
//     id: '7',
//     questionText: 'What is the solution to the equation x^2 - 5x + 6 = 0?',
//     options: ['(2, 3)', '(1, 6)', '(3, 2)', '(0, 5)'],
//     correctAnswer: '(2, 3)',
//   },
//   {
//     id: '8',
//     questionText: 'If a triangle has sides of lengths 3, 4, and 5, what is the area?',
//     options: ['6', '12', '10', '7'],
//     correctAnswer: '6',
//   },
//   {
//     id: '9',
//     questionText: 'What is the value of sin 45°?',
//     options: ['1/2', '√2/2', '1', '√3/2'],
//     correctAnswer: '√2/2',
//   },
//   {
//     id: '10',
//     questionText: 'What is 12 / 4?',
//     options: ['2', '3', '4', '6'],
//     correctAnswer: '3',
//   }
// ];



// export const quizData: AllQuizData = {
//   mathematics: {
//     title: 'Mathematics Quiz',
//     questions: mathematicsData,
//     rightAnswerPoints: 1,
//     wrongAnswerPoints: 1,
//     totalTime: '1 m 20s ',
//     description: 'Test your math skills with this quiz!',
//   },
 
// };

export const erectionData: CheckboxItem[] = [
  {
    id: '1',
    questionText: 'Q.1 Which programming language is primarily used to build React applications?',
    options: ['Python', 'Java', 'JavaScript', 'C++'],
    correctAnswer: 'JavaScript',
    wrongAnswer: 'Python',
    status: 'unchecked',
  },
  {
    id: '2',
    questionText: 'Q.2 What is the main purpose of React?',
    options: ['Data Analysis', 'Web Development', 'Mobile App Development', 'Game Development'],
    correctAnswer: 'Web Development',
    wrongAnswer: 'Mobile App Development',
    status: 'unchecked',
  },
  {
    id: '3',
    questionText: 'Q.3 What is JSX in React?',
    options: ['JavaScript and XML', 'JavaScript Extension', 'Java Syntax Extension', 'Java Express Syntax'],
    correctAnswer: 'JavaScript and XML',
    wrongAnswer: 'Java Syntax Extension',
    status: 'unchecked',
  },
  {
    id: '4',
    questionText: 'Q.4 Solve: 12 × 8 = ?',
    options: ['96', '88', '100', '86'],
    correctAnswer: '96',
    wrongAnswer: '100',
    status: 'unchecked',
  },
  {
    id: '5',
    questionText: 'Q.5 What is the use of `useState` in React?',
    options: ['To manage state in functional components', 'To manage props', 'To handle API requests', 'To create components'],
    correctAnswer: 'To manage state in functional components',
    wrongAnswer: 'To create components',
    status: 'unchecked',
  },
  {
    id: '6',
    questionText: 'Q.6 How do you pass data from a parent component to a child component in React?',
    options: ['State', 'Props', 'Context', 'Hooks'],
    correctAnswer: 'Props',
    wrongAnswer: 'Hooks',
    status: 'unchecked',
  },
  {
    id: '7',
    questionText: 'Q.7 What is the square root of 144?',
    options: ['10', '12', '14', '16'],
    correctAnswer: '12',
    wrongAnswer: '14',
    status: 'unchecked',
  },
  {
    id: '8',
    questionText: 'Q.8 Which is the largest planet in our Solar System?',
    options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 'Jupiter',
    wrongAnswer: 'Saturn',
    status: 'unchecked',
  },
  {
    id: '9',
    questionText: 'Q.9 Which of the following is a programming language?',
    options: ['HTML', 'CSS', 'Java', 'MySQL'],
    correctAnswer: 'Java',
    wrongAnswer: 'HTML',
    status: 'unchecked',
  },
  {
    id: '10',
    questionText: 'Q.10 Who wrote "Romeo and Juliet"?',
    options: ['Charles Dickens', 'William Shakespeare', 'Mark Twain', 'Jane Austen'],
    correctAnswer: 'William Shakespeare',
    wrongAnswer: 'Charles Dickens',
    status: 'unchecked',
  },
  {
    id: '11',
    questionText: 'Q.11 What is the capital of France?',
    options: ['London', 'Berlin', 'Madrid', 'Paris'],
    correctAnswer: 'Paris',
    wrongAnswer: 'London',
    status: 'unchecked',
  },
  {
    id: '12',
    questionText: 'Q.12 What does HTML stand for?',
    options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'],
    correctAnswer: 'Hyper Text Markup Language',
    wrongAnswer: 'Home Tool Markup Language',
    status: 'unchecked',
  },
  {
    id: '13',
    questionText: 'Q.13 How many continents are there on Earth?',
    options: ['5', '6', '7', '8'],
    correctAnswer: '7',
    wrongAnswer: '6',
    status: 'unchecked',
  },
  {
    id: '14',
    questionText: 'Q.14 What is the currency of Japan?',
    options: ['Yuan', 'Won', 'Rupee', 'Yen'],
    correctAnswer: 'Yen',
    wrongAnswer: 'Yuan',
    status: 'unchecked',
  },
  {
    id: '15',
    questionText: 'Q.15 Who won the FIFA World Cup 2018?',
    options: ['Brazil', 'Germany', 'France', 'Argentina'],
    correctAnswer: 'France',
    wrongAnswer: 'Germany',
    status: 'unchecked',
  },
];


