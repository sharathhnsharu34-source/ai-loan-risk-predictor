import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const FarmerScore: React.FC = () => {
  const { t } = useLanguage();
  
  // Fake Score calculation visual
  const score = 782;
  const max = 900;
  const percentage = (score / max) * 100;
  const dashArray = 251; // 2 * pi * 40
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl shadow-xl border border-amber-500/30 text-center relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-2 bg-amber-500/20 rounded-bl-xl text-amber-400 text-xs font-bold border-b border-l border-amber-500/20">
        AI CIBIL
      </div>

      <h3 className="text-white font-bold mb-4">{t.score.label}</h3>
      
      <div className="relative w-40 h-40 mx-auto mb-4">
        {/* SVG Gauge */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background Circle */}
          <circle 
            cx="50" cy="50" r="40" 
            fill="transparent" 
            stroke="#1e293b" 
            strokeWidth="8" 
          />
          {/* Progress Circle */}
          <circle 
            cx="50" cy="50" r="40" 
            fill="transparent" 
            stroke="#fbbf24" 
            strokeWidth="8" 
            strokeLinecap="round"
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-3xl font-bold text-white">{score}</div>
          <div className="text-xs text-amber-400 font-bold uppercase">Gold</div>
        </div>
      </div>

      <p className="text-sm text-slate-300 bg-white/5 p-3 rounded-lg border border-white/10">
        {t.score.subtext}
      </p>
    </div>
  );
};

export default FarmerScore;