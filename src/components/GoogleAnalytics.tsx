import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

/**
 * Loads Google Analytics and tracks page views on route changes.
 * Only loads if VITE_GA_MEASUREMENT_ID is set.
 */
export default function GoogleAnalytics() {
  const location = useLocation();

  // Load GA script once
  useEffect(() => {
    if (!GA_ID) return;
    if (document.querySelector(`script[src*="googletagmanager"]`)) return;

    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: unknown[]) {
      window.dataLayer!.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (!GA_ID || !window.gtag) return;
    window.gtag('config', GA_ID, { page_path: location.pathname });
  }, [location.pathname]);

  return null;
}
