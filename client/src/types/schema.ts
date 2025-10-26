import { z } from "zod";

// Document section can be either a text section or a divider
export const sectionTypeSchema = z.enum(["section", "divider"]);
export const layoutTypeSchema = z.enum(["single", "double"]);

export const documentSectionSchema = z.object({
  id: z.string(),
  type: sectionTypeSchema,
  title: z.string().optional(), // Only for type="section"
  content: z.string().optional(), // Only for type="section"
  order: z.number(),
});

export type DocumentSection = z.infer<typeof documentSectionSchema>;
export type SectionType = z.infer<typeof sectionTypeSchema>;
export type LayoutType = z.infer<typeof layoutTypeSchema>;
