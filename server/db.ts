import { Pool as NeonPool, neonConfig } from '@neondatabase/serverless';
import { drizzle as neonDrizzle } from 'drizzle-orm/neon-serverless';
import { drizzle as pgDrizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
const { Pool: PgPool } = pkg;
import ws from "ws";
import * as schema from "@shared/schema";
import { config } from "./config";

if (!process.env.DATABASE_URL && config.enableDocumentPersistence) {
  throw new Error(
    "DATABASE_URL must be set when ENABLE_DOCUMENT_PERSISTENCE is true. Did you forget to provision a database?",
  );
}

let pool: any;
let db: any;

// Only initialize database connection if persistence is enabled
if (config.enableDocumentPersistence && process.env.DATABASE_URL) {
  // Check if using Neon (has .neon.tech in the URL) or regular PostgreSQL
  const isNeon = process.env.DATABASE_URL.includes('.neon.tech');

  if (isNeon) {
    // Use Neon serverless client for Neon databases
    neonConfig.webSocketConstructor = ws;
    pool = new NeonPool({ connectionString: process.env.DATABASE_URL });
    db = neonDrizzle({ client: pool, schema });
  } else {
    // Use standard pg client for regular PostgreSQL
    pool = new PgPool({ connectionString: process.env.DATABASE_URL });
    db = pgDrizzle({ client: pool, schema });
  }
}

export { pool, db };
