// quizUtils.ts
export interface Question {
    id: string;
    correctAnswer: string;
  }
  
  export interface Result {
    score: number;
    totalQuestions: number;
    totalPoints: number;
    correctAnswer: number;
    incorrectAnswers: number;
    skippedQuestions: number;
    completion: string;
  }
  
  export const calculateQuizResults = (questions: Question[], userAnswers: { [key: string]: string | null }): Result => {
    let correctAnswer = 0;
    let incorrectAnswers = 0;
    let skippedQuestions = 0;
    let totalPoints = 0;
  
    questions.forEach((question) => {
      const userAnswer = userAnswers[question.id];
      if (userAnswer === null) {
        skippedQuestions++;
      } else if (userAnswer === question.correctAnswer) {
        correctAnswer++;
        totalPoints += 1; 
      } else {
        incorrectAnswers++;
      }
    });
  
    const totalQuestions = questions.length;
    const completion = ((correctAnswer + incorrectAnswers) / totalQuestions) * 100;
    
    return {
      score:totalPoints,
      totalQuestions,
      totalPoints,
      correctAnswer,
      incorrectAnswers,
      skippedQuestions,
      completion: `${completion.toFixed(1)}%`,
    };
  };
  