/**
 * Textos provisorios de la portada y de Quiénes somos.
 * El copy aprobado (copy-landing-v2, brief y 07-Quienes-somos) no estaba
 * en el entorno: este módulo concentra las frases para reemplazarlas de una vez.
 * La sección «Quiénes somos» toma como punto de partida el texto ya publicado
 * en sororite.cl y debe revisarse antes del lanzamiento.
 */
export const home = {
  eyebrow: 'Academia de cosmética natural · Chile',
  title: 'Convierte tu talento en un oficio y tu oficio en un emprendimiento',
  lede: 'Acompañamos a mujeres que quieren formular cosmética natural y construir un proyecto propio, con técnica, creatividad y asesoría cercana. Este texto es provisorio.',
  primaryCta: 'Ver cursos',
  secondaryCta: 'Hablar por WhatsApp',
  points: [
    'Cursos en línea y presenciales',
    'Formulación con insumos naturales',
    'Acompañamiento para emprender',
  ],
  coursesTitle: 'Cursos',
  coursesLede:
    'Estas fichas son datos de ejemplo para dejar armada la colección. El catálogo real se carga editando los archivos Markdown.',
  aboutTitle: 'Una academia creada desde el oficio',
  aboutLede:
    'Sororité nace de la experiencia de emprender en cosmética natural y de la decisión de compartir ese camino con otras mujeres.',
  aboutCta: 'Conocer la academia',
  stepsTitle: 'Cómo sigue el camino',
  steps: [
    {
      title: 'Eliges el curso',
      text: 'Revisas modalidad, temario y valor. Hoy las fichas son de ejemplo.',
    },
    {
      title: 'Pagas en Hotmart',
      text: 'En esta versión el cobro ocurre en Hotmart, fuera de este sitio.',
    },
    {
      title: 'Entras al aula',
      text: 'El acceso al material queda en la plataforma del curso, no aquí.',
    },
  ],
  closingTitle: '¿Conversamos tu proyecto?',
  closingLede:
    'Escríbenos por WhatsApp o por correo. Todavía no hay formulario: el mensaje sale directo.',
} as const;

export const about = {
  title: 'Quiénes somos',
  intro:
    'Somos una academia creada desde el corazón, con una clara misión: acompañar a mujeres a transformar su talento en un oficio, y su oficio en un emprendimiento que les permita vivir con autonomía, propósito y orgullo de lo que crean.',
  story: [
    'Nacimos de la experiencia real, del recorrido de una emprendedora que, con años de ensayo, error, investigación y aprendizaje, decidió poner su conocimiento al servicio de otras mujeres. Aquí no solo enseñamos fórmulas, también compartimos herramientas para que cada alumna pueda construir un proyecto propio, consciente y rentable.',
    'Creemos en el poder del hacer con las manos, en la sabiduría de lo natural y en la fuerza que se despierta cuando una mujer confía en sí misma. Por eso, nuestros cursos combinan técnica, creatividad, asesoría real y acompañamiento cercano, sin importar si estás comenzando o si ya llevas tiempo emprendiendo.',
    'Formamos artesanas, formuladoras, creadoras de aromas, texturas y marcas con identidad. Y lo más importante: formamos mujeres que se atreven a soñar en grande con sus propios productos.',
  ],
  valuesTitle: 'Nuestros valores',
  valuesLede:
    'Estos valores son principios de trabajo y, a la vez, la base de la red que queremos sostener.',
  values: [
    {
      title: 'Colaboración',
      text: 'Valoramos la colaboración por encima de la competencia. Compartir conocimiento y experiencia permite llegar más lejos, y el logro de una emprendedora se celebra como un logro de la comunidad.',
    },
    {
      title: 'Sustentabilidad',
      text: 'Cuidamos el entorno en el que trabajamos. Buscamos prácticas que reduzcan el desperdicio, usen mejor los recursos y respeten la biodiversidad.',
    },
    {
      title: 'Aprendizaje',
      text: 'Promovemos el crecimiento continuo, personal y profesional. Aprender una técnica nueva también fortalece a quien viene después.',
    },
    {
      title: 'Responsabilidad',
      text: 'El resultado de un proyecto se mira también por el efecto que deja en las personas y en el lugar donde se produce.',
    },
  ],
  historyTitle: 'Nuestra historia',
  history:
    'En cada paso llevamos el legado de quienes emprendieron antes y nos mostraron que una idea pequeña puede convertirse en un oficio. El espíritu de crear no se apaga: se enseña.',
} as const;

export const gallery = {
  title: 'Galería',
  lede: 'El espacio queda listo para las fotografías del laboratorio, los talleres y los productos. Las imágenes de esta página son marcadores, no fotos reales.',
} as const;

export const contact = {
  title: 'Contacto',
  lede: 'Cuéntanos en qué estás y te respondemos por el mismo canal. No hay formulario ni base de datos en esta versión.',
  whatsappLabel: 'Escribir por WhatsApp',
  emailLabel: 'Enviar un correo',
} as const;

export const legalBanner =
  'Borrador del 20 de octubre de 2026. Este texto no es asesoría legal y no debe publicarse sin revisión. Hay que contrastarlo con la Ley 21.719 sobre protección de datos personales y con la operación real del sitio.';
