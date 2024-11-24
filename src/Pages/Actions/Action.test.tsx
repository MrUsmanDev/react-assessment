import { render, fireEvent, screen } from '@testing-library/react';

import { useSurvey } from '../../hooks/useSurvey';
import Actions from '.'; 

import { surveyData } from '../../constants';

jest.mock('../../hooks/useSurvey');

describe('Actions Component', () => {
  let mockPrevQuestion: jest.Mock;
  let mockHandleNext: jest.Mock;

  beforeEach(() => {
    mockPrevQuestion = jest.fn();
    mockHandleNext = jest.fn();

    (useSurvey as jest.Mock).mockReturnValue({
      isSubmitting: false,
      currentQuestionIndex: 1,
      prevQuestion: mockPrevQuestion,
    });
  });

  it('should call prevQuestion when the Back button is clicked', () => {
    render(<Actions handleNext={mockHandleNext} isValidate={true} />);

    const backButton = screen.getByText('Back');

    fireEvent.click(backButton);

    expect(mockPrevQuestion).toHaveBeenCalledTimes(1);
  });

  it('should call handleNext when the Next button is clicked', () => {
    render(<Actions handleNext={mockHandleNext} isValidate={true} />);

    const nextButton = screen.getByText('Next');

    fireEvent.click(nextButton);

    expect(mockHandleNext).toHaveBeenCalledTimes(1);
  });

  it('should disable Back button when currentQuestionIndex is 0', () => {
    (useSurvey as jest.Mock).mockReturnValue({
      isSubmitting: false,
      currentQuestionIndex: 0,
      prevQuestion: mockPrevQuestion,
    });

    render(<Actions handleNext={mockHandleNext} isValidate={true} />);

    const backButton = screen.getByText('Back');

    expect(backButton).toBeDisabled();
  });

  it('should disable Next button when isValidate is false', () => {
    render(<Actions handleNext={mockHandleNext} isValidate={false} />);

    const nextButton = screen.getByText('Next');

    expect(nextButton).toBeDisabled();
  });

  it('should show Submit when on last question', () => {
    (useSurvey as jest.Mock).mockReturnValue({
      isSubmitting: false,
      currentQuestionIndex: surveyData.length - 1,
      prevQuestion: mockPrevQuestion,
    });

    render(<Actions handleNext={mockHandleNext} isValidate={true} />);
    const nextButton = screen.getByRole('button', {
      name: /submit/i,
    });
  
    expect(nextButton).toHaveTextContent(/submit/i);
  });
  
  
  
});
