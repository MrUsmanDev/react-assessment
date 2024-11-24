interface AccordionItemProps {
    question: string;
    answer: string;
    index: number;
    isOpen: boolean;
    onClick: () => void;
  }
  interface ButtonProps {
    text: string;                     
    className?: string;               
    disabled?: boolean;              
    onClick?: () => void;             
    leftIcon?: string;      
    rightIcon?: string;      
    type?: 'button' | 'submit' | 'reset'; 
    ariaLabel?: string;     
    role?: 'button';     
    currentQuestionIndex?: number;   
    isSubmitting?: boolean; 
  }
  interface MessageProps {
    type: 'success' | 'error' | 'invalid';
    text: string;
  }