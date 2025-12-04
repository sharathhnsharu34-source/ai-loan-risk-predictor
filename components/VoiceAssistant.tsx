import React, { useState, useRef, useEffect } from 'react';
import { Mic, X, Loader2, Volume2 } from 'lucide-react';
import { processVoiceCommand } from '../services/geminiService';
import { useLanguage, LanguageCode } from '../contexts/LanguageContext';

const VoiceAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const { language } = useLanguage();
  
  const recognitionRef = useRef<any>(null);

  // Map internal language code to BCP 47 tags for Speech Recognition
  const getLocale = (code: LanguageCode): string => {
    switch (code) {
      case 'HI': return 'hi-IN';
      case 'MR': return 'mr-IN';
      case 'KN': return 'kn-IN';
      case 'TA': return 'ta-IN';
      case 'TE': return 'te-IN';
      case 'GU': return 'gu-IN';
      default: return 'en-IN';
    }
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Voice recognition not supported in this browser.");
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = getLocale(language);

    recognitionRef.current.onstart = () => setIsListening(true);
    
    recognitionRef.current.onresult = async (event: any) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      setIsListening(false);
      handleCommand(text);
    };

    recognitionRef.current.onerror = () => setIsListening(false);
    recognitionRef.current.onend = () => setIsListening(false);

    recognitionRef.current.start();
  };

  const handleCommand = async (text: string) => {
    setIsProcessing(true);
    const aiResponse = await processVoiceCommand(text);
    setResponse(aiResponse);
    setIsProcessing(false);
    speak(aiResponse);
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    // Note: Browser TTS support for regional languages varies significantly. 
    // Usually, 'hi-IN' is available, but others might fallback to English.
    utterance.lang = getLocale(language);
    window.speechSynthesis.speak(utterance);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 transition-all hover:scale-110 z-50 animate-bounce"
      >
        <Mic size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white dark:bg-slate-800 rounded-2xl border border-emerald-100 dark:border-slate-700 p-4 shadow-2xl z-50 flex flex-col gap-4 transition-colors">
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 pb-2">
        <h4 className="font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-2">
          <Mic size={16} className="text-emerald-600 dark:text-emerald-400" /> Farm Assist ({language})
        </h4>
        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
          <X size={16} />
        </button>
      </div>

      <div className="min-h-[100px] bg-slate-50 dark:bg-slate-700 rounded-lg p-3 text-sm border border-slate-100 dark:border-slate-600">
        {isListening ? (
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
             <span className="animate-ping w-2 h-2 bg-emerald-500 rounded-full"></span>
             Listening...
          </div>
        ) : isProcessing ? (
          <div className="flex items-center gap-2 text-amber-500 font-medium">
            <Loader2 size={14} className="animate-spin" /> Analyzing...
          </div>
        ) : response ? (
          <div className="text-slate-800 dark:text-slate-200">{response}</div>
        ) : (
          <div className="text-slate-500 dark:text-slate-400 italic">"Ask about wheat prices in Punjab..."</div>
        )}
        
        {transcript && !isListening && !isProcessing && (
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-600 pt-2">
            You: "{transcript}"
          </div>
        )}
      </div>

      <button 
        onClick={startListening}
        disabled={isListening || isProcessing}
        className={`w-full py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${isListening ? 'bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 border border-red-200 dark:border-red-800' : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'}`}
      >
        {isListening ? 'Stop' : 'Tap to Speak'}
      </button>
    </div>
  );
};

export default VoiceAssistant;