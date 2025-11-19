export interface Lawyer {
  id: string;
  name: string;
  specialization: string;
  category?: string;
  experience?: number;
  city?: string;
  languages?: string[];
  price?: number;
  availability?: string[];
  verified?: boolean;
}
