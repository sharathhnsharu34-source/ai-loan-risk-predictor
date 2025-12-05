
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { X, LogOut, ShieldCheck, MapPin, Smartphone, CreditCard, Sprout, Wallet, CheckCircle } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  if (!isOpen || !user) return null;

  // Formatting helpers
  const formatAadhaar = (num: string) => {
    const clean = num.replace(/\s/g, '');
    const last4 = clean.slice(-4);
    return `XXXX XXXX ${last4}`;
  };

  const formatMobile = (num: string) => {
    const clean = num.replace(/\D/g, '');
    const last3 = clean.slice(-3);
    return `+91 XXXXX XX${last3}`;
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      {/* Modal Card */}
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-200 dark:border-slate-700 flex flex-col max-h-[90vh]">
        
        {/* Decorative Header */}
        <div className="h-32 bg-emerald-600 relative overflow-hidden">
           {/* Abstract Pattern Overlay */}
           <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`
           }}></div>
           <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
           
           <button 
             onClick={onClose} 
             className="absolute top-4 right-4 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md p-2 rounded-full transition-all"
           >
             <X size={20} />
           </button>
        </div>

        {/* User Identity Section */}
        <div className="px-6 pb-6 -mt-12 flex flex-col items-center text-center relative z-10">
           <div className="relative">
             <div className="w-24 h-24 rounded-full border-4 border-white dark:border-slate-900 shadow-lg overflow-hidden bg-white">
               <img 
                 src={`https://ui-avatars.com/api/?name=${user.name}&background=10b981&color=fff&size=128&bold=true`} 
                 alt="Profile" 
                 className="w-full h-full object-cover"
               />
             </div>
             <div className="absolute bottom-1 right-1 bg-blue-500 text-white p-1 rounded-full border-2 border-white dark:border-slate-900 shadow-sm" title="Verified User">
               <CheckCircle size={14} strokeWidth={3} />
             </div>
           </div>

           <h2 className="text-2xl font-bold text-slate-800 dark:text-white mt-3">{user.name}</h2>
           <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-sm font-medium">
             <MapPin size={14} className="text-emerald-500" /> {user.location}
           </div>

           {/* Quick Stats Row */}
           <div className="grid grid-cols-2 gap-4 w-full mt-6">
              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 border border-slate-100 dark:border-slate-700">
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">CIBIL Score</div>
                <div className="text-lg font-bold text-slate-800 dark:text-emerald-400 flex items-center justify-center gap-1">
                  782 <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold">GOLD</span>
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 border border-slate-100 dark:border-slate-700">
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Loan Limit</div>
                <div className="text-lg font-bold text-slate-800 dark:text-emerald-400">
                  ₹1.5 Lakh
                </div>
              </div>
           </div>
        </div>

        {/* Scrollable Details */}
        <div className="px-6 pb-6 overflow-y-auto">
          
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
            Account Details
          </h3>

          <div className="grid grid-cols-1 gap-3">
             {/* Mobile & Aadhaar Row */}
             <div className="flex gap-3">
                <div className="flex-1 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-400 transition-colors group bg-white dark:bg-slate-800">
                   <div className="flex items-center gap-2 mb-1">
                      <Smartphone size={16} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
                      <span className="text-[10px] text-slate-400 font-bold uppercase">{t.profile.mobile}</span>
                   </div>
                   <div className="font-mono font-semibold text-slate-700 dark:text-slate-200 text-sm">{formatMobile(user.mobile)}</div>
                </div>

                <div className="flex-1 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-400 transition-colors group bg-white dark:bg-slate-800">
                   <div className="flex items-center gap-2 mb-1">
                      <CreditCard size={16} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
                      <span className="text-[10px] text-slate-400 font-bold uppercase">{t.profile.aadhaar}</span>
                   </div>
                   <div className="font-mono font-semibold text-slate-700 dark:text-slate-200 text-sm">{formatAadhaar(user.aadhaar)}</div>
                </div>
             </div>

             {/* Active Crop */}
             <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between bg-white dark:bg-slate-800">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <Sprout size={20} />
                   </div>
                   <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">{t.profile.recentCrop}</div>
                      <div className="font-bold text-slate-800 dark:text-white">{user.crop}</div>
                   </div>
                </div>
                <div className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded">Rabi Season</div>
             </div>

             {/* Loan Status */}
             <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between bg-white dark:bg-slate-800">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <Wallet size={20} />
                   </div>
                   <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">{t.profile.loanStatus}</div>
                      <div className="font-bold text-slate-800 dark:text-white">
                        {user.loanStatus === 'Active' ? `₹${user.loanAmount?.toLocaleString()}` : t.profile.noActiveLoan}
                      </div>
                   </div>
                </div>
                {user.loanStatus === 'Active' ? (
                   <span className="flex items-center gap-1 text-xs font-bold text-white bg-emerald-500 px-2.5 py-1 rounded-full shadow-sm">
                      Active
                   </span>
                ) : (
                   <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">Inactive</span>
                )}
             </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
           <button 
             onClick={handleLogout}
             className="w-full flex items-center justify-center gap-2 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 font-semibold py-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 transition-all text-sm group"
           >
             <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
             {t.profile.logout}
           </button>
           <div className="mt-3 flex items-center justify-center gap-1 text-[10px] text-slate-400">
              <ShieldCheck size={12} className="text-emerald-500" />
              <span>{t.profile.securityBadge} • Encrypted End-to-End</span>
           </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileModal;
    