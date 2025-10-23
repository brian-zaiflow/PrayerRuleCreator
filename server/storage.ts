import { type Document, type InsertDocument, type UpdateDocument, documents } from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql } from "drizzle-orm";

export interface IStorage {
  // Document operations
  getAllDocuments(): Promise<Document[]>;
  getDocument(id: string): Promise<Document | undefined>;
  createDocument(document: InsertDocument): Promise<Document>;
  updateDocument(id: string, updates: UpdateDocument): Promise<Document | undefined>;
  deleteDocument(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getAllDocuments(): Promise<Document[]> {
    return await db.select().from(documents).orderBy(desc(documents.createdAt));
  }

  async getDocument(id: string): Promise<Document | undefined> {
    const [document] = await db.select().from(documents).where(eq(documents.id, id));
    return document || undefined;
  }

  async createDocument(insertDocument: InsertDocument): Promise<Document> {
    // Normalize section order values on creation
    const normalizedSections = insertDocument.sections.map((s, index) => ({
      ...s,
      order: index,
    }));
    
    const [document] = await db
      .insert(documents)
      .values({
        ...insertDocument,
        sections: normalizedSections,
      })
      .returning();
    return document;
  }

  async updateDocument(
    id: string,
    updates: UpdateDocument
  ): Promise<Document | undefined> {
    // Normalize section order values if sections are being updated
    const normalizedUpdates = { ...updates };
    if (normalizedUpdates.sections) {
      normalizedUpdates.sections = normalizedUpdates.sections.map((s, index) => ({
        ...s,
        order: index,
      }));
    }
    
    const [updated] = await db
      .update(documents)
      .set({
        ...normalizedUpdates,
        updatedAt: sql`extract(epoch from now())`,
      })
      .where(eq(documents.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteDocument(id: string): Promise<boolean> {
    const result = await db.delete(documents).where(eq(documents.id, id)).returning();
    return result.length > 0;
  }
}

export const storage = new DatabaseStorage();
