
import React, { useState, useEffect } from 'react';
import { Sprout, Globe, ChevronDown } from 'lucide-react';
import { useLanguage, LanguageCode } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const languages: { code: LanguageCode; label: string }[] = [
    { code: 'EN', label: 'English' },
    { code: 'HI', label: 'Hindi (हिंदी)' },
    { code: 'MR', label: 'Marathi (मराठी)' },
    { code: 'KN', label: 'Kannada (ಕನ್ನಡ)' },
    { code: 'TA', label: 'Tamil (தமிழ்)' },
    { code: 'TE', label: 'Telugu (తెలుగు)' },
    { code: 'GU', label: 'Gujarati (ગુજરાતી)' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLangChange = (code: LanguageCode) => {
    setLanguage(code);
    setLangMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-emerald-100' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className={`flex items-center gap-2 font-bold text-xl tracking-tight ${scrolled ? 'text-emerald-900' : 'text-white'}`}>
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
            <Sprout size={20} className="text-white" />
          </div>
          Loan4Farm<span className="text-emerald-500">.AI</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#home" className={`text-sm font-medium transition-colors ${scrolled ? 'text-slate-600 hover:text-emerald-600' : 'text-slate-200 hover:text-white'}`}>{t.nav.home}</a>
          <a href="#features" className={`text-sm font-medium transition-colors ${scrolled ? 'text-slate-600 hover:text-emerald-600' : 'text-slate-200 hover:text-white'}`}>{t.nav.features}</a>
          <a href="#calculator" className={`text-sm font-medium transition-colors ${scrolled ? 'text-slate-600 hover:text-emerald-600' : 'text-slate-200 hover:text-white'}`}>{t.nav.riskEngine}</a>
          <a href="#footer" className={`text-sm font-medium transition-colors ${scrolled ? 'text-slate-600 hover:text-emerald-600' : 'text-slate-200 hover:text-white'}`}>{t.nav.about}</a>
        </nav>

        <div className="flex items-center gap-4">
          {/* Multilingual Selector */}
          <div className="relative">
            <button 
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full transition-all ${scrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
            >
              <Globe size={16} />
              <span>{language}</span>
              <ChevronDown size={14} className={`transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {langMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-100 py-1 overflow-hidden animate-in fade-in zoom-in duration-200 max-h-64 overflow-y-auto">
                {languages.map((lang) => (
                  <button 
                    key={lang.code}
                    onClick={() => handleLangChange(lang.code)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-emerald-50 hover:text-emerald-600 ${language === lang.code ? 'bg-emerald-50 text-emerald-600 font-bold' : 'text-slate-700'}`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className={`px-5 py-2 text-sm font-semibold rounded-full transition-all backdrop-blur-sm ${scrolled ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md' : 'bg-white/20 text-white hover:bg-white/30 border border-white/20'}`}>
            {t.nav.login}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
