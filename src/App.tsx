import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Questionnaire from './Pages/Questionnaire';
import './App.css';
import { SurveyProvider } from './context';
import PageNotFound from './Pages/PageNotFound';

function App() {
  return (
   <SurveyProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Questionnaire />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  </SurveyProvider>
  );
}

export default App;
