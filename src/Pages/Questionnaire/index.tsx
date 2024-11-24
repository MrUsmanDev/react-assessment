import { useState } from 'react';
import { useSurvey } from '../../hooks/useSurvey';

import Indicators from '../Indicators';
import Question from '../Question';
import Choice from '../Choice';
import Actions from '../Actions';
import Summary from '../Summary';
import Message from '../../components/Message';

import { surveyData } from '../../constants';
import LOGO_CDN from '../../assets/images/logo.png';

const Questionnaire = () => {
  const {
    saveAnswer,
    surveyResults,
    nextQuestion,
    successMessage,
    errorMessage,
    currentQuestionIndex,
    isAnimating,
    isBack,
  } = useSurvey();

  const currentQuestion  = surveyData[currentQuestionIndex];
  const { questionId, question, options, description } = currentQuestion;

  const isSelected = questionId === 6
    || surveyResults.some((result) => result.id  === questionId );

  const handleSelectedOption = (option: any) => {
    saveAnswer(questionId, question, option.label, option.id);
  };

  const animationClasses = `${questionId === 6 ? "animate-slide-left" : "" }
                            ${(isAnimating && !isBack && questionId !== 6) ? "animate-slide-up" : ""}
                            ${(isAnimating && isBack) ? "animate-slide-down" : ""}`;

  return (
    <div className="flex w-screen h-screen flex-col md:flex-row">
      {/* Left Side */}
      <section className={`bg-blue-500 w-full md:w-1/2 h-full flex items-center justify-start p-4 relative`}>
        <img
          src={LOGO_CDN}
          height={50}
          width={50}
          className="absolute top-6 left-6"
          alt="Logo"
        />
        <div className={`flex gap-10 items-center p-4 ${animationClasses}`} data-testid="animatedDiv">
          <Indicators  isSelected={isSelected} />
          <Question question={question} description={description} />
        </div>
      </section>

      {/* Right Side */}
      <section className={`w-full md:w-1/2 h-full flex flex-col justify-between p-4 ${animationClasses}`} data-testid="QuestionDiv">
        {successMessage && <Message type="success" text={successMessage} />}
        {errorMessage && <Message type="error" text={errorMessage} />}
        {/* Choice Section */}
        <div className="flex justify-around items-center flex-grow p-4 gap-6 sm:gap-8">
          {options.length > 0 ? (
            options.map((item) => (
              <Choice
                key={item.id}
                label={item.label}
                choice={item.icon}
                onClick={() => handleSelectedOption(item)}
                item={item}
                questionId={questionId}
              />
            ))
          ) : (
            <Summary />
          )}
        </div>

        {/* Footer Section */}
        <Actions
          handleNext={() => nextQuestion(isSelected, questionId)}
          isValidate={isSelected}
        />
      </section>
    </div>
  );
};

export default Questionnaire;
