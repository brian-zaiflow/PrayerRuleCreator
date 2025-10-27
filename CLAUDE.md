# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Orthodox Prayer Rule Creator - A client-only web application for creating elegantly formatted Orthodox prayer rules and custom prayer books, optimized for printing on letter-size paper. Users can manually add sections, import pre-configured Orthodox prayers from a comprehensive library, and preview documents in real-time before printing.

**This is a static web application** - no backend server, no database, no persistent storage. All data exists only in the current session.

### Text Formatting

Section content supports markdown-like inline formatting:
- `**bold text**` renders as **bold**
- `*italic text*` renders as *italic*
- `{red text}` renders in Byzantine red color (#B33434)
- `___` renders as a blank line for handwriting names (useful for commemorations)

This allows for traditional prayer book typography, such as marking repetitions `{(3 times)}`, rubrics, or name placeholders `*N.*`

For commemorations (prayers for the living and departed), users can either:
- Use `___` syntax to create blank lines for handwriting names after printing
- Type names directly into the content for a printed list (e.g., "John, Mary, Peter")

## Development Commands

```bash
# Development server with hot-reload
npm run dev

# TypeScript type checking
npm run check

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Deployment

This application is deployed to GitHub Pages automatically via GitHub Actions when pushing to the `main` branch.

### GitHub Pages Setup

1. Enable GitHub Pages in your repository settings
2. Set the source to "GitHub Actions"
3. Push to the main branch - the workflow in `.github/workflows/deploy.yml` will build and deploy automatically

### Manual Deployment

```bash
# Build the app
npm run build

# The dist/ folder contains the production build
# Deploy the contents of dist/ to any static hosting service
```

## Architecture

### Client-Only Structure

This is a single-page React application built with Vite:

- **client/**: React frontend application
  - **src/components/**: React components
  - **src/pages/**: Page components (just Home)
  - **src/lib/**: Utilities and prayer library data
  - **src/types/**: TypeScript type definitions
  - **public/**: Static assets (favicon)

### Key Architectural Patterns

1. **No Persistence**:
   - All document state is stored in React component state
   - No localStorage, no database, no server
   - Data is lost on page refresh - this is intentional
   - Users are expected to print or save PDFs of their prayer rules

2. **Type Safety**:
   - Zod schemas in `client/src/types/schema.ts` for runtime validation
   - TypeScript types inferred from Zod schemas

3. **Print Optimization**:
   - Preview panel shows exactly what will print
   - Custom CSS for print media
   - Letter-size (8.5" × 11") format with proper margins

4. **Text Formatting**:
   - Markdown-like syntax for inline styling (bold, italic, colored text)
   - Handled by `StyledText` component in `client/src/components/StyledText.tsx`

## Data Model

### Document Structure
Documents contain sections that can be either text sections or decorative dividers:

```typescript
DocumentSection {
  id: string (UUID)
  type: "section" | "divider"
  title?: string      // Only for type="section"
  content?: string    // Only for type="section"
  order: number       // Position in document
}

Layout: "single" | "double"  // Column layout
```

### Prayer Library
The prayer library (`client/src/lib/prayerLibrary.ts`) contains a curated collection of Orthodox prayers organized by category (Morning Prayers, Evening Prayers, Prayers for Life Events, Prayers to the Theotokos, Prayers to Saints, Psalms, General Prayers). Each prayer has a title, content, category, and tags for searching.

## Frontend Architecture

### Component Hierarchy
```
App (no routing needed)
└── Home (editor page)
    ├── DocumentEditor (left panel)
    │   ├── Section controls and prayer library button
    │   ├── PrayerBrowser (modal dialog)
    │   └── SectionEditor components (drag-and-drop)
    └── DocumentPreview (right panel)
        └── Print-optimized preview
```

### State Management
- **React local state** for all application state
- **No persistence** - state resets on page refresh
- Document title, layout, and sections stored in Home component

### Styling
- **Tailwind CSS** with custom design system
- Custom fonts: Cormorant Garamond (headings), Montserrat (body)
- Print-optimized styles with `@media print` for clean output
- Resizable panels using `react-resizable-panels`

## Important Patterns & Conventions

### Section Order Management
Sections maintain an `order` field that determines their position. When reordering via drag-and-drop or deleting sections, order values are normalized (0, 1, 2, ...).

### Adding New Prayers
To add prayers to the library, edit `client/src/lib/prayerLibrary.ts`:
1. Add prayer object to `prayerLibrary` array
2. Use existing categories or add to `prayerCategories` const
3. Include appropriate tags for searchability

### Print Optimization
The preview component (`DocumentPreview.tsx`) has special print styles:
- Removes container height constraints in print mode
- Uses `page-break-inside: avoid` on sections to keep them together
- Letter-size (8.5" × 11") with 0.75in horizontal and 0.6in vertical margins
- Hides scrollbars and editor panel in print mode

## Common Development Scenarios

### Adding New Prayer Categories
1. Update `prayerCategories` array in `client/src/lib/prayerLibrary.ts`
2. Add prayers with the new category

### Modifying Document Schema
1. Update Zod schemas in `client/src/types/schema.ts`
2. TypeScript types will auto-update via inference
3. Update components to handle new fields

### Adding New Section Types
The section system is flexible - sections can be either content sections (with title/content) or dividers (decorative separators). To add new section types, update the `sectionTypeSchema` in `client/src/types/schema.ts`.

## Testing & Debugging

Test IDs are present on key UI elements (prefixed with `data-testid`) for potential testing:
- `input-document-title`
- `button-add-section`
- `button-prayer-library`
- `button-add-divider`
- `button-toggle-layout`
- `button-print`

## Browser Compatibility

- Modern browsers with ES6+ support
- Service workers require HTTPS (or localhost for development)
- Print functionality tested in Chrome, Firefox, Safari
