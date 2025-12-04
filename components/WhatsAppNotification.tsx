import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNotification } from '../contexts/NotificationContext';

interface ActiveToast {
  id: number;
  text: string;
}

const WhatsAppNotification: React.FC = () => {
  const [activeToasts, setActiveToasts] = useState<ActiveToast[]>([]);
  const { t } = useLanguage();
  const { addNotification } = useNotification();

  // Helper to trigger a message
  const triggerMessage = (msg: string) => {
    const id = Date.now();
    // 1. Add to Global Inbox
    addNotification(msg);
    
    // 2. Show Floating Bubble
    setActiveToasts(prev => [...prev, { id, text: msg }]);

    // 3. Auto-remove Bubble after 3 seconds
    setTimeout(() => {
      setActiveToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000); // 3 seconds visible time
  };

  useEffect(() => {
    // Sequence of messages
    const timers = [
      setTimeout(() => triggerMessage(t.whatsapp.msg1), 2000),
      setTimeout(() => triggerMessage(t.whatsapp.msg2), 6000), // Spaced out slightly more
      setTimeout(() => triggerMessage(t.whatsapp.msg3), 10000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [t]);

  if (activeToasts.length === 0) return null;

  return (
    <div className="fixed bottom-24 right-6 flex flex-col items-end gap-3 z-40 pointer-events-none">
      {activeToasts.map((toast) => (
        <div 
          key={toast.id}
          className="bg-[#25D366] text-white px-4 py-3 rounded-l-2xl rounded-tr-2xl rounded-br-sm shadow-xl flex items-center gap-3 max-w-[300px] animate-in slide-in-from-bottom-5 fade-in duration-500 pointer-events-auto"
        >
          <div className="bg-white/20 p-1.5 rounded-full">
            <MessageCircle size={16} fill="white" />
          </div>
          <div className="text-sm font-medium leading-tight">
            {toast.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WhatsAppNotification;
