import React from "react";
import { useSurvey } from "../hooks/useSurvey";
import { render } from "@testing-library/react";

import { SurveyContext } from "../context";

describe("useSurvey Hook", () => {
  it("should return the context when used within SurveyProvider", () => {
    
    const mockContextValue = {
        surveyResults: [],
        saveAnswer: jest.fn(),
        nextQuestion: jest.fn(),
        prevQuestion: jest.fn(),
        isSubmitting: false,
        successMessage: "",
        errorMessage: "",
        submitSurvey: jest.fn(),
        currentQuestionIndex: 0,
        isAnimating: false,
        isBack: false,
        handleIndicatorClick: jest.fn(),
        setIsAnimating: jest.fn(),
      };
  
    const MockProvider = ({ children }: { children: React.ReactNode }) => (
      <SurveyContext.Provider value={mockContextValue}>{children}</SurveyContext.Provider>
    );

    let contextValue: any;
    const TestComponent = () => {
      contextValue = useSurvey();
      return null;
    };

    render(
      <MockProvider>
        <TestComponent />
      </MockProvider>
    );

    expect(contextValue).toEqual(mockContextValue);
  });

  it("should throw an error when used outside SurveyProvider", () => {
    let error: Error | null = null;

    const TestComponent = () => {
      try {
        useSurvey(); // Call the hook outside the provider
      } catch (e) {
        error = e as Error;
      }
      return null;
    };

    render(<TestComponent />);

    expect(error).toEqual(new Error("useSurvey must be used within a SurveyProvider"));
  });
});
