import { describe, expect, it } from 'vitest';
import { isValidGaId, isValidPixelId, loadAnalytics } from '../src/lib/analytics';

class FakeScript {
  async = false;
  src = '';
  dataset: Record<string, string> = {};
}

function fakeDocument() {
  const scripts: FakeScript[] = [];
  const view = {
    dataLayer: undefined as unknown[] | undefined,
    fbq: undefined,
    _fbq: undefined,
  };
  const doc = {
    head: {
      appendChild(node: FakeScript) {
        scripts.push(node);
      },
    },
    createElement() {
      return new FakeScript();
    },
    querySelector(selector: string) {
      const match = /data-sororite-analytics="([^"]+)"/.exec(selector);
      if (!match) return null;
      return scripts.find((script) => script.dataset.sororiteAnalytics === match[1]) ?? null;
    },
    defaultView: view,
  };
  return { doc: doc as unknown as Document, scripts, view };
}

describe('analítica', () => {
  it('solo acepta identificadores con la forma esperada', () => {
    expect(isValidGaId('G-ABC123')).toBe(true);
    expect(isValidGaId('UA-123')).toBe(false);
    expect(isValidGaId(undefined)).toBe(false);
    expect(isValidPixelId('123456')).toBe(true);
    expect(isValidPixelId('G-ABC')).toBe(false);
  });

  it('no inyecta scripts si los identificadores están vacíos o son inválidos', () => {
    const { doc, scripts } = fakeDocument();
    loadAnalytics(doc, { PUBLIC_GA4_MEASUREMENT_ID: '', PUBLIC_META_PIXEL_ID: 'nope' });
    expect(scripts).toHaveLength(0);
  });

  it('inyecta Google y Meta una sola vez cuando los identificadores son válidos', () => {
    const { doc, scripts, view } = fakeDocument();
    const env = { PUBLIC_GA4_MEASUREMENT_ID: 'G-TEST123', PUBLIC_META_PIXEL_ID: '1234567890' };
    loadAnalytics(doc, env);
    loadAnalytics(doc, env);
    expect(scripts.map((script) => script.dataset.sororiteAnalytics).sort()).toEqual([
      'ga',
      'meta',
    ]);
    expect(view.dataLayer).toEqual([
      ['js', expect.any(Date)],
      ['config', 'G-TEST123'],
    ]);
    expect(scripts.find((script) => script.dataset.sororiteAnalytics === 'ga')?.src).toContain(
      'googletagmanager.com',
    );
  });
});
