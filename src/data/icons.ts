/**
 * Íconos lineales de 24×24, trazo 1.5. Se insertan con `set:html={icon('leaf')}`.
 */
const paths = {
  compass: '<circle cx="12" cy="12" r="8.6"/><path d="M15.4 8.6 13.5 13.5 8.6 15.4 10.5 10.5z"/>',
  horizon:
    '<path d="M3 17h18M6.4 17a5.6 5.6 0 0 1 11.2 0M12 5.2v2M5.6 8.4l1.4 1.4M18.4 8.4 17 9.8M5.5 20.5h13"/>',
  heart: '<path d="M12 19.6s-7-4.3-7-9.7A4 4 0 0 1 12 7.3a4 4 0 0 1 7 2.6c0 5.4-7 9.7-7 9.7z"/>',
  flask:
    '<path d="M9 3h6M10 3v6.5L4.6 18.2A1.8 1.8 0 0 0 6.1 21h11.8a1.8 1.8 0 0 0 1.5-2.8L14 9.5V3"/><path d="M7.5 15h9"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z"/><path d="M2 21c0-3 1.9-5.4 5.1-6C9.5 14.5 12 13 13 12"/>',
  growth: '<path d="M3.5 17.5 9 12l4 4 7.5-7.5"/><path d="M14.5 8.5h6v6"/>',
  shield:
    '<path d="M12 3.2 19 6v5.6c0 4.4-3 7.9-7 9.2-4-1.3-7-4.8-7-9.2V6z"/><path d="M9 12.2 11.1 14.3 15.2 10.2"/>',
  badge: '<circle cx="12" cy="9" r="5"/><path d="M9.2 13.4 8 21l4-2.2 4 2.2-1.2-7.6"/>',
  pin: '<path d="M12 21s5.5-4.8 5.5-9.2a5.5 5.5 0 0 0-11 0C6.5 16.2 12 21 12 21z"/><circle cx="12" cy="11.6" r="1.6"/>',
  people:
    '<circle cx="9" cy="8.2" r="3"/><path d="M3.6 19a5.4 5.4 0 0 1 10.8 0"/><circle cx="17" cy="9.2" r="2.4"/><path d="M15.6 14.2A4.4 4.4 0 0 1 20.4 19"/>',
  mic: '<rect x="9" y="3.2" width="6" height="11" rx="3"/><path d="M5.6 11a6.4 6.4 0 0 0 12.8 0M12 17.4V21"/>',
  image:
    '<rect x="3.5" y="5" width="17" height="14" rx="2.2"/><circle cx="9" cy="10" r="1.6"/><path d="m20.5 16-5-5L6 19"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  play: '<path d="M9 7.2v9.6l8-4.8-8-4.8z"/>',
  book: '<path d="M5 5.5h5.5A2.5 2.5 0 0 1 13 8v11.2A2.5 2.5 0 0 0 10.5 16.7H5V5.5z"/><path d="M19 5.5h-5.5A2.5 2.5 0 0 0 11 8v11.2A2.5 2.5 0 0 1 13.5 16.7H19V5.5z"/>',
  drop: '<path d="M12 3.4s5.6 6 5.6 9.6a5.6 5.6 0 0 1-11.2 0C6.4 9.4 12 3.4 12 3.4z"/>',
  chat: '<path d="M6.2 16.2 4.2 20l4-1.1A7.6 7.6 0 1 0 6.2 16.2z"/>',
  doc: '<path d="M7 3.6h6.4l3.6 3.6V20.4H7V3.6z"/><path d="M13.4 3.6v3.6h3.6M9.4 12.4h5.2M9.4 15.8h5.2"/>',
  award: '<circle cx="12" cy="9" r="4.2"/><path d="M9.1 12.8 8.2 20 12 17.8 15.8 20l-.9-7.2"/>',
  spark: '<path d="M12 3.2 13.5 8.8 19 10.4 13.5 12 12 17.6 10.5 12 5 10.4 10.5 8.8 12 3.2z"/>',
  card: '<rect x="3.6" y="6" width="16.8" height="12" rx="2"/><path d="M3.6 10h16.8"/>',
  star: '<path d="M12 3.6 14 8.4l5.2.5-3.9 3.3 1.2 4.9L12 14.6 7.5 17.1l1.2-4.9L4.8 8.9 10 8.4 12 3.6z"/>',
  check: '<circle cx="12" cy="12" r="7.4"/><path d="M8.6 12.2 11 14.6 15.4 9.8"/>',
  rows: '<path d="M9 7h11M9 12h11M9 17h11"/><circle cx="5" cy="7" r="0.8" fill="currentColor" stroke="none"/><circle cx="5" cy="12" r="0.8" fill="currentColor" stroke="none"/><circle cx="5" cy="17" r="0.8" fill="currentColor" stroke="none"/>',
  back: '<path d="M14.5 6.5 9 12l5.5 5.5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  ig: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  fb: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  steth:
    '<path d="M5 3v5a5 5 0 0 0 10 0V3"/><path d="M10 13v2a5 5 0 0 0 10 0v-1"/><circle cx="20" cy="12" r="2"/>',
} as const;

export type IconName = keyof typeof paths;

/** Tonos del sistema; cada uno tiene su clase `tono-*` en `styles/kit/tonos.css`. */
export type Tone = 'coral' | 'hoja' | 'durazno' | 'calipso';

export function icon(name: IconName, size = 18) {
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name]}</svg>`;
}
