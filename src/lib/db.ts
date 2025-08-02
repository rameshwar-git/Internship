// @/lib/db.ts

import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
if (!uri) throw new Error("Missing MONGODB_URI_ONLINE");

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db: any = null;

export async function connectToDatabase() {
  if (db) return db; // return cached db

  const connection = await client.connect();
  db = connection.db(); // returns the default DB specified in URI
  return db;
}
