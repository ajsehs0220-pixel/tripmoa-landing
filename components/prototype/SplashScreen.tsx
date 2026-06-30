'use client';

import { useEffect, useState } from 'react';
import styles from './SplashScreen.module.css';

const SPLASH_DURATION_MS = 1000;
const FADE_DURATION_MS = 300;

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), SPLASH_DURATION_MS);
    const removeTimer = setTimeout(
      () => setShowSplash(false),
      SPLASH_DURATION_MS + FADE_DURATION_MS
    );
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      {children}
      {showSplash && (
        <div className={`${styles.splash} ${fadeOut ? styles.fadeOut : ''}`}>
          <div className={styles.wordmark}>
            <span className={styles.wordmarkTrip}>Trip</span>
            <span className={styles.wordmarkMoa}>MOA</span>
          </div>
        </div>
      )}
    </>
  );
}
