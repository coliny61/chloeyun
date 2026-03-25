// Custom event tracking helpers for Google Analytics

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(action: string, category: string, label?: string) {
  if (!window.gtag) return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
  });
}
