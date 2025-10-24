# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Orthodox Prayer Rule Creator - A web application for creating elegantly formatted Orthodox prayer rules and custom prayer books, optimized for printing on letter-size paper. Users can manually add sections, import pre-configured Orthodox prayers from a comprehensive library, and preview documents in real-time before printing.

## Development Commands

```bash
# Development server with hot-reload
npm run dev

# TypeScript type checking
npm check

# Build for production (frontend + backend)
npm run build

# Start production server
npm start

# Database operations
npm run db:push  # Push schema changes to database
```

## Architecture

### Monorepo Structure

This is a full-stack TypeScript application with three main directories:

- **client/**: React frontend with Vite
- **server/**: Express.js backend API
- **shared/**: Shared TypeScript types, schemas, and data (used by both client and server)

### Key Architectural Patterns

1. **Single Port Architecture**: Both frontend and backend run on port 5000 (configured via PORT env var)
   - In development: Vite dev server proxies API requests to Express
   - In production: Express serves built frontend assets
   - All API routes are prefixed with `/api`

2. **Type-Safe Validation Flow**: Zod schemas in `shared/schema.ts` define the shape of data
   - Schemas generate TypeScript types via inference
   - Backend validates requests using these schemas before database operations
   - Frontend uses same types for type safety

3. **Database Access Pattern**: Drizzle ORM with repository pattern
   - Database connection in `server/db.ts` (PostgreSQL via Neon)
   - Storage interface and implementation in `server/storage.ts`
   - Schema definitions in `shared/schema.ts` using Drizzle and Zod

4. **Data Normalization**: Section order values are automatically normalized (reindexed 0, 1, 2...) on all CRUD operations in `storage.ts` to prevent data corruption

## Data Model

### Document Structure
Documents contain sections that can be either text sections or decorative dividers:

```typescript
Document {
  id: string (UUID)
  title: string
  layout: "single" | "double"  // Column layout
  sections: DocumentSection[]
  createdAt: number (Unix timestamp)
  updatedAt: number (Unix timestamp)
}

DocumentSection {
  id: string
  type: "section" | "divider"
  title?: string      // Only for type="section"
  content?: string    // Only for type="section"
  order: number       // Position in document (auto-normalized)
}
```

### Prayer Library
The prayer library (`shared/prayerLibrary.ts`) contains a curated collection of Orthodox prayers organized by category (Morning Prayers, Evening Prayers, Prayers for Life Events, Prayers to the Theotokos, Prayers to Saints, Psalms, General Prayers). Each prayer has a title, content, category, and tags for searching.

## Frontend Architecture

### Component Hierarchy
```
App (routing with wouter)
├── DocumentList (homepage)
│   └── Shows all documents with previews
└── Home (editor page)
    ├── DocumentEditor (left panel)
    │   ├── Section controls and prayer library button
    │   ├── PrayerBrowser (modal dialog)
    │   └── SectionEditor components (drag-and-drop)
    └── DocumentPreview (right panel)
        └── Print-optimized preview
```

### State Management
- **TanStack Query** for server state (documents CRUD)
- **React local state** for UI state (editing, drag-and-drop)
- Query invalidation triggers re-fetches after mutations

### Styling
- **Tailwind CSS** with custom design system
- Custom fonts: Cormorant Garamond (headings), Montserrat (body)
- Print-optimized styles with `@media print` for clean output
- Resizable panels using `react-resizable-panels`

## Backend Architecture

### API Endpoints (server/routes.ts)
- `GET /api/documents` - List all documents (ordered by creation date, descending)
- `GET /api/documents/:id` - Get single document
- `POST /api/documents` - Create document (validates with `insertDocumentSchema`)
- `PATCH /api/documents/:id` - Update document (validates with `updateDocumentSchema`)
- `DELETE /api/documents/:id` - Delete document

### Request Flow
1. Express receives request
2. Route handler validates input with Zod schema
3. Storage layer performs database operation via Drizzle
4. Response sent with proper status code and data/error

### Database
- PostgreSQL database accessed via Neon serverless
- Connection string in `DATABASE_URL` environment variable
- Drizzle ORM for type-safe queries
- WebSocket constructor configured for Neon compatibility

## Important Patterns & Conventions

### Section Order Management
Always use the storage layer methods which automatically normalize order values. Never manually manipulate order fields without reindexing all sections sequentially from 0.

### Adding New Prayers
To add prayers to the library, edit `shared/prayerLibrary.ts`:
1. Add prayer object to `prayerLibrary` array
2. Use existing categories or add to `prayerCategories` const
3. Include appropriate tags for searchability

### Print Optimization
The preview component (`DocumentPreview.tsx`) has special print styles:
- Removes container height constraints in print mode
- Uses `page-break-inside: avoid` on sections to keep them together
- Letter-size (8.5" × 11") with 0.75in horizontal and 0.6in vertical margins
- Hides scrollbars and editor panel in print mode

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (required)
- `PORT`: Server port (defaults to 5000)
- `NODE_ENV`: Set to "development" or "production"

## Common Development Scenarios

### Adding a New API Endpoint
1. Add route handler in `server/routes.ts`
2. Create/update Zod schemas in `shared/schema.ts` if needed
3. Add storage method in `server/storage.ts`
4. Use TanStack Query in frontend components to consume the endpoint

### Modifying Database Schema
1. Update schema in `shared/schema.ts` (both Drizzle and Zod schemas)
2. Run `npm run db:push` to push changes to database
3. Update TypeScript types will auto-generate from schema

### Adding New Document Sections
The section system is flexible - sections can be either content sections (with title/content) or dividers (decorative separators). To add new section types, update the `sectionTypeSchema` in `shared/schema.ts`.

## Testing & Debugging

Test IDs are present on key UI elements (prefixed with `data-testid`) for potential testing:
- `input-document-title`
- `button-add-section`
- `button-prayer-library`
- `button-add-divider`
- `button-toggle-layout`
- `button-save`
- `button-print`
