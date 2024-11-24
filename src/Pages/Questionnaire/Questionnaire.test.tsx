import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useSurvey } from "../../hooks/useSurvey";
import Questionnaire from "../Questionnaire";
import { surveyData } from "../../constants";

// Mock the useSurvey hook
jest.mock("../../hooks/useSurvey", () => ({
  useSurvey: jest.fn(),
}));

describe("Questionnaire Component", () => {
  const mockSaveAnswer = jest.fn();
  const mockNextQuestion = jest.fn();

  beforeEach(() => {
    (useSurvey as jest.Mock).mockReturnValue({
      saveAnswer: mockSaveAnswer,
      surveyResults: [],
      nextQuestion: mockNextQuestion,
      successMessage: "",
      errorMessage: "",
      currentQuestionIndex: 0,
      isAnimating: false,
      isBack: false,
    });
  });

  it("renders the component with logo, indicators, and question", () => {
    render(<Questionnaire />);

    // Check logo presence
    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();

    // Check indicators
    expect(screen.getByTestId("animatedDiv")).toBeInTheDocument();

    // Check question text
    const questionText = screen.getByText(surveyData[0].question);
    expect(questionText).toBeInTheDocument();
  });

  it("renders success and error messages when provided", () => {
    (useSurvey as jest.Mock).mockReturnValueOnce({
      saveAnswer: mockSaveAnswer,
      surveyResults: [],
      nextQuestion: mockNextQuestion,
      successMessage: "Success!",
      errorMessage: "Error!",
      currentQuestionIndex: 0,
      isAnimating: false,
      isBack: false,
    });

    render(<Questionnaire />);

    expect(screen.getByText("Success!")).toBeInTheDocument();
    expect(screen.getByText("Error!")).toBeInTheDocument();
  });

  it("calls saveAnswer when an option is selected", () => {
    render(<Questionnaire />);

    const optionButton = screen.getByText(surveyData[0].options[0].label);
    fireEvent.click(optionButton);

    expect(mockSaveAnswer).toHaveBeenCalledWith(
      surveyData[0].questionId,
      surveyData[0].question,
      surveyData[0].options[0].label,
      surveyData[0].options[0].id
    );
  });

  it("calls nextQuestion when 'Next' is clicked", () => {
    const mockNextQuestion = jest.fn();
    (useSurvey as jest.Mock).mockReturnValue({
      saveAnswer: jest.fn(),
      surveyResults: [{ optionId: 1, id: 1 }], // Mock valid selection
      nextQuestion: mockNextQuestion,
      successMessage: "",
      errorMessage: "",
      currentQuestionIndex: 0,
      isAnimating: false,
      isBack: false,
    });
  
    render(<Questionnaire />);
  
    // Simulate option selection
    const optionButton = screen.getByText(surveyData[0].options[0].label);
    fireEvent.click(optionButton);
  
    // Find and click the "Next" button
    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);
  
    // Verify nextQuestion is called
    expect(mockNextQuestion).toHaveBeenCalledWith(true, surveyData[0].questionId);
  });
  

  it("applies animation classes based on isAnimating and isBack states", () => {
    (useSurvey as jest.Mock).mockReturnValueOnce({
      saveAnswer: mockSaveAnswer,
      surveyResults: [],
      nextQuestion: mockNextQuestion,
      successMessage: "",
      errorMessage: "",
      currentQuestionIndex: 0,
      isAnimating: true,
      isBack: true,
    });

    render(<Questionnaire />);

    const animatedDiv = screen.getByTestId("animatedDiv");
    expect(animatedDiv).toHaveClass("animate-slide-down");
  });

  it("displays summary when no options are available", () => {
    (useSurvey as jest.Mock).mockReturnValueOnce({
      saveAnswer: mockSaveAnswer,
      surveyResults: [],
      nextQuestion: mockNextQuestion,
      successMessage: "",
      errorMessage: "",
      currentQuestionIndex: surveyData.length - 1, // Last question
      isAnimating: false,
      isBack: false,
    });

    render(<Questionnaire />);

    expect(screen.getByText("Summary")).toBeInTheDocument(); // Adjust based on your Summary component
  });
});
