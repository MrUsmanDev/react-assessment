import { render, screen, fireEvent } from '@testing-library/react';
import Choice from '.';
import { useSurvey } from '../../hooks/useSurvey';

jest.mock('../../hooks/useSurvey');

describe('Choice Component', () => {
  const mockChoiceProps = {
    label: 'Choice 1',
    choice: 'A',
    onClick: jest.fn(),
    item: { id: 1 },
    questionId: 123,
  };

  it('should render the Choice component correctly', () => {
    (useSurvey as jest.Mock).mockReturnValue({ surveyResults: [] });

    render(<Choice {...mockChoiceProps} />);

    expect(screen.getByText('Choice 1')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('should apply bg-blue-500 when isSelected is true', async() => {
    (useSurvey as jest.Mock).mockReturnValue({
      surveyResults: [{ optionId: 1, id: 123 }],
    });
  
    render(<Choice {...mockChoiceProps} />);
    const choiceElement = screen.getByTestId('choice');
    expect(choiceElement).toHaveClass('bg-blue-500');
  });
  

  it('should not apply bg-blue-500 when isSelected is false', () => {
    (useSurvey as jest.Mock).mockReturnValue({
      surveyResults: [{ optionId: 2, id: 123 }],
    });

    render(<Choice {...mockChoiceProps} />);

    const choiceElement = screen.getByText('A');

    expect(choiceElement).not.toHaveClass('bg-blue-500');
  });

  it('should call onClick handler when clicked', () => {
    (useSurvey as jest.Mock).mockReturnValue({ surveyResults: [] });

    render(<Choice {...mockChoiceProps} />);

    fireEvent.click(screen.getByText('A'));

    expect(mockChoiceProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('should render with dynamic styling based on isSelected state', () => {
    (useSurvey as jest.Mock).mockReturnValue({
      surveyResults: [{ optionId: 1, id: 123 }],
    });

    render(<Choice {...mockChoiceProps} />);

    const label = screen.getByText('Choice 1');
    
    expect(label).toHaveClass('top-[-50px] opacity-100 translate-y-0');
  });
});
