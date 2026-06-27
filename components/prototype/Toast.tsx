'use client';

import { useEffect, useState, useCallback, useRef, createContext, useContext } from 'react';
import styles from './Toast.module.css';

type ToastContextType = {
  showToast: (message?: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

const DEFAULT_MESSAGE = '준비 중인 기능이에요';

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string = DEFAULT_MESSAGE) => {
    setMessage(msg);
    setVisible(true);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setVisible(false), 1800);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className={`${styles.toast} ${visible ? styles.toastVisible : ''}`} role="status" aria-live="polite">
        {message}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast는 ToastProvider 내부에서만 사용할 수 있어요.');
  }
  return ctx;
}
