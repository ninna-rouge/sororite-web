import { describe, expect, it } from 'vitest';
import { courses, packOffer } from '../src/data/catalog';
import { withUtm } from '../src/lib/links';

describe('catálogo de la landing', () => {
  it('publica los seis cursos sin precio ni checkout inventados', () => {
    expect(courses).toHaveLength(6);
    for (const course of courses) {
      expect(course.priceDisplay.startsWith('TODO')).toBe(true);
      expect(course.cta.length).toBeGreaterThan(0);
      expect(JSON.stringify(course)).not.toMatch(/hotmart\.com|example\.com/i);
    }
  });

  it('solo afirma el precio del pack que ya está en el copy', () => {
    expect(packOffer.price).toBe('$35.000 CLP');
    expect(packOffer.compareAt).toBe('$205.000 CLP');
    expect(packOffer.includes).toHaveLength(6);
  });
});

describe('utm', () => {
  it('agrega utm_content y conserva el ancla', () => {
    expect(withUtm('/#oferta', 'hero_pack')).toBe('/?utm_content=hero_pack#oferta');
    expect(withUtm('#todo-hotmart', 'card_velas')).toBe('?utm_content=card_velas#todo-hotmart');
  });
});
