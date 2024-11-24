import React from 'react';


const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer, index, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-300">
      <div
        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100"
        onClick={onClick}
         role="button"
      >
        <h3 className="font-semibold text-lg">{`Question ${index + 1}: ${question}`}</h3>
        <span 
        data-testid="accordion-arrow"
        className={`transform transition-all ${isOpen ? 'rotate-180' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </span>
      </div>
      {isOpen && (
        <div className="p-4 bg-gray-50">
          <p className="text-gray-700">{`Answer: ${answer}`}</p>
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
