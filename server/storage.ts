import { type Document, type InsertDocument, type UpdateDocument } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Document operations
  getAllDocuments(): Promise<Document[]>;
  getDocument(id: string): Promise<Document | undefined>;
  createDocument(document: InsertDocument): Promise<Document>;
  updateDocument(id: string, updates: UpdateDocument): Promise<Document | undefined>;
  deleteDocument(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private documents: Map<string, Document>;

  constructor() {
    this.documents = new Map();
  }

  async getAllDocuments(): Promise<Document[]> {
    return Array.from(this.documents.values()).sort(
      (a, b) => b.createdAt - a.createdAt
    );
  }

  async getDocument(id: string): Promise<Document | undefined> {
    return this.documents.get(id);
  }

  async createDocument(insertDocument: InsertDocument): Promise<Document> {
    const id = randomUUID();
    const now = Math.floor(Date.now() / 1000);
    
    // Normalize section order values on creation
    const normalizedSections = insertDocument.sections.map((s, index) => ({
      ...s,
      order: index,
    }));
    
    const document: Document = {
      ...insertDocument,
      sections: normalizedSections,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.documents.set(id, document);
    return document;
  }

  async updateDocument(
    id: string,
    updates: UpdateDocument
  ): Promise<Document | undefined> {
    const document = this.documents.get(id);
    if (!document) return undefined;

    const now = Math.floor(Date.now() / 1000);
    
    // Normalize section order values if sections are being updated
    const normalizedUpdates = { ...updates };
    if (normalizedUpdates.sections) {
      normalizedUpdates.sections = normalizedUpdates.sections.map((s, index) => ({
        ...s,
        order: index,
      }));
    }
    
    const updated: Document = {
      ...document,
      ...normalizedUpdates,
      updatedAt: now,
    };
    this.documents.set(id, updated);
    return updated;
  }

  async deleteDocument(id: string): Promise<boolean> {
    return this.documents.delete(id);
  }
}

export const storage = new MemStorage();
