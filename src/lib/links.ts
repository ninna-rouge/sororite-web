/** Añade `utm_content` sin perder el ancla. Las URLs de Hotmart aún no existen. */
export function withUtm(path: string, content: string): string {
  const hashAt = path.indexOf('#');
  const hash = hashAt >= 0 ? path.slice(hashAt) : '';
  const base = hashAt >= 0 ? path.slice(0, hashAt) : path;
  const joiner = base.includes('?') ? '&' : '?';
  return `${base}${joiner}utm_content=${encodeURIComponent(content)}${hash}`;
}
