import mongoose, { Document, Model, Schema } from 'mongoose';

/**
 * Event domain type used throughout the application.
 */
export interface Event {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  /**
   * Calendar date in ISO-8601 format (YYYY-MM-DD).
   */
  date: string;
  /**
   * Time stored in 24h format (HH:mm).
   */
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type EventDocument = Event & Document;
export type EventModel = Model<EventDocument>;

/**
 * Create a URL-friendly slug from an event title.
 */
const createSlug = (title: string): string => {
  return title
    .trim()
    .toLowerCase()
    // Replace whitespace with single dashes
    .replace(/\s+/g, '-')
    // Remove all characters that are not alphanumeric or dashes
    .replace(/[^a-z0-9-]/g, '')
    // Collapse multiple dashes
    .replace(/-+/g, '-')
    // Trim leading/trailing dashes
    .replace(/^-+|-+$/g, '');
};

/**
 * Normalize a date-like string to ISO-8601 date (YYYY-MM-DD).
 */
const normalizeDate = (value: string): string => {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    throw new Error('Invalid event date. Expected a valid date string.');
  }

  return parsed.toISOString().slice(0, 10); // YYYY-MM-DD
};

/**
 * Normalize time to 24-hour HH:mm format and validate bounds.
 */
const normalizeTime = (value: string): string => {
  const match = value.trim().match(/^(\d{1,2}):(\d{2})$/);

  if (!match) {
    throw new Error('Invalid event time. Expected format HH:mm (24-hour).');
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);

  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    throw new Error('Invalid event time. Hour must be 0–23 and minutes 0–59.');
  }

  const normalizedHours = hours.toString().padStart(2, '0');
  const normalizedMinutes = minutes.toString().padStart(2, '0');

  return `${normalizedHours}:${normalizedMinutes}`;
};

const eventSchema = new Schema<EventDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    overview: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    venue: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
    time: {
      type: String,
      required: true,
      trim: true,
    },
    mode: {
      type: String,
      required: true,
      trim: true,
    },
    audience: {
      type: String,
      required: true,
      trim: true,
    },
    agenda: {
      type: [String],
      required: true,
      validate: {
        validator: (value: string[]): boolean => value.length > 0,
        message: 'Agenda must contain at least one item.',
      },
    },
    organizer: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      required: true,
      validate: {
        validator: (value: string[]): boolean => value.length > 0,
        message: 'Tags must contain at least one tag.',
      },
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

// Explicit unique index on slug for extra safety.
eventSchema.index({ slug: 1 }, { unique: true });

/**
 * Pre-save hook to:
 * - Ensure all required string fields are non-empty.
 * - Generate a slug from the title (only if the title changed or slug is missing).
 * - Normalize date to ISO (YYYY-MM-DD) and time to HH:mm.
 */
eventSchema.pre<EventDocument>('save', function preSave() {
  const requiredStringFields: Array<
    keyof Pick<
      Event,
      'title' | 'description' | 'overview' | 'image' | 'venue' | 'location' | 'mode' | 'audience' | 'organizer'
    >
  > = [
    'title',
    'description',
    'overview',
    'image',
    'venue',
    'location',
    'mode',
    'audience',
    'organizer',
  ];

  for (const field of requiredStringFields) {
    const value = this[field];
    if (typeof value !== 'string' || value.trim().length === 0) {
      throw new Error(`Event ${field} is required and cannot be empty.`);
    }
  }

  if (!Array.isArray(this.agenda) || this.agenda.length === 0) {
    throw new Error('Event agenda is required and must contain at least one item.');
  }

  if (!Array.isArray(this.tags) || this.tags.length === 0) {
    throw new Error('Event tags are required and must contain at least one tag.');
  }

  // Regenerate slug only when the title changes or slug is not set.
  if (this.isModified('title') || !this.slug) {
    this.slug = createSlug(this.title);
  }

  // Normalize date and time representations.
  if (this.isModified('date')) {
    this.date = normalizeDate(this.date);
  }

  if (this.isModified('time')) {
    this.time = normalizeTime(this.time);
  }
});

export const Event: EventModel =
  (mongoose.models.Event as EventModel | undefined) ||
  mongoose.model<EventDocument, EventModel>('Event', eventSchema);

export default Event;
