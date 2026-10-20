import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { cursoSchema } from './content/curso-schema';

const cursos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cursos' }),
  schema: cursoSchema,
});

export const collections = { cursos };
