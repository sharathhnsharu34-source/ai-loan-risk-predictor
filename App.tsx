
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Calculator from './components/Calculator';
import GovernmentSchemes from './components/GovernmentSchemes';
import VoiceAssistant from './components/VoiceAssistant';
import Footer from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-200">
        <Header />
        <Hero />
        <Features />
        <Calculator />
        <GovernmentSchemes />
        <Footer />
        <VoiceAssistant />
      </div>
    </LanguageProvider>
  );
};

export default App;