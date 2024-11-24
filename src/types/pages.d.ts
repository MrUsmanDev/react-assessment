interface ActionProps {
    handleNext : (isSelected?: boolean, questionId?: number) => void,
    isValidate: boolean;
 
 }

 interface ChoiceProps {
    label: string;
    choice: React.ReactNode;
    onClick: () => void;
    item: { id: number };
    questionId: number;
  }

  interface IndicatorsProps {
    isSelected: boolean;
  }

  interface QuestionProps {
    question: string;
    description?: string;
  }