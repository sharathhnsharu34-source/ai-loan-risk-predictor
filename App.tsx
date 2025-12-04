import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Calculator from './components/Calculator';
import GovernmentSchemes from './components/GovernmentSchemes';
import VoiceAssistant from './components/VoiceAssistant';
import Footer from './components/Footer';
import WhatsAppNotification from './components/WhatsAppNotification';
import Login from './components/Login'; // Added
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { AuthProvider, useAuth } from './contexts/AuthContext'; // Added

// Separate MainContent to use the Auth Hook context
const MainContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-200 dark:selection:bg-emerald-800 transition-colors duration-300 relative">
      <Header />
      <Hero />
      <Features />
      <Calculator />
      <GovernmentSchemes />
      <Footer />
      <VoiceAssistant />
      <WhatsAppNotification />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <NotificationProvider>
            <MainContent />
          </NotificationProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;