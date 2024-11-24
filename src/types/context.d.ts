interface SurveyData {
    id: number;
    question: string;
    answer: string | null;
    optionId: number;
  }
  
  interface SurveyContextType {
    surveyResults: SurveyData[];
    currentQuestionIndex: number;
    isSubmitting: boolean;
    successMessage: string;
    errorMessage: string;
    saveAnswer: (questionId: number, question: string, answer: string, optionId : number) => void;
    nextQuestion: (isSelected: boolean, questionId: number) => void;
    prevQuestion: () => void;
    submitSurvey: () => Promise<void>;
    isAnimating: boolean,
    isBack: boolean,
    handleIndicatorClick: (index :any)=> void,
    setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>;
  }

  interface SurveyProviderProps {
    children: ReactNode;
  }