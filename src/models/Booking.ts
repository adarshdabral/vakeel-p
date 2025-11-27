import { Schema, model, models } from 'mongoose';

const BookingSchema = new Schema(
  {
    clientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    lawyerId: { type: Schema.Types.ObjectId, ref: 'Lawyer', required: true },
    date: { type: String, required: true }, // ISO date string (yyyy-mm-dd)
    slot: { type: String, required: true }, // e.g. "13:00 - 13:30"
    status: {
      type: String,
      enum: ['active', 'rejected'],
      default: 'active',
    },
    note: { type: String, default: '' },
    rejectionReason: { type: String, default: '' },
  },
  { timestamps: true }
);

export const BookingModel = models.Booking || model('Booking', BookingSchema);
