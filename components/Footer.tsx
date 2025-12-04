
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer id="footer" className="bg-slate-900 py-12 text-slate-400">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-8">
           <h2 className="text-2xl font-bold text-white mb-2">Loan4Farm <span className="text-emerald-500">India</span></h2>
           <p className="text-sm max-w-md mx-auto">{t.footer.tagline}</p>
        </div>
        <div className="flex justify-center gap-8 mb-8 text-sm">
          <a href="#" className="hover:text-emerald-400 transition-colors">{t.footer.links.privacy}</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">{t.footer.links.terms}</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">{t.footer.links.support}</a>
        </div>
        <div className="text-xs text-slate-600">
          &copy; {new Date().getFullYear()} Loan4Farm AI. {t.footer.madeFor}.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
