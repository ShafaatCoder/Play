import mongoose, { Mongoose } from 'mongoose';

/**
 * Resolve the MongoDB connection URI from environment variables.
 *
 * The value must be provided via the MONGODB_URI environment variable.
 * Example (in .env.local):
 *   MONGODB_URI=mongodb+srv://user:password@cluster0.mongodb.net/my-db
 */
function getMongoUri(): string {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside your environment configuration.',
    );
  }

  return uri;
}

/**
 * A small cache object that lives across hot reloads in development.
 *
 * - `conn` holds the active Mongoose instance once connected.
 * - `promise` holds the in-flight connection attempt (so we do not
 *    create multiple connections in parallel when Next.js hot-reloads).
 */
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

/**
 * Extend the global scope with a typed `mongoose` cache.
 *
 * In development, Next.js re-executes module code on every hot reload.
 * Using `globalThis` allows us to reuse the existing connection instead
 * of opening a new one on every reload. In production, the module is
 * evaluated only once, so this behaves like a regular singleton.
 */
declare global {
  // eslint-disable-next-line no-var
  // `var` is required here because we are augmenting the Node.js global scope.
  var mongoose: MongooseCache | undefined;
}

const globalForMongoose: typeof globalThis & { mongoose?: MongooseCache } = globalThis as typeof globalThis & {
  mongoose?: MongooseCache;
};

const cached: MongooseCache = globalForMongoose.mongoose ?? {
  conn: null,
  promise: null,
};

if (!globalForMongoose.mongoose) {
  globalForMongoose.mongoose = cached;
}

/**
 * Establish (or reuse) a Mongoose connection to MongoDB.
 *
 * This function is safe to call multiple times. In development it will
 * reuse the same connection across hot reloads; in production it will
 * create a single shared connection for the lifetime of the process.
 */
export async function connectToDatabase(): Promise<Mongoose> {
  // If we already have an open connection, return it immediately.
  if (cached.conn) {
    return cached.conn;
  }

  // If no connection is in progress yet, start a new one.
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(getMongoUri(), {
        // Disable mongoose buffering to surface connection errors early
        // instead of silently queuing operations.
        bufferCommands: false,
      })
      .then((mongooseInstance) => mongooseInstance);
  }

  // Wait for the connection attempt to resolve and store the result.
  cached.conn = await cached.promise;

  return cached.conn;
}

export default connectToDatabase;
