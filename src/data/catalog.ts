/**
 * Catálogo real de la landing. Los precios individuales y las URLs de Hotmart
 * no están confirmados: no se inventan.
 */
export interface CatalogCourse {
  id: string;
  name: string;
  lede: string;
  audience: string;
  includes: readonly string[];
  priceDisplay: string;
  cta: string;
  utm: string;
}

export const packOffer = {
  eyebrow: 'PACK COMPLETO',
  title: 'Los 6 cursos completos por $35.000, por tiempo limitado.',
  lede: 'Por separado suman $205.000. Con el pack ahorras $170.000 y tienes toda la formación en un solo lugar.',
  compareAt: '$205.000 CLP',
  price: '$35.000 CLP',
  priceNote: 'Pago único por Hotmart. Precio especial por tiempo limitado.',
  cta: 'Quiero los 6 cursos',
  micro: 'Pago seguro con Hotmart · Acceso automático a tu correo · Garantía de 7 días',
  includes: [
    'Velas y Aromatizadores',
    'Cosmética Natural Online',
    'Todo Jabones Online',
    'Mini curso Velas Tipo Postre',
    'Resolución Sanitaria',
    'Técnicas de Venta para Emprendedores',
  ],
  receives: [
    'Videos paso a paso: clases grabadas para ver cuando quieras.',
    'Manual teórico en PDF: la base científica explicada simple.',
    'Fórmulas probadas: listas para aplicar.',
    'Acceso sin fecha de vencimiento. TODO: confirmar que en Hotmart queda configurado como acceso permanente.',
  ],
} as const;

export const courses: readonly CatalogCourse[] = [
  {
    id: 'velas',
    name: 'Velas y Aromatizadores',
    lede: 'Velas y aromas naturales para tu hogar o tu emprendimiento.',
    audience: 'Quieres un producto atractivo para empezar a vender o regalar.',
    includes: [
      '12 fórmulas paso a paso con video',
      'Velas de soya, parafina y para masaje',
      'Home spray, wax sachet, wax melt y difusor',
      'Selección de fragancias y aceites esenciales',
      'Lista de proveedores validados en Chile',
    ],
    priceDisplay: 'TODO: precio individual',
    cta: 'Comprar Velas y Aromatizadores',
    utm: 'card_velas',
  },
  {
    id: 'cosmetica',
    name: 'Cosmética Natural Online',
    lede: 'Más de 20 productos con base científica, desde cero.',
    audience: 'Quieres formular tu propia línea de cosmética natural.',
    includes: [
      'Más de 20 formulaciones con video',
      'Jabones, cremas faciales y corporales',
      'Sérums, tónicos, agua micelar y desodorantes',
      'Maquillaje natural',
      'pH, estabilidad y conservantes seguros',
      'Consultas por WhatsApp con Camila. TODO: duración.',
    ],
    priceDisplay: 'TODO: precio individual',
    cta: 'Comprar Cosmética Natural',
    utm: 'card_cosmetica',
  },
  {
    id: 'jabones',
    name: 'Todo Jabones Online',
    lede: 'Más de 38 fórmulas de jabón desde la ciencia, no desde la moda.',
    audience: 'Quieres partir por jabones o ampliar tu línea.',
    includes: [
      '38 fórmulas probadas',
      'Jabones hidratantes, calmantes y detox',
      'Exfoliantes, antioxidantes y energizantes',
      'Glicerina, extractos botánicos, arcillas y carbón activado',
      'Pigmentos biodegradables',
      'Legislación cosmética chilena',
    ],
    priceDisplay: 'TODO: precio individual',
    cta: 'Comprar Todo Jabones',
    utm: 'card_jabones',
  },
  {
    id: 'postre',
    name: 'Mini curso: Velas Tipo Postre',
    lede: 'Velas decorativas que parecen postres.',
    audience: 'Buscas un producto llamativo para ferias, redes o regalos.',
    includes: [
      'Técnica de crema para velas decorativas',
      'Velas tipo cupcake, tarta y postre',
      'Colorantes, fragancias y acabados',
    ],
    priceDisplay: 'TODO: precio individual',
    cta: 'Comprar Velas Tipo Postre',
    utm: 'card_postre',
  },
  {
    id: 'resolucion',
    name: 'Resolución Sanitaria para cosméticos en Chile',
    lede: 'Formaliza tu emprendimiento de cosmética con respaldo.',
    audience: 'Ya fabricas o vas a fabricar cosméticos y quieres venderlos de forma legal.',
    includes: [
      'Clase con enfermera universitaria y químico farmacéutico. TODO: nombre del químico farmacéutico, o quitar la mención.',
      'Cómo elaborar tus fichas técnicas',
      'Etiquetado, nomenclatura y promoción correcta',
      'Planos, guías y directorio de laboratorios en Chile',
      'Central de apuntes actualizada',
      'Diploma imprimible',
    ],
    priceDisplay: 'TODO: precio individual',
    cta: 'Comprar Resolución Sanitaria',
    utm: 'card_resolucion',
  },
  {
    id: 'ventas',
    name: 'Técnicas de Venta para Emprendedores',
    lede: 'Vende con estrategia, sin sentir que estás vendiendo.',
    audience: 'Ya tienes producto y quieres venderlo mejor.',
    includes: [
      'Técnicas de venta 1 a 1, en vitrina y en redes',
      'Propuesta de valor para atraer a tu clienta ideal',
      'Modelo de negocios para postular a fondos concursables',
      'Estrategia de contenido',
      'Sirve para emprendimientos de productos y de servicios',
    ],
    priceDisplay: 'TODO: precio individual',
    cta: 'Comprar Técnicas de Venta',
    utm: 'card_ventas',
  },
];
