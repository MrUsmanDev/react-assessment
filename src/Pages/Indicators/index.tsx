import React from 'react';
import { useSurvey } from '../../hooks/useSurvey';
import { surveyData } from '../../constants';

const Indicators: React.FC<IndicatorsProps> = ({ isSelected }) => {
  const { handleIndicatorClick, currentQuestionIndex } = useSurvey();

  const handleClick = (index: number) => {
    if (index === currentQuestionIndex) {
      return;
    }
    if (index <= currentQuestionIndex || (index === currentQuestionIndex + 1 && isSelected)) {
      handleIndicatorClick(index);
    }
  };

  const getValidatedClass = (i : number)=> `${
    i === currentQuestionIndex
      ? 'border-2 border-white cursor-not-allowed'
      : i === currentQuestionIndex + 1 && isSelected
      ? 'bg-white cursor-pointer'
      : i <= currentQuestionIndex
      ? 'bg-white cursor-pointer' 
      : 'bg-slate-300 cursor-not-allowed'
  }`

  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: surveyData?.length }, (_, i) => (
        <div
          key={i}
          className={`w-3.5 h-3.5 rounded-full ${getValidatedClass(i)}`}
          onClick={() => handleClick(i)}
          role="button"
        ></div>
      ))}
    </div>
  );
};

export default Indicators;
