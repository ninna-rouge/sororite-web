export const CONSENT_KEY = 'sororite-consent';

export type ConsentChoice = 'accepted' | 'rejected';

const GA_ID = /^G-[A-Z0-9]+$/;
const PIXEL_ID = /^[0-9]{5,20}$/;

type AnalyticsEnv = {
  PUBLIC_GA4_MEASUREMENT_ID?: string;
  PUBLIC_META_PIXEL_ID?: string;
};

type DataLayer = unknown[];

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    dataLayer?: DataLayer;
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

export function isValidGaId(value: string | undefined): value is string {
  return typeof value === 'string' && GA_ID.test(value);
}

export function isValidPixelId(value: string | undefined): value is string {
  return typeof value === 'string' && PIXEL_ID.test(value);
}

function readEnv(env: AnalyticsEnv | undefined): AnalyticsEnv {
  return env ?? {};
}

export function loadAnalytics(doc: Document = document, env?: AnalyticsEnv): void {
  const source = readEnv(env ?? import.meta.env);
  loadGa(doc, source.PUBLIC_GA4_MEASUREMENT_ID);
  loadPixel(doc, source.PUBLIC_META_PIXEL_ID);
}

function loadGa(doc: Document, id: string | undefined): void {
  if (!isValidGaId(id)) return;
  if (doc.querySelector(`script[data-sororite-analytics="ga"]`)) return;

  const view = doc.defaultView;
  if (!view) return;
  view.dataLayer = view.dataLayer ?? [];
  view.dataLayer.push(['js', new Date()]);
  view.dataLayer.push(['config', id]);

  const script = doc.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  script.dataset.sororiteAnalytics = 'ga';
  doc.head.appendChild(script);
}

function loadPixel(doc: Document, id: string | undefined): void {
  if (!isValidPixelId(id)) return;
  if (doc.querySelector(`script[data-sororite-analytics="meta"]`)) return;

  const view = doc.defaultView;
  if (!view) return;

  const fbq = function enqueue(...args: unknown[]) {
    const current = enqueue as Fbq;
    if (current.callMethod) current.callMethod(...args);
    else current.queue.push(args);
  } as Fbq;
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = '2.0';
  view.fbq = fbq;
  view._fbq = fbq;

  const script = doc.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  script.dataset.sororiteAnalytics = 'meta';
  doc.head.appendChild(script);
  fbq('init', id);
  fbq('track', 'PageView');
}
