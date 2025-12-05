import React, { useState, useEffect } from 'react';
import { Sprout, Globe, ChevronDown, Moon, Sun, Bell, MessageSquare, User } from 'lucide-react';
import { useLanguage, LanguageCode } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useNotification } from '../contexts/NotificationContext';
import { useAuth } from '../contexts/AuthContext';
import ProfileModal from './ProfileModal';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [inboxOpen, setInboxOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { notifications, unreadCount, markAsRead } = useNotification();
  const { user } = useAuth();

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

  const toggleInbox = () => {
    if (!inboxOpen) {
      markAsRead();
    }
    setInboxOpen(!inboxOpen);
    setLangMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md py-3 border-b border-emerald-100 dark:border-slate-800' : 'bg-transparent py-6'}`}>
      <div className="w-full px-4 md:px-10 flex items-center justify-between">
        <div className={`flex items-center gap-2 font-bold text-xl tracking-tight ${scrolled ? 'text-emerald-900 dark:text-emerald-400' : 'text-white'}`}>
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
            <Sprout size={20} className="text-white" />
          </div>
          Loan4Farm<span className="text-emerald-500">.AI</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#home" className={`text-sm font-medium transition-colors ${scrolled ? 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400' : 'text-slate-200 hover:text-white'}`}>{t.nav.home}</a>
          <a href="#features" className={`text-sm font-medium transition-colors ${scrolled ? 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400' : 'text-slate-200 hover:text-white'}`}>{t.nav.features}</a>
          <a href="#calculator" className={`text-sm font-medium transition-colors ${scrolled ? 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400' : 'text-slate-200 hover:text-white'}`}>{t.nav.riskEngine}</a>
          <a href="#schemes" className={`text-sm font-medium transition-colors ${scrolled ? 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400' : 'text-slate-200 hover:text-white'}`}>{t.nav.schemes}</a>
          <a href="#footer" className={`text-sm font-medium transition-colors ${scrolled ? 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400' : 'text-slate-200 hover:text-white'}`}>{t.nav.about}</a>
        </nav>

        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${scrolled ? 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800' : 'text-white hover:bg-white/10'}`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Multilingual Selector */}
          <div className="relative">
            <button 
              onClick={() => { setLangMenuOpen(!langMenuOpen); setInboxOpen(false); }}
              className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full transition-all ${scrolled ? 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800' : 'text-white hover:bg-white/10'}`}
            >
              <Globe size={16} />
              <span className="hidden sm:inline">{language}</span>
              <ChevronDown size={14} className={`transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {langMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-100 dark:border-slate-700 py-1 overflow-hidden animate-in fade-in zoom-in duration-200 max-h-64 overflow-y-auto">
                {languages.map((lang) => (
                  <button 
                    key={lang.code}
                    onClick={() => handleLangChange(lang.code)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400 ${language === lang.code ? 'bg-emerald-50 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-700 dark:text-slate-200'}`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Inbox Notification Bell */}
          <div className="relative">
            <button 
              onClick={toggleInbox}
              className={`p-2 rounded-full transition-colors relative ${scrolled ? 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800' : 'text-white hover:bg-white/10'}`}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white dark:border-slate-900"></span>
              )}
            </button>

            {inboxOpen && (
               <div className="absolute top-full right-0 mt-3 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden animate-in fade-in zoom-in duration-200 origin-top-right">
                 <div className="p-3 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex justify-between items-center">
                   <span className="font-bold text-slate-700 dark:text-white text-sm">Notifications</span>
                   <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium cursor-pointer">Mark all read</span>
                 </div>
                 <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-slate-400 text-sm">
                        No new messages
                      </div>
                    ) : (
                      notifications.map((note) => (
                        <div key={note.id} className="p-4 border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors flex gap-3">
                           <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-full h-fit mt-1">
                             <MessageSquare size={14} className="text-emerald-600 dark:text-emerald-400" />
                           </div>
                           <div>
                             <p className="text-sm text-slate-800 dark:text-slate-200 leading-snug">{note.text}</p>
                             <span className="text-[10px] text-slate-400 mt-1 block">{note.time}</span>
                           </div>
                        </div>
                      ))
                    )}
                 </div>
               </div>
            )}
          </div>

          {/* Profile Button */}
          <button 
            onClick={() => setIsProfileOpen(true)}
            className={`hidden sm:flex items-center gap-2 px-4 py-1.5 text-sm font-semibold rounded-full transition-all backdrop-blur-sm ${scrolled ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md' : 'bg-white/20 text-white hover:bg-white/30 border border-white/20'}`}
          >
            <User size={16} />
            <span>{user ? user.name.split(' ')[0] : t.nav.profile}</span>
          </button>
        </div>
      </div>
      
      {/* Profile Modal */}
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

    </header>
  );
};

export default Header;