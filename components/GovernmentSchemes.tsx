import React from 'react';
import { ExternalLink, Landmark } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const GovernmentSchemes: React.FC = () => {
  const { t } = useLanguage();

  const schemes = [
    {
      id: 1,
      name: "PM-KISAN",
      fullName: "Pradhan Mantri Kisan Samman Nidhi",
      desc: "Financial support of ₹6,000 per year for landholding farmer families.",
      url: "https://pmkisan.gov.in/",
      color: "border-green-500"
    },
    {
      id: 2,
      name: "PMFBY",
      fullName: "Pradhan Mantri Fasal Bima Yojana",
      desc: "Crop insurance scheme providing financial support for crop loss due to natural calamities.",
      url: "https://pmfby.gov.in/",
      color: "border-amber-500"
    },
    {
      id: 3,
      name: "KCC",
      fullName: "Kisan Credit Card",
      desc: "Timely credit for farmers for cultivation, post-harvest expenses, and working capital.",
      url: "https://myscheme.gov.in/schemes/kcc",
      color: "border-blue-500"
    },
    {
      id: 4,
      name: "e-NAM",
      fullName: "National Agriculture Market",
      desc: "Pan-India electronic trading portal networking existing APMC mandis to create a unified national market.",
      url: "https://enam.gov.in/",
      color: "border-emerald-600"
    },
    {
      id: 5,
      name: "Soil Health Card",
      fullName: "Soil Health Card Scheme",
      desc: "Provides information to farmers on nutrient status of their soil along with recommendations.",
      url: "https://soilhealth.dac.gov.in/",
      color: "border-amber-600"
    },
    {
      id: 6,
      name: "PKVY",
      fullName: "Paramparagat Krishi Vikas Yojana",
      desc: "Promotes organic farming through cluster approach and Participatory Guarantee System (PGS).",
      url: "https://pgsindia-ncof.gov.in/pkvy/index.aspx",
      color: "border-green-600"
    }
  ];

  return (
    <section id="schemes" className="py-20 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-4">
            <Landmark size={32} className="text-emerald-700 dark:text-emerald-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {t.schemes.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            {t.schemes.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme) => (
            <div 
              key={scheme.id} 
              className={`group bg-white dark:bg-slate-800 p-6 rounded-xl border-l-4 ${scheme.color} shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between`}
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{scheme.name}</h3>
                  <img 
                    src={`https://ui-avatars.com/api/?name=${scheme.name}&background=random&color=fff&size=40&font-size=0.4`} 
                    alt={scheme.name}
                    className="w-10 h-10 rounded-full opacity-80"
                  />
                </div>
                <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wide">{scheme.fullName}</h4>
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  {scheme.desc}
                </p>
              </div>
              
              <a 
                href={scheme.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors"
              >
                {t.schemes.btnText} <ExternalLink size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GovernmentSchemes;