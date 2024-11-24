import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SurveyContext, SurveyProvider } from '.';

describe('SurveyContext', () => {
  const renderWithContext = (ui: React.ReactNode) =>
    render(<SurveyProvider>{ui}</SurveyProvider>);

  it('provides the initial context values', () => {
    renderWithContext(
      <SurveyContext.Consumer>
        {(value) => (
          <>
            <div data-testid="surveyResultsCount">{value?.surveyResults.length}</div>
            <button onClick={value?.submitSurvey}>Submit Survey</button>
            <span>{value?.successMessage}</span>
          </>
        )}
      </SurveyContext.Consumer>
    );
  
    expect(screen.getByTestId('surveyResultsCount')).toHaveTextContent('0'); // Check the initial count
  });
  

  it('saves answers correctly', () => {
    renderWithContext(
      <SurveyContext.Consumer>
        {(value) => (
          <>
            <button
              onClick={() =>
                value?.saveAnswer(1, 'Question 1', 'Answer 1', 101)
              }
            >
              Save Answer
            </button>
            <span data-testid="results">
              {JSON.stringify(value?.surveyResults)}
            </span>
          </>
        )}
      </SurveyContext.Consumer>
    );

    fireEvent.click(screen.getByText('Save Answer'));

    expect(screen.getByTestId('results').textContent).toContain(
      JSON.stringify([{ id: 1, question: 'Question 1', answer: 'Answer 1', optionId: 101 }])
    );
  });

  it('navigates to the next question', () => {
    renderWithContext(
      <SurveyContext.Consumer>
        {(value) => (
          <>
            <button onClick={() => value?.nextQuestion(true, 1)}>
              Next Question
            </button>
            <span>{value?.currentQuestionIndex}</span>
          </>
        )}
      </SurveyContext.Consumer>
    );

    fireEvent.click(screen.getByText('Next Question'));
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('navigates to the previous question', () => {
    renderWithContext(
      <SurveyContext.Consumer>
        {(value) => (
          <>
            <button onClick={value?.prevQuestion}>Previous Question</button>
            <span>{value?.currentQuestionIndex}</span>
          </>
        )}
      </SurveyContext.Consumer>
    );

    fireEvent.click(screen.getByText('Previous Question'));
    expect(screen.getByText('-1')).toBeInTheDocument(); // Initial index is 0, so decrementing leads to -1
  });

  it('submits survey successfully', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    ) as jest.Mock;

    renderWithContext(
      <SurveyContext.Consumer>
        {(value) => (
          <>
            <button onClick={value?.submitSurvey}>Submit Survey</button>
            <span>{value?.successMessage}</span>
          </>
        )}
      </SurveyContext.Consumer>
    );

    fireEvent.click(screen.getByText('Submit Survey'));

    expect(await screen.findByText('Survey submitted successfully!')).toBeInTheDocument();
    jest.restoreAllMocks();
  });
 

  it('handles survey submission errors', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Failed to submit survey'))
    ) as jest.Mock;

    renderWithContext(
      <SurveyContext.Consumer>
        {(value) => (
          <>
            <button onClick={value?.submitSurvey}>Submit Survey</button>
            <span>{value?.errorMessage}</span>
          </>
        )}
      </SurveyContext.Consumer>
    );

    fireEvent.click(screen.getByText('Submit Survey'));

    expect(await screen.findByText('Failed to submit survey')).toBeInTheDocument();

    jest.restoreAllMocks();
  });

  it('updates animation state correctly', () => {
    renderWithContext(
      <SurveyContext.Consumer>
        {(value) => (
          <>
            <button onClick={() => value?.setIsAnimating(true)}>Start Animation</button>
            <span>{value?.isAnimating ? 'Animating' : 'Not Animating'}</span>
          </>
        )}
      </SurveyContext.Consumer>
    );

    expect(screen.getByText('Not Animating')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Start Animation'));
    expect(screen.getByText('Animating')).toBeInTheDocument();
  });
});
