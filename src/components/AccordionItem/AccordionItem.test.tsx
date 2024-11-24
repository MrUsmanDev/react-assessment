import { render, screen, fireEvent } from '@testing-library/react';
import AccordionItem from '.';

const mockProps = {
  question: 'What is React?',
  answer: 'React is a JavaScript library for building user interfaces.',
  index: 0,
  isOpen: false,
  onClick: jest.fn(),
};

describe('AccordionItem', () => {
  it('renders the question correctly', () => {
    render(<AccordionItem {...mockProps} />);
    
    expect(screen.getByText('Question 1: What is React?')).toBeInTheDocument();
  });

  it('renders the answer when isOpen is true', () => {
    render(<AccordionItem {...mockProps} isOpen={true} />);
    
    expect(screen.getByText('Answer: React is a JavaScript library for building user interfaces.')).toBeInTheDocument();
  });

  it('does not render the answer when isOpen is false', () => {
    render(<AccordionItem {...mockProps} isOpen={false} />);
    
    expect(screen.queryByText('Answer: React is a JavaScript library for building user interfaces.')).toBeNull();
  });

  it('calls onClick when clicked', () => {
    render(<AccordionItem {...mockProps} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('rotates the arrow when isOpen is true', () => {
    render(<AccordionItem {...mockProps} isOpen={true} />);
    
    const arrow = screen.getByTestId('accordion-arrow');
    
    expect(arrow).toHaveClass('rotate-180');
  });

  it('does not rotate the arrow when isOpen is false', () => {
    render(<AccordionItem {...mockProps} />);
    
    const arrow = screen.getByTestId('accordion-arrow');
    
    expect(arrow).not.toHaveClass('rotate-180');
  });
});
