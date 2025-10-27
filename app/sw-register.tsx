'use client';
import { useEffect } from 'react';

export default function SWRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
    
      const already = (window as any).__epr_sw_registered;
      if (already) return;
      (window as any).__epr_sw_registered = true;

      // prod only
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(console.error);
      });
    }
  }, []);

  return null;
}
