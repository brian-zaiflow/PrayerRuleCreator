# Document Creator

A beautiful web application for creating elegantly formatted documents optimized for printing on letter-size paper.

## Overview

This application provides a clean, distraction-free interface for creating professional documents with sophisticated typography inspired by classic prayer documents. Users can add sections with titles and content, insert decorative dividers, and preview their document in real-time before printing.

## Features

### Core Functionality
- **Document Editor**: Clean interface for adding and editing document content
- **Section Management**: Add, edit, delete, and reorder sections via drag-and-drop
- **Decorative Dividers**: Insert elegant gold dividers between sections
- **Live Preview**: Real-time preview showing exactly how the document will print
- **Print Optimization**: Letter-size (8.5" × 11") layout with proper margins and page breaks
- **Auto-save**: Documents are automatically saved to in-memory storage

### Design System
- **Typography**: 
  - Cormorant Garamond for headings (elegant serif)
  - Montserrat for body text (clean sans-serif)
  - Document titles: 36px, uppercase, letter-spacing 3px
  - Section titles: 17px, medium weight
  - Content: 12px, line-height 1.6
  
- **Color Palette**:
  - Classic gold accent: #d4af37
  - Deep charcoal text: #1a1a1a
  - Warm off-white background: #f5f5f0
  - Pure white for document preview
  - Medium gray for content: #4a4a4a

## Project Structure

### Frontend (`client/`)
- `src/pages/Home.tsx` - Main application page with split editor/preview layout
- `src/components/DocumentEditor.tsx` - Left panel with document editing controls
- `src/components/SectionEditor.tsx` - Individual section editing component with drag-and-drop
- `src/components/DocumentPreview.tsx` - Right panel showing formatted document preview

### Backend (`server/`)
- `routes.ts` - RESTful API endpoints for document CRUD operations
- `storage.ts` - In-memory storage implementation for documents

### Shared (`shared/`)
- `schema.ts` - TypeScript types and Zod schemas for documents and sections

## Data Model

### Document
- `id`: Unique identifier
- `title`: Document title
- `sections`: Array of section objects
- `createdAt`: Unix timestamp
- `updatedAt`: Unix timestamp

### Section
- `id`: Unique identifier
- `type`: "section" or "divider"
- `title`: Section heading (for type="section")
- `content`: Section body text (for type="section")
- `order`: Position in document

## API Endpoints

- `GET /api/documents` - List all documents
- `GET /api/documents/:id` - Get specific document
- `POST /api/documents` - Create new document
- `PATCH /api/documents/:id` - Update document
- `DELETE /api/documents/:id` - Delete document

## Development

### Running the Application
```bash
npm run dev
```

The application runs on port 5000 with:
- Express server for backend API
- Vite dev server for frontend with HMR

### Technology Stack
- **Frontend**: React, TypeScript, Tailwind CSS, TanStack Query
- **Backend**: Express.js, Node.js
- **Storage**: In-memory (MemStorage)
- **Validation**: Zod
- **UI Components**: shadcn/ui with Radix primitives

## User Workflow

1. **Create Document**: Enter a title and start adding sections
2. **Add Content**: Use "Add Section" for text sections or "Add Divider" for decorative separators
3. **Edit Sections**: Click into section title or content fields to edit
4. **Reorder**: Drag sections by the grip handle to rearrange
5. **Preview**: Live preview updates automatically on the right side
6. **Save**: Click "Save" to persist changes
7. **Print**: Click "Print" to open browser print dialog with optimized layout

## Recent Changes

- Initial implementation with elegant design system
- Added drag-and-drop section reordering
- Implemented loading states for better UX
- Added section order normalization after deletions
- Print-optimized layout with proper page breaks

## Design Philosophy

The application follows these principles:
- **Elegance**: Refined typography with generous spacing
- **Clarity**: Clear visual hierarchy through font sizes and weights
- **Simplicity**: Minimal UI that doesn't distract from content
- **Print-first**: Optimized for beautiful printed output
- **Timeless**: Classic design that won't feel dated
