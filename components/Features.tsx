
import React, { useState, useEffect, useMemo } from 'react';
import { CloudRain, Sprout, TrendingUp, ShieldCheck, Calculator, Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Features: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const { t } = useLanguage();

  const featuresList = useMemo(() => [
    {
      id: 1,
      icon: <CloudRain size={24} />,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
      iconBg: "bg-blue-100 text-blue-600"
    },
    {
      id: 2,
      icon: <Sprout size={24} />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      iconBg: "bg-emerald-100 text-emerald-600"
    },
    {
      id: 3,
      icon: <TrendingUp size={24} />,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-200",
      iconBg: "bg-purple-100 text-purple-600"
    },
    {
      id: 4,
      icon: <ShieldCheck size={24} />,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
      iconBg: "bg-amber-100 text-amber-600"
    },
    {
      id: 5,
      icon: <Calculator size={24} />,
      color: "text-cyan-600",
      bg: "bg-cyan-50",
      border: "border-cyan-200",
      iconBg: "bg-cyan-100 text-cyan-600"
    },
    {
      id: 6,
      icon: <Languages size={24} />,
      color: "text-pink-600",
      bg: "bg-pink-50",
      border: "border-pink-200",
      iconBg: "bg-pink-100 text-pink-600"
    }
  ], []);

  // Merge static visual data with translated text data
  const features = featuresList.map((f, i) => ({
    ...f,
    title: t.features.list[i].title,
    desc: t.features.list[i].desc
  }));

  // Auto-rotate active feature
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [features.length]);

  // Radial positioning logic
  const radius = 280; // Distance from center
  const center = { x: 400, y: 400 }; // SVG canvas center

  return (
    <section id="features" className="relative py-24 bg-gradient-to-b from-white via-emerald-50/30 to-white overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
            {t.features.sectionTitle} <span className="text-emerald-600">{t.features.sectionTitleHighlight}</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            {t.features.sectionDesc}
          </p>
        </div>

        {/* Mobile View: Vertical Cards */}
        <div className="lg:hidden flex flex-col gap-4">
          {features.map((feature, idx) => (
            <div 
              key={feature.id}
              className={`p-6 rounded-xl border transition-all ${activeFeature === idx ? `${feature.bg} ${feature.border} shadow-md` : 'bg-white border-slate-100 shadow-sm'}`}
              onClick={() => setActiveFeature(idx)}
            >
              <div className="flex items-center gap-4 mb-2">
                <div className={`p-2 rounded-lg ${feature.iconBg}`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-800">{feature.title}</h3>
              </div>
              <p className="text-sm text-slate-600">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Desktop View: Radial Hub & Spoke - LIGHT THEME */}
        <div className="hidden lg:block relative h-[800px] w-full max-w-[800px] mx-auto">
          
          {/* SVG Connector Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 800">
            <defs>
              <radialGradient id="coreGradientLight" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </radialGradient>
            </defs>
            
            {/* Pulsing Core Glow */}
            <circle cx="400" cy="400" r="140" fill="url(#coreGradientLight)" className="animate-pulse-slow" />
            
            {/* Connecting Dashed Lines */}
            {features.map((_, idx) => {
              const angle = (idx * 60 - 90) * (Math.PI / 180);
              const x = center.x + radius * Math.cos(angle);
              const y = center.y + radius * Math.sin(angle);
              return (
                <line 
                  key={`line-${idx}`}
                  x1="400" y1="400" 
                  x2={x} y2={y} 
                  stroke="#cbd5e1" 
                  strokeWidth="2" 
                  strokeDasharray="6,4" 
                />
              );
            })}

            {/* Strategic Arcs */}
            {/* Top Arc: Yield (Green) */}
            <path d="M 250 200 Q 400 50 550 200" fill="none" stroke="#10b981" strokeWidth="6" strokeOpacity="1" strokeLinecap="round" />
            <text x="400" y="100" textAnchor="middle" fill="#059669" fontSize="14" fontWeight="bold" letterSpacing="1">{t.features.diagram.yield}</text>

            {/* Right Arc: Risk (Amber) */}
            <path d="M 600 300 Q 750 400 600 500" fill="none" stroke="#f59e0b" strokeWidth="6" strokeOpacity="1" strokeLinecap="round" />
            <text x="690" y="400" textAnchor="middle" fill="#d97706" fontSize="14" fontWeight="bold" letterSpacing="1" transform="rotate(90, 690, 400)">{t.features.diagram.risk}</text>

            {/* Left Arc: Growth (Blue) */}
            <path d="M 200 500 Q 50 400 200 300" fill="none" stroke="#3b82f6" strokeWidth="6" strokeOpacity="1" strokeLinecap="round" />
            <text x="110" y="400" textAnchor="middle" fill="#2563eb" fontSize="14" fontWeight="bold" letterSpacing="1" transform="rotate(-90, 110, 400)">{t.features.diagram.growth}</text>

          </svg>

          {/* Central AI Core Node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-white border-4 border-emerald-50 flex flex-col items-center justify-center z-20 shadow-[0_10px_40px_rgba(0,0,0,0.1)]">
            <div className="p-4 rounded-full bg-emerald-100 mb-2">
               <Sprout size={40} className="text-emerald-600" />
            </div>
            <span className="text-emerald-800 font-bold tracking-widest text-sm">GEMINI AI</span>
            <span className="text-[10px] text-emerald-600 font-medium mt-1 uppercase bg-emerald-100 px-2 py-0.5 rounded-full">Active</span>
          </div>

          {/* Orbiting Feature Nodes */}
          {features.map((feature, idx) => {
             const angle = (idx * 60 - 90) * (Math.PI / 180);
             const top = 50 + 35 * Math.sin(angle); 
             const left = 50 + 35 * Math.cos(angle);
             
             const isActive = activeFeature === idx;

             return (
               <div
                 key={feature.id}
                 className={`absolute transition-all duration-500 transform -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group`}
                 style={{ top: `${top}%`, left: `${left}%` }}
                 onMouseEnter={() => setActiveFeature(idx)}
               >
                 {/* The Node Circle */}
                 <div className={`w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-xl ${isActive ? 'bg-white border-emerald-500 scale-110 shadow-emerald-200' : 'bg-white border-slate-200 hover:border-emerald-300'}`}>
                   <div className={`${isActive ? 'text-emerald-600' : 'text-slate-400'} transition-colors`}>
                     {feature.icon}
                   </div>
                 </div>

                 {/* The Floating Card */}
                 <div className={`absolute top-24 left-1/2 -translate-x-1/2 w-72 bg-white p-5 rounded-lg border-t-4 shadow-xl transition-all duration-500 z-40 ${isActive ? `opacity-100 translate-y-0 ${feature.border.replace('border', 'border-t')} ${feature.border.replace('border', 'border')}` : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                   <h4 className={`font-bold mb-2 text-lg ${feature.color}`}>{feature.title}</h4>
                   <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
                 </div>
               </div>
             );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
