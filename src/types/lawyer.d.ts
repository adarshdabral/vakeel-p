// types/lawyer.ts
export interface Lawyer {
  id?: string;
  userId?: string;
  specialization?: string;
  category?: string;
  experience?: number;
  city?: string;
  languages?: string[];
  price?: number;
  availability?: {
    dates: string[]; // ISO yyyy-mm-dd strings
    slots: string[]; // "09:00 - 11:00"
  };
  rating?: {
    average: number;
    totalRatings: number;
    sum: number;
  };
  profileStatus?: "processing" | "verified" | "rejected";
  createdAt?: string;
  updatedAt?: string;
}
