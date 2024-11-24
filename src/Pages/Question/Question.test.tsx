import { render, screen } from '@testing-library/react';

import Question from '.'; 

describe('Question Component', () => {
  const mockProps = {
    question: 'What is your favorite color?',
    description: 'Please select one of the options below.',
  };

  it('should render the question text correctly', () => {
    render(<Question {...mockProps} />);
    
    expect(screen.getByText('What is your favorite color?')).toBeInTheDocument();
  });

  it('should render the description text correctly', () => {
    render(<Question {...mockProps} />);
    
    expect(screen.getByText('Please select one of the options below.')).toBeInTheDocument();
  });

  it('should have the correct class names for the question text', () => {
    render(<Question {...mockProps} />);
    
    const questionElement = screen.getByText('What is your favorite color?');
    expect(questionElement).toHaveClass('text-white');
    expect(questionElement).toHaveClass('text-5xl');
    expect(questionElement).toHaveClass('font-bold');
    expect(questionElement).toHaveClass('max-w-[300px]');
    expect(questionElement).toHaveClass('text-left');
    expect(questionElement).toHaveClass('animate-fade-in-up');
  });

  it('should have the correct class names for the description text', () => {
    render(<Question {...mockProps} />);
    
    const descriptionElement = screen.getByText('Please select one of the options below.');
    expect(descriptionElement).toHaveClass('text-white');
    expect(descriptionElement).toHaveClass('font-medium');
    expect(descriptionElement).toHaveClass('text-lg');
  });
});
