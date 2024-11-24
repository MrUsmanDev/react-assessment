type SurveyItem = {
  questionId: number;
  question: string;
  description?: string;
  options: { id: number; icon: string; label: string }[];
};
const surveyData : SurveyItem[] = [
    {
      questionId: 1,
      question: "How was your week overall?",
      options: [
        { id:1, icon: "👍", label: "Good" },
        { id:2, icon: "🤔", label: "Okay" },
        { id:3, icon: "👎", label: "Bad" }
      ]
    },
    {
      questionId: 2,
      question: "How do you feel about your productivity this week?",
      options: [
        { id:1, icon: "🌟", label: "Great" },
        { id:2, icon: "😐", label: "Average" },
        { id:3, icon: "😩", label: "Not good" }
      ]
    },
    {
      questionId: 3,
      question: "How satisfied are you with your work-life balance?",
      options: [
        { id:1, icon: "😊", label: "Satisfied" },
        { id:2, icon: "🤷", label: "Neutral" },
        { id:3, icon: "😔", label: "Dissatisfied" }
      ]
    },
    {
      questionId: 4,
      question: "How would you rate your energy levels this week?",
      options: [
        { id:1, icon: "🔋", label: "High" },
        { id:2, icon: "⚡", label: "Moderate" },
        { id:3, icon: "💤", label: "Low" }
      ]
    },
    {
      questionId: 5,
      question: "How connected did you feel with your team this week?",
      options: [
        { id:1, icon: "🤝", label: "Very connected" },
        { id:2, icon: "👌", label: "Connected" },
        { id:3, icon: "🛑", label: "Not connected" }
      ]
    },
    {
      questionId: 6,
      question: "Summary",
      description:"Please verify and submit your data",
      options: []
    }
  ];

  export {surveyData}