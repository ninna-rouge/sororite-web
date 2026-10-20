import { z } from 'astro/zod';

const slug = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'El slug usa minúsculas, números y guiones.');

export const cursoFaqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

/**
 * Esquema de la colección `cursos`.
 * `example: true` marca fichas de prueba. Un curso publicable usa `example: false`.
 */
export const cursoSchema = z.object({
  title: z.string().min(1),
  slug,
  modality: z.enum(['online', 'presencial']),
  priceDisplay: z.string().min(1),
  hotmartCheckoutUrl: z.url({ protocol: /^https$/ }),
  image: z.string().regex(/^\/[\w./-]+\.(?:svg|png|jpe?g|webp)$/),
  summary: z.string().min(1),
  faq: z.array(cursoFaqSchema).min(1),
  example: z.boolean(),
});

export type CursoData = z.infer<typeof cursoSchema>;
