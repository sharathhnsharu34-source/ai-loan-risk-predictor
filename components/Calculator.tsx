import React, { useState } from 'react';
import { analyzeFarmData } from '../services/geminiService';
import { FarmData, AnalysisResult } from '../types';
import { Loader2, Sprout, AlertTriangle, CheckCircle, BarChart3, CloudRain, ShieldCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import FarmerScore from './FarmerScore';
import EmergencyLoan from './EmergencyLoan';
import LoanWorkflow from './LoanWorkflow';

const Calculator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const { t } = useLanguage();
  const { updateCrop } = useAuth();
  
  const [formData, setFormData] = useState<FarmData>({
    crop: 'Wheat',
    landSize: 5,
    location: '',
    loanAmount: 500000,
    soilType: 'Alluvial',
    season: 'Rabi'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'landSize' || name === 'loanAmount' ? Number(value) : value
    }));
  };

  const handleAnalysis = async () => {
    setLoading(true);
    // Update profile crop
    updateCrop(formData.crop);
    
    const data = await analyzeFarmData(formData, 'Full Risk & Profit Assessment');
    setResult(data);
    setLoading(false);
  };

  // Helper to calculate bar heights for the graph
  const getGraphHeights = (cost: number, profit: number) => {
    const revenue = cost + profit;
    // Handle loss scenario where revenue is less than cost
    const maxVal = Math.max(cost, Math.max(revenue, 0)) * 1.1; 
    
    // Protect against divide by zero
    if (maxVal === 0) return { costHeight: '0%', revenueHeight: '0%', totalRevenue: 0 };

    return {
      costHeight: `${(cost / maxVal) * 100}%`,
      revenueHeight: `${(Math.max(revenue, 0) / maxVal) * 100}%`,
      totalRevenue: revenue
    };
  };

  const graphData = result ? getGraphHeights(result.estimatedCost, result.projectedProfit) : { costHeight: '0%', revenueHeight: '0%', totalRevenue: 0 };

  // Helper to format Climate Risk Label
  const getClimateRiskLabel = (risk: string) => {
    if (risk === 'Safe') return 'Low Risk';
    if (risk === 'Moderate') return 'Medium Risk';
    return 'High Risk';
  };

  return (
    <section id="calculator" className="py-20 bg-emerald-50 dark:bg-slate-900 relative scroll-mt-28 transition-colors duration-300">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Input Form */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 transition-colors">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                <CalculatorIcon /> 
                <span>{t.calculator.title}</span>
              </h3>
              
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-1">{t.calculator.labelCrop}</label>
                  <select 
                    name="crop" 
                    value={formData.crop} 
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg p-3 text-slate-800 dark:text-white focus:border-emerald-500 outline-none transition-colors"
                  >
                    <option>Wheat (Rabi)</option>
                    <option>Rice/Paddy (Kharif)</option>
                    <option>Cotton</option>
                    <option>Sugarcane</option>
                    <option>Maize</option>
                    <option>Pulses (Dal)</option>
                    <option>Mustard</option>
                    <option>Soybean</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-1">{t.calculator.labelLand}</label>
                    <input 
                      type="number" 
                      name="landSize" 
                      value={formData.landSize} 
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg p-3 text-slate-800 dark:text-white focus:border-emerald-500 outline-none transition-colors" 
                    />
                  </div>
                  <div>
                     <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-1">{t.calculator.labelSoil}</label>
                     <select 
                      name="soilType" 
                      value={formData.soilType} 
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg p-3 text-slate-800 dark:text-white focus:border-emerald-500 outline-none transition-colors"
                    >
                      <option>Alluvial (River)</option>
                      <option>Black (Regur)</option>
                      <option>Red Soil</option>
                      <option>Laterite</option>
                      <option>Sandy</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-1">{t.calculator.labelLocation}</label>
                  <input 
                    type="text" 
                    name="location" 
                    value={formData.location} 
                    onChange={handleInputChange}
                    placeholder="e.g. Nashik, Maharashtra"
                    className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg p-3 text-slate-800 dark:text-white focus:border-emerald-500 outline-none transition-colors" 
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-1">{t.calculator.labelLoan}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500 dark:text-slate-400 font-bold">₹</span>
                    <input 
                      type="number" 
                      name="loanAmount" 
                      value={formData.loanAmount} 
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg p-3 pl-8 text-slate-800 dark:text-white focus:border-emerald-500 outline-none font-mono font-medium transition-colors" 
                    />
                  </div>
                </div>

                <button 
                  onClick={handleAnalysis}
                  disabled={loading}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 mt-4"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" /> {t.calculator.btnLoading}
                    </>
                  ) : (
                    t.calculator.btnAnalyze
                  )}
                </button>
                
                {/* EMERGENCY LOAN BUTTON FEATURE */}
                <EmergencyLoan />

              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="w-full lg:w-2/3">
            {!result ? (
              <div className="h-full flex flex-col items-center justify-center bg-white dark:bg-slate-800 rounded-2xl p-12 border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500 text-center transition-colors">
                <Sprout size={64} className="mb-4 text-emerald-100 dark:text-emerald-900/50" />
                <p className="text-xl font-medium">{t.calculator.placeholder}</p>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* FARMER CIBIL SCORE FEATURE */}
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                        {/* 1. Risk Score Card */}
                       <div className={`h-full p-6 rounded-xl border-l-4 shadow-md bg-white dark:bg-slate-800 transition-colors ${result.riskLevel === 'Low' ? 'border-emerald-500' : result.riskLevel === 'Medium' ? 'border-amber-500' : 'border-red-500'}`}>
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider">{t.calculator.resultRisk}</span>
                          {result.riskLevel === 'Low' ? <CheckCircle size={20} className="text-emerald-500"/> : <AlertTriangle size={20} className="text-amber-500"/>}
                        </div>
                        <div className="text-4xl font-bold text-slate-800 dark:text-white mb-1">{result.riskScore}<span className="text-lg text-slate-400">/100</span></div>
                        <div className={`text-sm font-semibold ${result.riskLevel === 'Low' ? 'text-emerald-600 dark:text-emerald-400' : result.riskLevel === 'Medium' ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`}>
                          Level: {result.riskLevel}
                        </div>
                      </div>
                    </div>
                    {/* NEW GAUGE FEATURE */}
                    <FarmerScore />
                </div>

                {/* 2. Max Loan Card & Apply Button */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-xl bg-white dark:bg-slate-800 border-l-4 border-purple-500 shadow-md transition-colors">
                     <span className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider block mb-2">{t.calculator.resultLimit}</span>
                     <div className="text-3xl font-bold text-slate-800 dark:text-white mb-1">₹{result.maxLoanSuggestion.toLocaleString('en-IN')}</div>
                     <div className="text-sm text-slate-500 dark:text-slate-400">{t.calculator.resultCap}</div>
                  </div>
                  {/* WORKFLOW TRIGGER BUTTON */}
                  <div className="flex items-center">
                    <button 
                        onClick={() => setShowWorkflow(true)}
                        className="w-full h-full min-h-[100px] bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white rounded-xl shadow-lg flex flex-col items-center justify-center font-bold text-lg group transition-all"
                    >
                        <span>{t.calculator.btnApply}</span>
                        <ArrowRight className="mt-2 group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* 3. Soil & Climate Visualization Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {/* Soil Suitability Meter */}
                   <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-slate-100 dark:border-slate-700 transition-colors">
                      <h5 className="text-slate-700 dark:text-slate-200 font-bold mb-4 flex items-center gap-2">
                        <Sprout size={18} className="text-emerald-600 dark:text-emerald-400" /> Soil Suitability
                      </h5>
                      <div className="relative pt-2">
                        <div className="flex justify-between text-xs font-semibold text-slate-400 mb-1">
                          <span>Poor</span>
                          <span>Excellent</span>
                        </div>
                        <div className="h-4 w-full bg-gradient-to-r from-red-500 via-yellow-400 to-emerald-500 rounded-full relative">
                           <div 
                              className="absolute top-0 w-1 h-6 bg-slate-800 dark:bg-white -mt-1 rounded border-2 border-white dark:border-slate-800 shadow-lg transition-all duration-1000"
                              style={{ left: `${result.soilSuitability}%` }}
                           ></div>
                        </div>
                        <div className="mt-2 text-center font-bold text-slate-700 dark:text-slate-300">
                          {result.soilSuitability}% Match
                        </div>
                      </div>
                   </div>

                   {/* Climate Forecasting & Risk Badge */}
                   <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-slate-100 dark:border-slate-700 transition-colors">
                       <h5 className="text-slate-700 dark:text-slate-200 font-bold mb-4 flex items-center gap-2">
                          <CloudRain size={18} className="text-blue-500" /> Climate Risk (90-Day)
                       </h5>
                       <div className="flex items-center justify-between mb-3">
                         <span className="text-sm text-slate-500 dark:text-slate-400">Predicted Risk:</span>
                         <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-white ${
                            result.climateRisk === 'Safe' ? 'bg-emerald-500' :
                            result.climateRisk === 'Moderate' ? 'bg-amber-500' : 'bg-red-500'
                         }`}>
                           {getClimateRiskLabel(result.climateRisk)}
                         </span>
                       </div>
                       <p className="text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                          {result.climateForecast}
                       </p>
                   </div>
                </div>

                {/* 4. Profit & Loss Bar Graph */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-slate-100 dark:border-slate-700 transition-colors">
                   <h5 className="text-slate-700 dark:text-slate-200 font-bold mb-6 flex items-center gap-2">
                     <BarChart3 size={18} className="text-blue-600 dark:text-blue-400" /> {t.calculator.resultProfit}
                   </h5>
                   <div className="flex items-end gap-12 h-40 px-8 pb-0 border-b border-slate-200 dark:border-slate-700">
                      
                      {/* Cost Bar */}
                      <div className="w-1/2 flex flex-col justify-end items-center gap-2 group h-full">
                         <div className="text-xs font-bold text-slate-500 dark:text-slate-400">₹{result.estimatedCost.toLocaleString('en-IN')}</div>
                         <div 
                            className="w-full bg-red-400 rounded-t-lg transition-all duration-1000 relative hover:bg-red-500 flex items-end justify-center pb-2" 
                            style={{ height: graphData.costHeight }}
                         >
                            <span className="text-white/90 text-xs font-bold tracking-wider">COST</span>
                         </div>
                      </div>

                      {/* Revenue Bar */}
                      <div className="w-1/2 flex flex-col justify-end items-center gap-2 h-full">
                         <div className={`text-xs font-bold ${graphData.totalRevenue < result.estimatedCost ? 'text-red-500' : 'text-emerald-600 dark:text-emerald-400'}`}>₹{graphData.totalRevenue.toLocaleString('en-IN')}</div>
                         <div 
                            className={`w-full rounded-t-lg transition-all duration-1000 relative flex items-end justify-center pb-2 ${graphData.totalRevenue < result.estimatedCost ? 'bg-amber-400 hover:bg-amber-500' : 'bg-emerald-500 hover:bg-emerald-600'}`} 
                            style={{ height: graphData.revenueHeight }}
                         >
                            <span className="text-white/90 text-xs font-bold tracking-wider">REVENUE</span>
                         </div>
                      </div>
                   </div>
                   
                   <div className="mt-4 flex justify-between text-sm">
                      <div className="text-slate-500 dark:text-slate-400">
                        Est. Net Profit: 
                        <span className={`font-bold ml-1 ${result.projectedProfit >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                          {result.projectedProfit >= 0 ? '+' : ''}₹{result.projectedProfit.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold"><TrendingIcon /> {result.marketTrend} Trend</div>
                   </div>
                </div>

                {/* 5. Alternatives & Explanation */}
                <div className="bg-slate-50 dark:bg-slate-700/30 p-6 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors">
                   <h5 className="text-slate-800 dark:text-slate-100 font-bold mb-3 flex items-center gap-2">
                      <ShieldCheck size={18} className="text-emerald-700 dark:text-emerald-400" /> AI Recommendation
                   </h5>
                   <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-4">
                      {result.explanation}
                   </p>
                   <div>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">{t.calculator.resultAlternatives}</span>
                      <div className="flex flex-wrap gap-2">
                        {result.alternatives.map((alt) => (
                          <span key={alt} className="px-3 py-1 bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs rounded-full font-medium shadow-sm transition-colors">
                            {alt}
                          </span>
                        ))}
                      </div>
                   </div>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* WORKFLOW MODAL */}
        <LoanWorkflow 
            isOpen={showWorkflow} 
            onClose={() => setShowWorkflow(false)} 
            amount={result ? result.maxLoanSuggestion : formData.loanAmount}
        />

      </div>
    </section>
  );
};

// Icons helpers
const CalculatorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600 dark:text-emerald-400"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>
)

const TrendingIcon = () => (
   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
)

export default Calculator;