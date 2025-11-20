import type { Package, Testimonial } from './types';

export const PACKAGES: Package[] = [
  {
    id: 1,
    name: 'INICIAL',
    price: '$99',
    description: 'El primer paso hacia tu interior. Una introducción a la autoexploración y el autoconocimiento.',
    features: [
      'Acceso a 4 sesiones grupales (Jue-Dom)',
      'Material de trabajo semanal',
      'Comunidad de apoyo inicial',
      'Guía de meditación para principiantes',
    ],
    isFeatured: false,
    paymentLink: 'https://mercadopago.com/link/de-pago/1',
  },
  {
    id: 2,
    name: 'AVANZADO',
    price: '$199',
    description: 'Profundiza en tu ser, rompe barreras y reconstruye tu perspectiva. Requiere haber completado INICIAL.',
    features: [
      'Acceso a 4 sesiones intensivas',
      'Requisito: Haber graduado INICIAL',
      'Sesión individual de mentoría',
      'Talleres de herramientas emocionales',
      'Acceso exclusivo a eventos',
    ],
    isFeatured: true,
    paymentLink: 'https://mercadopago.com/link/de-pago/2',
  },
  {
    id: 3,
    name: 'PROGRAMA LIDER',
    price: '$249',
    description: 'Aplica lo aprendido y mantén el crecimiento. La etapa final para liderar tu propia vida.',
    features: [
      'Acceso a 12 sesiones grupales',
      'Requisito: Haber graduado AVANZADO',
      'Dos sesiones individuales de seguimiento',
      'Acceso a la red de alumni',
      'Retiro anual con descuento',
    ],
    isFeatured: false,
    paymentLink: 'https://mercadopago.com/link/de-pago/3',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: 'HOME cambió mi perspectiva por completo. No es un curso, es una experiencia que te desarma y te vuelve a construir, pero mucho más fuerte y consciente de quién eres realmente. Volví a casa, a mi verdadero hogar interior, y no podría estar más agradecido por el viaje.',
    author: 'Ana García',
    cycle: 'Ciclo 2023',
    roles: ['Participante'],
    pl: 27,
    rating: 5,
  },
  {
    id: 2,
    quote: 'Encontré una comunidad increíble y, lo más importante, me encontré a mí mismo en el proceso. El acompañamiento es increíblemente humano y profesional. Recomiendo esta experiencia a cualquiera que se sienta perdido o en busca de un cambio significativo.',
    author: 'Carlos Vera',
    cycle: 'Ciclo 2023',
    roles: ['Participante', 'Senior'],
    pl: 27,
    rating: 5,
  },
  {
    id: 3,
    quote: 'Dudé mucho en empezar, pero fue la mejor decisión que tomé. El proceso es retador pero inmensamente gratificante. La sensación de liberarte de viejas cargas y conectar con gente en la misma sintonía no tiene precio. Lo recomiendo al 100%.',
    author: 'Sofía Martinez',
    cycle: 'Ciclo 2022',
    roles: ['Participante'],
    pl: 20,
    rating: 5,
  },
  {
    id: 4,
    quote: 'El nivel de profundidad que alcanzamos en las sesiones grupales fue algo que nunca había experimentado. Un espacio de vulnerabilidad y crecimiento radical. HOME es magia pura.',
    author: 'Javier Luna',
    cycle: 'Ciclo 2024',
    roles: ['Staff'],
    pl: 40,
    rating: 5,
  },
  {
    id: 5,
    quote: 'Aprendí a escucharme, a respetar mis tiempos y a celebrar mis pequeñas victorias. HOME me dio herramientas que uso todos los días. Es una inversión en uno mismo que rinde frutos para siempre.',
    author: 'Valentina Rojas',
    cycle: 'Ciclo 2024',
    roles: ['Participante'],
    pl: 40,
    rating: 5,
  }
];