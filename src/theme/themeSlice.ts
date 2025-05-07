
export type ThemeType = {
  mode: string,
  backgroundColor: string;
  textColor: string;
  cardBackgroundColor: string; 
  correctAnswerColor: string;
  incorrectAnswerColor: string;
  text: string;
  card: string;
  iconColor: string;
  iconCircle:string
  gradientBackground: string | string[];
  defaultAnswerColor:string;
  selectedAnswerColor: string;
};
export const lightTheme: ThemeType = {
  mode: "light",
  text: "#000000",
  card: "#F5F5F5",
  iconColor: "#ff7e5f",
  backgroundColor: "#f8f8f8",
  textColor: "#000",
  cardBackgroundColor: "#ffffff",
  correctAnswerColor: "green",
  incorrectAnswerColor: "red",
  iconCircle: "#000", 
  gradientBackground:['#ff7e5f', '#feb47b'],
  defaultAnswerColor: '#d3d3d3',
  selectedAnswerColor: '#d3d3d3',
};

export const darkTheme: ThemeType = {
  mode: "dark",
  text: "#FFFFFF",
  card: "#1E1E1E",
  iconColor: "#ff7e5f",
  backgroundColor: "#000",
  textColor: "#fff",
  cardBackgroundColor: "#555",
  correctAnswerColor: "lightgreen",
  incorrectAnswerColor: "salmon",
  iconCircle: "yellow", 
  gradientBackground:"#000",
  defaultAnswerColor: '#d3d3d3',
  selectedAnswerColor: '#d3d3d3',
};



