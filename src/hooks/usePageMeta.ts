import { useEffect } from 'react';

const DEFAULT_TITLE = 'Chloe Eats DFW | Dallas-Fort Worth Food Explorer';
const DEFAULT_DESCRIPTION = 'Discover the best food spots in Dallas-Fort Worth with Chloe. Interactive food map, honest reviews, and recommendations for every craving.';
const OG_IMAGE = 'https://chloeeatsdfw.com/og-image.jpg';

function setMetaTag(property: string, content: string, isOg = false) {
  const attr = isOg ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Sets document.title, meta description, OG, and Twitter tags for the current page.
 * Resets to defaults on unmount.
 */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;

    // Meta description
    setMetaTag('description', description);

    // Open Graph
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:image', OG_IMAGE, true);
    setMetaTag('og:type', 'website', true);

    // Twitter Card
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', OG_IMAGE);

    return () => {
      document.title = DEFAULT_TITLE;
      setMetaTag('description', DEFAULT_DESCRIPTION);
      setMetaTag('og:title', DEFAULT_TITLE, true);
      setMetaTag('og:description', DEFAULT_DESCRIPTION, true);
      setMetaTag('twitter:title', DEFAULT_TITLE);
      setMetaTag('twitter:description', DEFAULT_DESCRIPTION);
    };
  }, [title, description]);
}
