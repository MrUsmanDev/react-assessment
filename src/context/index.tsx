import React, { createContext, useState } from 'react';

export const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const SurveyProvider: React.FC<SurveyProviderProps> = ({ children }) => {
  const [surveyResults, setSurveyResults] = useState<SurveyData[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isBack, setIsBack] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const saveAnswer = (questionId: number, question: string, answer: string, optionId: number) => {
    setSurveyResults((prevData) => {
      const newData = [...prevData];
      const questionIndex = newData.findIndex((q) => q.id === questionId);

      if (questionIndex !== -1) {
        newData[questionIndex].answer = answer;
        newData[questionIndex].optionId = optionId;
      } else {
        newData.push({ id: questionId, question, answer, optionId });
      }

      return newData;
    });
  };
  const submitSurvey = async () => {
    try {
      setIsSubmitting(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(surveyResults),
      });
    
      if (!response.ok) {
        throw new Error('Failed to submit survey');
      }
      const result = await response.json();
      setSuccessMessage('Survey submitted successfully!');
      console.log('Survey submitted successfully:', result);
      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (error : any) {
      setErrorMessage(error.message || 'An error occurred while submitting the survey');
      setTimeout(() => setSuccessMessage(''), 2000);
      // console.error('Error submitting survey:', error);
    } finally {
      setIsSubmitting(false);
  }
  };

  const nextQuestion = (isSelected: boolean, questionId: number) => {
    if (questionId !== 6) {
      if (isSelected) {
        setIsAnimating(true);
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setIsBack(false);
        setTimeout(() => {
          setIsAnimating(false);
        }, 1000);
      }
    }else{
      submitSurvey();
    }
  };

  const prevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    setIsAnimating(true);
    setIsBack(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };
  const handleIndicatorClick = (index : any) => {
    setCurrentQuestionIndex(index);
  };

  return (
    <SurveyContext.Provider
      value={{
        surveyResults,
        saveAnswer,
        nextQuestion,
        prevQuestion,
        isSubmitting,
        successMessage,
        errorMessage,
        submitSurvey,
        currentQuestionIndex,
        isAnimating,
        isBack,
        handleIndicatorClick,
        setIsAnimating
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};
