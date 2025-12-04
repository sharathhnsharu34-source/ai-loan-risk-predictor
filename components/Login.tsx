
import React, { useState, useEffect, useRef } from 'react';
import { Smartphone, CreditCard, ArrowRight, Mic, CheckCircle, RefreshCw, ChevronLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const { login } = useAuth();
  const [step, setStep] = useState<'select' | 'input' | 'otp' | 'success'>('select');
  const [method, setMethod] = useState<'mobile' | 'aadhaar'>('mobile');
  const [inputValue, setInputValue] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [lang, setLang] = useState<'HI' | 'EN'>('HI');
  const [isListening, setIsListening] = useState(false);
  
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Translations
  const t = {
    HI: {
      welcome: "नमस्ते किसान भाई 👋",
      select: "लॉगिन का तरीका चुनें",
      aadhaar: "आधार नंबर से",
      mobile: "मोबाइल नंबर से",
      enterAadhaar: "अपना आधार नंबर दर्ज करें",
      enterMobile: "अपना मोबाइल नंबर दर्ज करें",
      sendOtp: "OTP भेजें",
      otpSent: "OTP भेजा गया",
      verify: "सत्यापित करें",
      resend: "पुनः भेजें",
      success: "लॉगिन सफल!",
      redirect: "डैशबोर्ड पर जा रहे हैं..."
    },
    EN: {
      welcome: "Welcome Farmer 👋",
      select: "Choose Login Method",
      aadhaar: "Via Aadhaar Card",
      mobile: "Via Mobile Number",
      enterAadhaar: "Enter Aadhaar Number",
      enterMobile: "Enter Mobile Number",
      sendOtp: "Send OTP",
      otpSent: "OTP Sent to",
      verify: "Verify",
      resend: "Resend OTP",
      success: "Login Successful!",
      redirect: "Redirecting to Dashboard..."
    }
  };

  const copy = t[lang];

  // Timer Logic
  useEffect(() => {
    let interval: any;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Input Formatting
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, ''); // Remove non-digits
    
    if (method === 'aadhaar') {
      if (val.length > 12) val = val.slice(0, 12);
      // Format: 0000 0000 0000
      val = val.replace(/(\d{4})(?=\d)/g, '$1 ');
    } else {
      if (val.length > 10) val = val.slice(0, 10);
    }
    setInputValue(val);
  };

  // OTP Logic
  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }

    // Auto verify if full
    if (newOtp.every(d => d !== '') && index === 5) {
      setTimeout(() => verifyOtp(newOtp.join('')), 300);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
    const newOtp = [...otp];
    pastedData.forEach((char, index) => {
      if (index < 6 && !isNaN(Number(char))) newOtp[index] = char;
    });
    setOtp(newOtp);
    if (pastedData.length === 6) {
       otpRefs.current[5]?.focus();
       setTimeout(() => verifyOtp(newOtp.join('')), 300);
    }
  };

  // Actions
  const sendOtp = () => {
    if (method === 'mobile' && inputValue.length < 10) return;
    if (method === 'aadhaar' && inputValue.replace(/\s/g, '').length < 12) return;
    
    setStep('otp');
    setTimer(60);
    console.log("DEMO OTP: 123456"); // Hint for developer
  };

  const verifyOtp = (code: string) => {
    if (code === '123456') {
      setStep('success');
      // playSound('success');
      setTimeout(() => {
        login(method, inputValue);
      }, 2500);
    } else {
      // Shake effect or error state could go here
      alert("Invalid OTP (Use 123456)");
      setOtp(['', '', '', '', '', '']);
      otpRefs.current[0]?.focus();
    }
  };

  // Voice Input (Simulated/Basic)
  const startVoice = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = lang === 'HI' ? 'hi-IN' : 'en-IN';
      setIsListening(true);
      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript.replace(/\D/g, '');
        setInputValue(text);
        setIsListening(false);
      };
      recognition.start();
    } else {
      alert("Voice input not supported in this browser");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-emerald-600 to-orange-400 flex items-center justify-center p-4">
      {/* Background Pattern - SVG Data URI for reliability */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Confetti (CSS-only approximation for success) */}
      {step === 'success' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
             <div key={i} className="absolute w-3 h-3 bg-white rounded-full animate-ping" style={{ 
               top: `${Math.random() * 100}%`, 
               left: `${Math.random() * 100}%`, 
               animationDuration: `${0.5 + Math.random()}s`,
               animationDelay: `${Math.random()}s`
             }}></div>
          ))}
        </div>
      )}

      {/* Main Card */}
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative min-h-[500px] flex flex-col">
        
        {/* Header Section */}
        <div className="bg-emerald-50 p-6 text-center relative">
            <div className="flex justify-between items-center absolute top-4 left-4 right-4">
                {step !== 'select' && step !== 'success' && (
                    <button onClick={() => setStep('select')} className="text-slate-500 hover:text-slate-800"><ChevronLeft /></button>
                )}
                <div className="flex-1"></div>
                <button 
                  onClick={() => setLang(lang === 'HI' ? 'EN' : 'HI')}
                  className="bg-white px-3 py-1 rounded-full text-xs font-bold text-emerald-700 shadow-sm border border-emerald-100"
                >
                  {lang === 'HI' ? 'English' : 'हिंदी'}
                </button>
            </div>
            
            <div className="mt-6 mb-2">
                <div className="w-16 h-16 bg-white rounded-2xl mx-auto shadow-lg flex items-center justify-center mb-4">
                    <img src="https://cdn-icons-png.flaticon.com/512/2916/2916115.png" alt="Logo" className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">{copy.welcome}</h2>
                <p className="text-slate-500 text-sm mt-1">Loan4Farm India</p>
            </div>
        </div>

        {/* Content Body */}
        <div className="p-8 flex-1 flex flex-col justify-center">
            
            {/* STEP 1: SELECT METHOD */}
            {step === 'select' && (
                <div className="space-y-4 animate-in slide-in-from-right duration-300">
                    <p className="text-center text-slate-500 mb-6 font-medium">{copy.select}</p>
                    
                    <button 
                      onClick={() => { setMethod('aadhaar'); setStep('input'); setInputValue(''); }}
                      className="w-full bg-white border-2 border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 p-4 rounded-xl flex items-center gap-4 transition-all group shadow-sm"
                    >
                        <div className="bg-blue-100 p-3 rounded-lg text-blue-600 group-hover:scale-110 transition-transform">
                            <CreditCard size={24} />
                        </div>
                        <div className="text-left">
                            <div className="font-bold text-slate-800">{copy.aadhaar}</div>
                            <div className="text-xs text-slate-400">UIDAI Verified</div>
                        </div>
                        <ArrowRight className="ml-auto text-slate-300 group-hover:text-emerald-500" />
                    </button>

                    <button 
                      onClick={() => { setMethod('mobile'); setStep('input'); setInputValue(''); }}
                      className="w-full bg-white border-2 border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 p-4 rounded-xl flex items-center gap-4 transition-all group shadow-sm"
                    >
                        <div className="bg-orange-100 p-3 rounded-lg text-orange-600 group-hover:scale-110 transition-transform">
                            <Smartphone size={24} />
                        </div>
                        <div className="text-left">
                            <div className="font-bold text-slate-800">{copy.mobile}</div>
                            <div className="text-xs text-slate-400">Fast & Secure</div>
                        </div>
                        <ArrowRight className="ml-auto text-slate-300 group-hover:text-emerald-500" />
                    </button>
                </div>
            )}

            {/* STEP 2: INPUT */}
            {step === 'input' && (
                <div className="animate-in slide-in-from-right duration-300">
                    <label className="block text-sm font-bold text-slate-700 mb-2 pl-1">
                        {method === 'aadhaar' ? copy.enterAadhaar : copy.enterMobile}
                    </label>
                    <div className="relative">
                        <input 
                            type={method === 'mobile' ? 'tel' : 'text'}
                            value={inputValue}
                            onChange={handleInput}
                            placeholder={method === 'aadhaar' ? '0000 0000 0000' : '98765 43210'}
                            className="w-full text-2xl font-bold p-4 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none tracking-widest text-slate-800"
                            autoFocus
                        />
                        <button 
                          onClick={startVoice}
                          className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full ${isListening ? 'bg-red-100 text-red-500 animate-pulse' : 'text-slate-400 hover:bg-slate-100'}`}
                        >
                            <Mic />
                        </button>
                    </div>

                    <div className="mt-8">
                        <button 
                            onClick={sendOtp}
                            disabled={(method === 'mobile' && inputValue.length < 10) || (method === 'aadhaar' && inputValue.length < 14)}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2"
                        >
                            {copy.sendOtp} <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            )}

            {/* STEP 3: OTP */}
            {step === 'otp' && (
                <div className="animate-in slide-in-from-right duration-300 text-center">
                    <div className="mb-6">
                        <p className="text-slate-500">{copy.otpSent}</p>
                        <p className="font-bold text-lg text-slate-800">
                            {method === 'mobile' ? `+91 ${inputValue}` : `Aadhaar ending in ${inputValue.slice(-4)}`}
                        </p>
                    </div>

                    <div className="flex justify-between gap-2 mb-8" onPaste={handlePaste}>
                        {otp.map((digit, idx) => (
                            <input
                                key={idx}
                                ref={el => otpRefs.current[idx] = el}
                                type="tel"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(idx, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(idx, e)}
                                className="w-12 h-14 border-2 border-slate-200 rounded-lg text-center text-2xl font-bold focus:border-emerald-500 focus:outline-none focus:bg-emerald-50 caret-emerald-600 transition-colors"
                            />
                        ))}
                    </div>

                    <div className="flex justify-between items-center text-sm font-medium">
                        {timer > 0 ? (
                            <span className="text-slate-400">Wait {timer}s</span>
                        ) : (
                            <button onClick={() => setTimer(60)} className="text-emerald-600 flex items-center gap-1 hover:underline">
                                <RefreshCw size={14} /> {copy.resend}
                            </button>
                        )}
                        <button 
                            onClick={() => verifyOtp(otp.join(''))}
                            className="text-emerald-600 hover:underline"
                        >
                            {copy.verify}
                        </button>
                    </div>

                    {/* Hint for demo */}
                    <div className="mt-8 text-xs text-slate-300">Demo OTP: 123456</div>
                </div>
            )}

            {/* STEP 4: SUCCESS */}
            {step === 'success' && (
                <div className="flex flex-col items-center justify-center h-full animate-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-xl shadow-green-200 mb-6">
                        <CheckCircle size={50} className="text-white animate-bounce" />
                    </div>
                    <h2 className="text-3xl font-bold text-emerald-800 mb-2">{copy.success}</h2>
                    <p className="text-slate-500 animate-pulse">{copy.redirect}</p>
                </div>
            )}

        </div>

        {/* Footer */}
        <div className="p-4 text-center bg-slate-50 border-t border-slate-100">
            <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span> 100% Secure & Encrypted
            </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
