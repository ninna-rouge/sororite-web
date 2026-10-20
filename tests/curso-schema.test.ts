import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { describe, expect, it } from 'vitest';
import { cursoSchema } from '../src/content/curso-schema';

const cursosDir = path.join(process.cwd(), 'src/content/cursos');

function readCursos() {
  return readdirSync(cursosDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const raw = readFileSync(path.join(cursosDir, file), 'utf8');
      const parsed = matter(raw);
      return { file, data: cursoSchema.parse(parsed.data) };
    });
}

describe('colección de cursos', () => {
  const cursos = readCursos();

  it('publica exactamente dos fichas de ejemplo', () => {
    expect(cursos).toHaveLength(2);
    expect(cursos.every((curso) => curso.data.example)).toBe(true);
  });

  it('hace coincidir el slug con el nombre del archivo', () => {
    for (const curso of cursos) {
      expect(`${curso.data.slug}.md`).toBe(curso.file);
      expect(curso.data.hotmartCheckoutUrl.startsWith('https://example.com/')).toBe(true);
    }
  });

  it('rechaza una modalidad desconocida y un checkout sin https', () => {
    const valid = cursos[0]?.data;
    expect(valid).toBeDefined();
    if (!valid) return;

    expect(() => cursoSchema.parse({ ...valid, modality: 'hibrido' })).toThrow();
    expect(() =>
      cursoSchema.parse({ ...valid, hotmartCheckoutUrl: 'http://example.com/pago' }),
    ).toThrow();
    expect(() => cursoSchema.parse({ ...valid, faq: [] })).toThrow();
  });
});
