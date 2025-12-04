import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { X, User, CreditCard, Sprout, LogOut, ShieldCheck, MapPin } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  if (!isOpen || !user) return null;

  const getMaskedID = () => {
    if (user.method === 'aadhaar') {
      // XXXX XXXX 1234
      const raw = user.identifier.replace(/\s/g, '');
      const last4 = raw.slice(-4);
      return `XXXX XXXX ${last4}`;
    } else {
      // XXXXXXX123
      const raw = user.identifier.replace(/\D/g, '');
      const last3 = raw.slice(-3);
      return `XXXXXXX${last3}`;
    }
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Card */}
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl shadow-2xl relative overflow-hidden animate-in zoom-in duration-300 border border-slate-200 dark:border-slate-700">
        
        {/* Header Background */}
        <div className="h-32 bg-gradient-to-r from-emerald-600 to-green-500 relative">
           <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 p-2 rounded-full">
             <X size={18} />
           </button>
        </div>

        {/* Profile Avatar */}
        <div className="relative px-6 pb-6">
           <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-2xl p-1 absolute -top-12 left-6 shadow-lg">
             <img 
               src={`https://ui-avatars.com/api/?name=${user.name}&background=10b981&color=fff&size=128`} 
               alt="Profile" 
               className="w-full h-full rounded-xl object-cover"
             />
           </div>

           <div className="ml-28 mt-2">
             <h2 className="text-xl font-bold text-slate-800 dark:text-white">{user.name}</h2>
             <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs mt-1">
               <MapPin size={12} /> {user.location}
             </div>
           </div>

           <div className="mt-8 space-y-4">
              
              {/* Identity Card */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2.5 rounded-lg text-blue-600 dark:text-blue-400">
                  <CreditCard size={20} />
                </div>
                <div>
                   <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">{t.profile.idCard}</p>
                   <p className="font-mono text-slate-700 dark:text-slate-200 font-bold text-lg">{getMaskedID()}</p>
                </div>
              </div>

              {/* Loan Status */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                <div className={`p-2.5 rounded-lg ${user.loanStatus === 'Active' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-slate-200 text-slate-500'}`}>
                  <ShieldCheck size={20} />
                </div>
                <div>
                   <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">{t.profile.loanStatus}</p>
                   {user.loanStatus === 'Active' ? (
                     <div>
                       <p className="font-bold text-slate-700 dark:text-slate-200">{t.profile.activeLoan}</p>
                       <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">₹{user.loanAmount?.toLocaleString()}</p>
                     </div>
                   ) : (
                     <p className="font-bold text-slate-700 dark:text-slate-200">{t.profile.noActiveLoan}</p>
                   )}
                </div>
              </div>

              {/* Recent Crop */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                <div className="bg-green-100 dark:bg-green-900/30 p-2.5 rounded-lg text-green-600 dark:text-green-400">
                  <Sprout size={20} />
                </div>
                <div>
                   <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">{t.profile.recentCrop}</p>
                   <p className="font-bold text-slate-700 dark:text-slate-200 text-lg">{user.crop}</p>
                </div>
              </div>

           </div>

           <button 
             onClick={handleLogout}
             className="w-full mt-8 flex items-center justify-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 py-3 rounded-xl font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
           >
             <LogOut size={18} /> {t.profile.logout}
           </button>

           <div className="text-center mt-4">
             <span className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
               <ShieldCheck size={10} className="text-green-500" /> {t.profile.securityBadge}
             </span>
           </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileModal;