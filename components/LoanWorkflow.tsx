import React, { useState, useRef, useEffect } from 'react';
import { Video, Mic, PenTool, CheckCircle, Store, Landmark, ShoppingBag, ShieldCheck, Download, Smartphone, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LoanWorkflowProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
}

const LoanWorkflow: React.FC<LoanWorkflowProps> = ({ isOpen, onClose, amount }) => {
  const [step, setStep] = useState(1);
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signature, setSignature] = useState(false);

  // Reset on open
  useEffect(() => {
    if (isOpen) setStep(1);
  }, [isOpen]);

  // Canvas Logic for Signature
  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.stroke();
    setSignature(true);
  };

  const stopDrawing = () => setIsDrawing(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-emerald-500/30 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
              {step > 5 ? 5 : step}
            </span>
            <h3 className="font-bold text-slate-800 dark:text-white">
              {step <= 3 ? t.workflow.kycTitle : step === 4 ? t.workflow.shopTitle : step === 5 ? "Insurance" : "AutoPay"}
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-red-500"><X /></button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* STEP 1: VIDEO KYC */}
          {step === 1 && (
            <div className="text-center">
              <div className="bg-slate-900 rounded-xl h-48 mb-4 relative overflow-hidden flex items-center justify-center border-2 border-emerald-500/50">
                <Video className="text-slate-600 w-16 h-16 animate-pulse" />
                <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded animate-pulse">REC</div>
                <div className="absolute bottom-2 inset-x-2 text-white text-xs bg-black/50 p-1 rounded">
                  Face Detected: 99% Match
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 font-medium mb-6">{t.workflow.kycStep1}</p>
              <button 
                onClick={() => setStep(2)} 
                className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition-all"
              >
                Start Camera
              </button>
            </div>
          )}

          {/* STEP 2: VOICE CONFIRMATION */}
          {step === 2 && (
            <div className="text-center">
              <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
                <Mic size={40} className="text-emerald-600" />
              </div>
              <h4 className="text-xl font-bold mb-2">"{t.workflow.kycStep2}"</h4>
              <p className="text-sm text-slate-500 mb-8">Reading audio spectrum...</p>
              <button 
                onClick={() => setStep(3)} 
                className="w-full bg-slate-900 dark:bg-slate-700 text-white py-3 rounded-lg font-bold"
              >
                Skip (Demo)
              </button>
            </div>
          )}

          {/* STEP 3: E-SIGNATURE */}
          {step === 3 && (
            <div>
              <p className="mb-2 font-semibold text-slate-700 dark:text-slate-300">{t.workflow.kycStep3}:</p>
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl bg-white touch-none">
                <canvas 
                  ref={canvasRef}
                  width={400} 
                  height={200}
                  className="w-full h-40 cursor-crosshair rounded-xl"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
              </div>
              <p className="text-xs text-slate-400 mt-2 text-right">Draw with finger or mouse</p>
              <button 
                onClick={() => setStep(4)} 
                disabled={!signature}
                className={`w-full mt-6 py-3 rounded-lg font-bold transition-all ${signature ? 'bg-emerald-600 text-white shadow-lg hover:scale-105' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
              >
                Sign Agreement
              </button>
            </div>
          )}

          {/* STEP 4: SHOP TRANSFER */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg flex items-center gap-3 mb-4">
                <CheckCircle className="text-green-600" />
                <span className="font-bold text-green-800">{t.workflow.kycSuccess}</span>
              </div>
              
              <h4 className="font-bold mb-2">{t.workflow.shopTitle}</h4>
              
              <button onClick={() => setStep(4.5)} className="w-full p-4 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-all group">
                <div className="flex items-center gap-3">
                   <div className="bg-orange-100 p-2 rounded-lg text-orange-600"><ShoppingBag /></div>
                   <div className="text-left">
                     <div className="font-bold text-slate-800 dark:text-white">{t.workflow.shopOption1}</div>
                     <div className="text-xs text-slate-500">Sharma Seeds • 1.2km</div>
                   </div>
                </div>
                <div className="w-4 h-4 rounded-full border-2 border-slate-300 group-hover:border-emerald-500"></div>
              </button>

              <button className="w-full p-4 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between hover:border-emerald-500 transition-all opacity-60">
                 <div className="flex items-center gap-3">
                   <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Store /></div>
                   <div>{t.workflow.shopOption2}</div>
                 </div>
              </button>

              <button className="w-full p-4 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between hover:border-emerald-500 transition-all opacity-60">
                 <div className="flex items-center gap-3">
                   <div className="bg-purple-100 p-2 rounded-lg text-purple-600"><Landmark /></div>
                   <div>{t.workflow.shopOption3}</div>
                 </div>
              </button>
            </div>
          )}

           {/* STEP 4.5: SUCCESS SHOP TRANSFER */}
           {step === 4.5 && (
            <div className="text-center py-10 animate-in zoom-in">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={40} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Transfer Successful!</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-8">{t.workflow.shopSuccess}</p>
              <button onClick={() => setStep(5)} className="bg-slate-900 text-white px-6 py-2 rounded-full text-sm">Next: Insurance</button>
            </div>
          )}

          {/* STEP 5: ONE TAP INSURANCE */}
          {step === 5 && (
            <div className="text-center">
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 p-6 rounded-2xl mb-6">
                <ShieldCheck size={48} className="text-amber-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-amber-900 dark:text-amber-400 mb-2">PMFBY Crop Protection</h3>
                <p className="text-sm text-amber-800 dark:text-amber-300 mb-4">Protect your {amount.toLocaleString()} INR loan against flood & drought.</p>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">₹187 <span className="text-sm font-normal text-slate-500">/ year</span></div>
              </div>
              
              <button 
                onClick={() => setStep(5.5)} 
                className="w-full bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-amber-500/30 transform transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                {t.workflow.insuranceBtn}
              </button>
            </div>
          )}

           {/* STEP 5.5: INSURANCE SUCCESS */}
           {step === 5.5 && (
             <div className="text-center py-8">
                <h3 className="text-green-600 font-bold text-xl mb-4">{t.workflow.insuranceSuccess}</h3>
                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg flex items-center justify-between mb-8 border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 p-2 rounded text-red-600"><Download size={20} /></div>
                    <div className="text-left">
                      <div className="font-bold text-sm">Policy_2025.pdf</div>
                      <div className="text-xs text-slate-500">1.2 MB</div>
                    </div>
                  </div>
                  <button className="text-blue-600 text-sm font-bold">Download</button>
                </div>
                <button onClick={() => setStep(6)} className="text-slate-500 underline text-sm">Skip to AutoPay</button>
             </div>
           )}

           {/* STEP 6: UPI AUTOPAY */}
           {step === 6 && (
             <div className="text-center pt-4">
               <div className="bg-[#5f259f] p-6 rounded-2xl text-white mb-6 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                 <h3 className="font-bold text-lg mb-4 flex items-center justify-center gap-2"><Smartphone /> PhonePe / UPI</h3>
                 <div className="text-4xl font-bold mb-2">₹8,200</div>
                 <div className="text-sm opacity-80">Auto-debit on 5th of every month</div>
               </div>
               <button 
                 onClick={() => setStep(6.5)}
                 className="w-full bg-[#5f259f] hover:opacity-90 text-white py-4 rounded-xl font-bold shadow-xl flex items-center justify-center gap-2"
               >
                 {t.workflow.upiBtn}
               </button>
             </div>
           )}

           {/* STEP 6.5: FINAL SUCCESS */}
           {step === 6.5 && (
             <div className="flex flex-col items-center justify-center h-full py-10">
               <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 animate-bounce shadow-lg shadow-green-500/50">
                 <CheckCircle size={48} className="text-white" />
               </div>
               <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">{t.workflow.upiSuccess}</h2>
               <p className="text-slate-500 text-center mb-8">Your financial future is secure.</p>
               <button onClick={onClose} className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold">Done</button>
             </div>
           )}

        </div>
      </div>
    </div>
  );
};

export default LoanWorkflow;