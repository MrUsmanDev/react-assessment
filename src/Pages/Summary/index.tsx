import React, { useState } from 'react';
import { useSurvey } from '../../hooks/useSurvey';
import AccordionItem from '../../components/AccordionItem';


const Summary: React.FC = () => {
  const { surveyResults } = useSurvey();
  const [openIndex, setOpenIndex] = useState<number | null>(null); 

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Survey Summary</h2>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {surveyResults.map((result:any, index) => (
          <AccordionItem
            key={index}
            question={result.question}
            answer={result.answer}
            index={index}
            isOpen={openIndex === index} 
            onClick={() => handleToggle(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Summary;
