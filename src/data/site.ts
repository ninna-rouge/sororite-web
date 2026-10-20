/**
 * Datos públicos del sitio. Cámbialos aquí cuando se confirmen.
 * Los IDs de analítica no viven en este archivo: van en variables de entorno.
 */
export const site = {
  name: 'Sororité',
  legalName: 'SORORITE INSUMOS EIRL',
  companyTaxId: '76.921.142-K',
  businessActivity: 'otros tipos de enseñanza',
  representative: 'Camila Sánchez Fernández',
  domain: 'https://sororite.cl',
  description:
    'Academia chilena de cosmética natural. Cursos en línea y presenciales para aprender a formular y emprender.',
  email: 'Camifsanchezf@gmail.com',
  phoneDisplay: '+56 9 5751 7130',
  phoneE164: '56957517130',
  whatsappMessage: 'Hola, quiero información sobre los cursos de Sororité.',
  location: 'Región Metropolitana, Chile',
  instagram: 'https://www.instagram.com/sororite.cl/',
  facebook: 'https://www.facebook.com/sororiteinsumos',
  logo: '/brand/logo-color.png',
  logoLight: '/brand/logo-blanco.png',
} as const;

export const whatsappHref = `https://wa.me/${site.phoneE164}?text=${encodeURIComponent(site.whatsappMessage)}`;

export const nav = [
  { href: '/', label: 'Inicio' },
  { href: '/quienes-somos', label: 'Quiénes somos' },
  { href: '/cursos', label: 'Cursos' },
  { href: '/galeria', label: 'Galería' },
  { href: '/contacto', label: 'Contacto' },
] as const;

export function isCurrent(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}
