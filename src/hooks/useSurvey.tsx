import { useContext } from "react";

import { SurveyContext } from "../context";

export const useSurvey = (): SurveyContextType => {
    const context = useContext(SurveyContext);
    if (!context) {
      throw new Error('useSurvey must be used within a SurveyProvider');
    }
    return context;
  };
  