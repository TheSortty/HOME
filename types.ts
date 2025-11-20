export interface Package {
  id: number;
  name: string;
  price: string;
  description: string;
  features: string[];
  isFeatured: boolean;
  paymentLink: string;
}

export type TestimonialRole = 'Participante' | 'Senior' | 'Staff';

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  cycle: string;
  roles: TestimonialRole[];
  pl: number;
  rating: number;
  photoUrl?: string;
  videoUrl?: string;
}