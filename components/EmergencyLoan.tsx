import React, { useState } from 'react';
import { Camera, AlertTriangle, Loader2, CheckCircle, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const EmergencyLoan: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0); // 0: Closed, 1: Upload, 2: Analyzing, 3: Success
  const { t } = useLanguage();

  const handleUpload = () => {
    setStep(2);
    setTimeout(() => {
      setStep(3);
    }, 4000);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => { setIsOpen(true); setStep(1); }}
        className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white p-4 rounded-xl shadow-lg border-2 border-red-400 flex items-center justify-between group transition-all"
      >
        <span className="font-bold flex items-center gap-2">
          <AlertTriangle className="animate-pulse" /> {t.emergency.btn}
        </span>
        <span className="bg-red-800 px-3 py-1 rounded text-xs font-mono">2 HRS</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl p-6 relative animate-in zoom-in duration-300 border border-red-500/30 shadow-2xl">
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-red-500"
        >
          <X />
        </button>

        <h3 className="text-xl font-bold text-red-600 mb-6 flex items-center gap-2">
          <AlertTriangle /> {t.emergency.title}
        </h3>

        {step === 1 && (
          <div className="text-center">
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl h-48 flex flex-col items-center justify-center mb-6 bg-slate-50 dark:bg-slate-800">
              <Camera size={48} className="text-slate-400 mb-2" />
              <p className="text-slate-500 dark:text-slate-400">{t.emergency.step1}</p>
            </div>
            <button 
              onClick={handleUpload}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-bold shadow-lg hover:bg-red-700"
            >
              Upload & Scan
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="text-center py-10">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-red-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-red-600 rounded-full border-t-transparent animate-spin"></div>
              <Camera size={24} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-600" />
            </div>
            <h4 className="text-lg font-bold text-slate-800 dark:text-white animate-pulse">
              {t.emergency.analyzing}
            </h4>
            <p className="text-sm text-slate-500 mt-2">Checking satellite & visual data...</p>
          </div>
        )}

        {step === 3 && (
          <div className="text-center">
            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-xl border border-green-200 dark:border-green-800 mb-6">
              <CheckCircle size={40} className="text-green-600 mx-auto mb-2" />
              <p className="text-green-800 dark:text-green-200 font-bold text-lg leading-tight">
                {t.emergency.result}
              </p>
            </div>
            <p className="text-slate-500 text-xs mb-4">Funds will be disbursed to your registered KCC account.</p>
            <button 
              onClick={() => setIsOpen(false)}
              className="w-full bg-slate-900 dark:bg-slate-700 text-white py-3 rounded-lg font-bold"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyLoan;