export interface Booking {
  id: string;
  clientId: string;
  lawyerId: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  scheduledFor?: string;
  matter?: string;
  amount?: number;
}
