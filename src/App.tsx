import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { LandingPage } from './pages/LandingPage';
import { AnalyzerPage } from './pages/AnalyzerPage';
import { PricingPage } from './pages/PricingPage';
import { Chatbot } from './components/Chatbot';

import { FileProvider } from './context/FileContext';

function App() {
  return (
    <FileProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/analyze" element={<AnalyzerPage />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Routes>
        <Chatbot />
      </Router>
    </FileProvider>
  );
}

export default App;