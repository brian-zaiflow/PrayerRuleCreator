# Orthodox Prayer Rule Creator

A beautiful web application for creating elegantly formatted Orthodox prayer rules and custom prayer books, optimized for printing on letter-size paper.

## Overview

This application provides a clean, distraction-free interface for creating professional prayer documents with sophisticated typography inspired by classic Orthodox prayer books. Users can manually add sections, import pre-configured Orthodox prayers from a comprehensive library, insert decorative dividers, and preview their document in real-time before printing.

## Features

### Core Functionality
- **Document Editor**: Clean interface for adding and editing document content
- **Orthodox Prayer Library**: Browse and import classic Orthodox prayers organized by category
  - Morning Prayers (Trisagion, Morning Prayer)
  - Evening Prayers (Evening Prayer, Prayer for Peaceful Sleep)
  - Prayers for Life Events (Finding a Spouse, Before Journey, Before Meals)
  - Prayers to the Theotokos (Hymn, Protection Prayer)
  - Prayers to Saints (St. Nicholas, Guardian Angel)
  - Psalms (Psalm 23, Psalm 51)
  - General Prayers (Jesus Prayer, Thanksgiving, Prayer for Enemies)
- **Prayer Search & Filter**: Search prayers by title, content, or tags; filter by category
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
- `src/components/DocumentEditor.tsx` - Left panel with document editing controls and prayer library integration
- `src/components/PrayerBrowser.tsx` - Modal dialog for browsing and importing Orthodox prayers
- `src/components/SectionEditor.tsx` - Individual section editing component with drag-and-drop
- `src/components/DocumentPreview.tsx` - Right panel showing formatted document preview

### Backend (`server/`)
- `routes.ts` - RESTful API endpoints for document CRUD operations
- `storage.ts` - In-memory storage implementation for documents

### Shared (`shared/`)
- `schema.ts` - TypeScript types and Zod schemas for documents and sections
- `prayerLibrary.ts` - Comprehensive library of classic Orthodox prayers with categorization, search, and tagging

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

1. **Create Prayer Rule**: Enter a title for your prayer rule or custom prayer book
2. **Add Content**: 
   - Click "Prayer Library" to browse and import classic Orthodox prayers
   - Use "Add Section" to manually create custom sections
   - Use "Add Divider" for decorative separators
3. **Browse Prayer Library**: 
   - Filter prayers by category (Morning, Evening, Life Events, etc.)
   - Search prayers by title, content, or tags
   - Preview prayers before importing
   - Click "Import" to add prayers to your document
4. **Edit Sections**: Click into section title or content fields to customize
5. **Reorder**: Drag sections by the grip handle to arrange your prayer rule
6. **Preview**: Live preview updates automatically on the right side
7. **Save**: Click "Save" to persist your prayer rule
8. **Print**: Click "Print" to create a beautiful printed prayer book
   - **For a clean aesthetic document**: Disable browser headers/footers in the print dialog
     - Chrome/Edge: More settings → Uncheck "Headers and footers"
     - Firefox: Page Setup → Set Headers & Footers to "--blank--"
     - Safari: Uncheck "Print headers and footers"

## Recent Changes

### October 23, 2025
- **Multi-Page Printing Fix**: Resolved critical issue where only first page printed
  - Removed viewport height constraints (`h-screen`, `overflow-hidden`) in print mode
  - Added comprehensive print styles to force all containers to expand (`height: auto`, `overflow: visible`)
  - Ensured parent containers (Home.tsx) and preview component properly support multi-page flow
  - Documents of any length now print completely across multiple pages
  - Sections stay together with `page-break-inside: avoid`
- **Print Optimization**: Letter-size (8.5" × 11") with proper margins (0.6in top/bottom, 0.75in sides)

### Earlier October 2025
- **Orthodox Prayer Library**: Added comprehensive library of classic Orthodox prayers
  - 15+ prayers organized by 7 categories
  - Search and filter functionality
  - Tag-based organization (daily, contemplative, intercession, etc.)
  - Preview and import workflow
- **Print Enhancements**: Fixed print preview to hide scrollbars and show only document content
- **Schema Validation**: Strengthened order field validation to prevent data corruption
- **Backend Normalization**: Automatic section order reindexing on all CRUD operations

### Initial Release
- Elegant design system with Cormorant Garamond and Montserrat fonts
- Drag-and-drop section reordering
- Loading states for better UX
- Print-optimized layout with proper page breaks

## Design Philosophy

The application follows these principles:
- **Elegance**: Refined typography with generous spacing
- **Clarity**: Clear visual hierarchy through font sizes and weights
- **Simplicity**: Minimal UI that doesn't distract from content
- **Print-first**: Optimized for beautiful printed output
- **Timeless**: Classic design that won't feel dated
