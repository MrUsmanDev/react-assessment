import { render, screen, fireEvent } from '@testing-library/react';

import { useSurvey } from '../../hooks/useSurvey';
import Summary from '.';

jest.mock('../../components/AccordionItem', () => ({ question, answer, isOpen, onClick }: any) => (
  <div data-testid="accordion-item" className={`accordion-item ${isOpen ? 'open' : ''}`}>
    <h3 onClick={onClick}>{question}</h3>
    {isOpen && <p>{answer}</p>}
  </div>
));

jest.mock('../../hooks/useSurvey', () => ({
  useSurvey: jest.fn(),
}));

describe('Summary Component', () => {
  const mockSurveyResults = [
    { question: 'What is React?', answer: 'A JavaScript library for building UIs' },
    { question: 'What is useState?', answer: 'A React hook for managing state' },
  ];

  beforeEach(() => {
    (useSurvey as jest.Mock).mockReturnValue({
      surveyResults: mockSurveyResults,
    });
  });

  it('renders the correct number of AccordionItem components', () => {
    render(<Summary />);
    const accordionItems = screen.getAllByTestId('accordion-item');
    expect(accordionItems).toHaveLength(mockSurveyResults.length);
  });

  it('toggles the accordion item when clicked', () => {
    render(<Summary />);
    const firstAccordionHeader = screen.getByText(mockSurveyResults[0].question);
    const secondAccordionHeader = screen.getByText(mockSurveyResults[1].question);

    expect(screen.queryByText(mockSurveyResults[0].answer)).not.toBeInTheDocument();
    expect(screen.queryByText(mockSurveyResults[1].answer)).not.toBeInTheDocument();

    fireEvent.click(firstAccordionHeader);
    expect(screen.getByText(mockSurveyResults[0].answer)).toBeInTheDocument();

    fireEvent.click(secondAccordionHeader);
    expect(screen.queryByText(mockSurveyResults[0].answer)).not.toBeInTheDocument();
    expect(screen.getByText(mockSurveyResults[1].answer)).toBeInTheDocument();

    fireEvent.click(secondAccordionHeader);
    expect(screen.queryByText(mockSurveyResults[1].answer)).not.toBeInTheDocument();
  });
});
