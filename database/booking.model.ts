import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import { Event } from './event.model';

/**
 * Booking domain type used throughout the application.
 */
export interface Booking {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export type BookingDocument = Booking & Document;
export type BookingModel = Model<BookingDocument>;

const EMAIL_REGEX: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const bookingSchema = new Schema<BookingDocument>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
      index: true, // Index to speed up event-based lookups.
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (value: string): boolean => EMAIL_REGEX.test(value),
        message: 'Email must be a valid email address.',
      },
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

// Secondary index for queries filtering by eventId.
bookingSchema.index({ eventId: 1 });

/**
 * Pre-save hook to:
 * - Validate email format.
 * - Ensure the referenced Event exists before creating a booking.
 */
bookingSchema.pre<BookingDocument>('save', async function preSave() {
  if (!EMAIL_REGEX.test(this.email)) {
    throw new Error('Email must be a valid email address.');
  }

  const eventExists = await Event.exists({ _id: this.eventId });

  if (!eventExists) {
    throw new Error('Cannot create booking: referenced event does not exist.');
  }
});

export const Booking: BookingModel =
  (mongoose.models.Booking as BookingModel | undefined) ||
  mongoose.model<BookingDocument, BookingModel>('Booking', bookingSchema);

export default Booking;
