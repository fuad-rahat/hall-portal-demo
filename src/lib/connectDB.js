import { MongoClient, ServerApiVersion } from "mongodb";

let db;
export const connectDB = async () => {
  if (db) return db;
  try {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    });
    
    db = client.db('hallPortal');
    return db;
  } catch (error) {
    console.error('Failed to connect to database', error);
  }
};
