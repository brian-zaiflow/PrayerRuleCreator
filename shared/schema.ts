import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Document section can be either a text section or a divider
export const sectionTypeSchema = z.enum(["section", "divider"]);

export const documentSectionSchema = z.object({
  id: z.string(),
  type: sectionTypeSchema,
  title: z.string().optional(), // Only for type="section"
  content: z.string().optional(), // Only for type="section"
  order: z.number(),
});

export const documents = pgTable("documents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  sections: jsonb("sections").notNull().$type<z.infer<typeof documentSectionSchema>[]>(),
  createdAt: integer("created_at").notNull().default(sql`extract(epoch from now())`),
  updatedAt: integer("updated_at").notNull().default(sql`extract(epoch from now())`),
});

export const insertDocumentSchema = createInsertSchema(documents, {
  title: z.string().min(1, "Title is required"),
  sections: z.array(documentSectionSchema),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateDocumentSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  sections: z.array(documentSectionSchema).optional(),
}).refine(
  (data) => {
    // If sections are provided, validate all have order field
    if (data.sections) {
      return data.sections.every((s) => typeof s.order === 'number');
    }
    return true;
  },
  { message: "All sections must have valid order values" }
);

export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type UpdateDocument = z.infer<typeof updateDocumentSchema>;
export type Document = typeof documents.$inferSelect;
export type DocumentSection = z.infer<typeof documentSectionSchema>;
export type SectionType = z.infer<typeof sectionTypeSchema>;
