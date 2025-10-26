# Orthodox Prayer Rule Creator

A beautiful, client-only Progressive Web App for creating elegantly formatted Orthodox prayer rules and custom prayer books. Optimized for printing on letter-size paper.

## Features

- **Prayer Library**: Browse and import from a curated collection of Orthodox prayers
- **Custom Sections**: Add your own prayers and sections
- **Beautiful Typography**: Classic fonts and elegant formatting
- **Print Optimized**: Perfect letter-size (8.5" × 11") layout
- **Single or Double Column**: Choose your preferred layout
- **Drag and Drop**: Easy reordering of sections
- **Progressive Web App**: Install on your device for offline use
- **No Account Required**: No sign-up, no tracking, completely client-side

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# TypeScript type checking
npm run check
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Deploy to GitHub Pages

1. Enable GitHub Pages in your repository settings
2. Set the source to "GitHub Actions"
3. Push to the main branch

The application will automatically build and deploy via the GitHub Actions workflow.

## How It Works

This is a **client-only application** with no backend:
- No database - all data exists in memory during your session
- No accounts or authentication
- No data collection or tracking
- Data is lost on page refresh (by design)
- Users print or save PDFs of their prayer rules

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible component primitives
- **vite-plugin-pwa** - Progressive Web App support
- **Zod** - Runtime type validation

## Project Structure

```
client/
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── lib/            # Prayer library and utilities
│   ├── types/          # TypeScript type definitions
│   └── public/         # Static assets
```

## Adding Prayers

To add prayers to the library, edit `client/src/lib/prayerLibrary.ts`:

```typescript
{
  id: "prayer-id",
  title: "Prayer Title",
  content: `Prayer text here...`,
  category: "Morning Prayers", // or other category
  tags: ["tag1", "tag2"],
}
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
