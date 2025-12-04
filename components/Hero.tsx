
import React, { useState, useEffect } from 'react';
import { ArrowRight, Activity, Sprout } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t } = useLanguage();

  // Updated with highly reliable Unsplash IDs for agriculture
  const images = [
    "https://images.unsplash.com/photo-1625246333195-09d9b630dc0a?q=80&w=2070&auto=format&fit=crop", // Smart farming drone
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=3264&auto=format&fit=crop", // Green Field Landscape
    "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?q=80&w=2070&auto=format&fit=crop", // Wheat Field Close up (Very reliable)
    "https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?q=80&w=2070&auto=format&fit=crop", // Golden Harvest
    "https://images.unsplash.com/photo-1592982537447-6f2a6a0c8019?q=80&w=1974&auto=format&fit=crop", // Lush Tea/Green
    "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=2068&auto=format&fit=crop", // Strawberry/Agriculture
    "https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=2070&auto=format&fit=crop"  // Hands holding sprout
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 6000); // Slower interval (6s)
    return () => clearInterval(interval);
  }, [images.length]);

  const scrollToCalculator = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('calculator');
    if (element) {
      // Offset for fixed header
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-slate-900">
      
      {/* Background Image Slideshow */}
      {images.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out z-0 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <img 
            src={img} 
            alt="Farm Background" 
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Bright Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-emerald-900/10 to-slate-900/70 z-0"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center mt-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8 animate-pulse-slow shadow-lg">
          <Sprout size={16} className="text-emerald-400" />
          <span>{t.hero.badge}</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-xl">
          {t.hero.titleLine1} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-100">
            {t.hero.titleLine2}
          </span>
        </h1>
        
        <p className="text-xl text-slate-100 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md font-medium text-opacity-90">
          {t.hero.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#calculator" 
            onClick={scrollToCalculator}
            className="group relative px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-[0_4px_20px_rgba(16,185,129,0.4)] border border-emerald-400 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              {t.hero.ctaLoan} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2 shadow-lg border border-white/20 cursor-pointer">
            <Activity size={20} className="text-emerald-300" />
            {t.hero.ctaMandi}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
