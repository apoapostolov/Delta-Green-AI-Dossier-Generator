import React, { useEffect, useState } from 'react';
import type { ToastType } from '../types';

interface ToastProps {
  message: string | null;
  type: ToastType;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onDismiss }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        // Allow time for fade-out animation before clearing the message
        setTimeout(onDismiss, 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onDismiss]);

  const toastStyles: Record<ToastType, string> = {
    error: 'bg-red-800 border-red-600',
    success: 'bg-green-800 border-green-600',
    warning: 'bg-yellow-700 border-yellow-500',
  };

  if (!message) {
    return null;
  }

  return (
    <div
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-[100] text-white px-6 py-3 rounded-lg shadow-xl transition-all duration-300 ${toastStyles[type] || toastStyles.error} ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
      }`}
      role="alert"
    >
      <p>{message}</p>
    </div>
  );
};
