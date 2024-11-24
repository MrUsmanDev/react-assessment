import { render, screen, fireEvent } from '@testing-library/react';
import Indicators from '.';
import { useSurvey } from '../../hooks/useSurvey';

// Mock the custom hook
jest.mock('../../hooks/useSurvey');

describe('Indicators Component', () => {
  const mockHandleIndicatorClick = jest.fn();

  const mockUseSurvey = (currentQuestionIndex: number) => {
    (useSurvey as jest.Mock).mockReturnValue({
      handleIndicatorClick: mockHandleIndicatorClick,
      currentQuestionIndex,
    });
  };

  beforeEach(() => {
    mockHandleIndicatorClick.mockClear();
  });

  it('renders the correct number of indicators', () => {
    mockUseSurvey(5);
    render(<Indicators isSelected={true} />);
    const indicators = screen.getAllByRole('button');
    expect(indicators).toHaveLength(6);
  });

  it('applies correct styles to disabled indicators', () => {
    mockUseSurvey(2);
    render(<Indicators isSelected={false} />);
    const disabledIndicator = screen.getAllByRole('button')[2];
    expect(disabledIndicator).toHaveClass('cursor-not-allowed');
  });

  it('applies correct styles to clickable indicators', () => {
    mockUseSurvey(2);
    render(<Indicators isSelected={true} />);
    const clickableIndicator = screen.getAllByRole('button')[3];
    expect(clickableIndicator).toHaveClass('cursor-pointer');
    expect(clickableIndicator).toHaveClass('bg-white');
  });

  it('calls handleIndicatorClick on clicking a clickable indicator', () => {
    mockUseSurvey(2);
    render(<Indicators isSelected={true} />);
    const clickableIndicator = screen.getAllByRole('button')[3];
    fireEvent.click(clickableIndicator);
    expect(mockHandleIndicatorClick).toHaveBeenCalledWith(3);
  });

  it('does not call handleIndicatorClick for non-clickable indicators', () => {
    mockUseSurvey(4);
    render(<Indicators isSelected={false} />);
    const nonClickableIndicator = screen.getAllByRole('button')[4];
    fireEvent.click(nonClickableIndicator);
    expect(mockHandleIndicatorClick).not.toHaveBeenCalled();
  });

  it('does not call handleIndicatorClick on the current indicator', () => {
    mockUseSurvey(5);
    render(<Indicators isSelected={true} />);
    const currentIndicator = screen.getAllByRole('button')[5];
    fireEvent.click(currentIndicator);
    expect(mockHandleIndicatorClick).not.toHaveBeenCalled();
  });
});
