# Document Creator - Design Guidelines

## Overview
A beautiful document creation application inspired by elegant prayer documents with sophisticated typography and print-optimized layouts.

## Color Palette

### Light Mode
- **Background**: Warm off-white (#f5f5f0) for editor, pure white for document preview
- **Foreground**: Deep charcoal (#1a1a1a) for primary text
- **Accent**: Classic gold (#d4af37) for decorative elements and dividers
- **Secondary Text**: Medium gray (#4a4a4a) for section content
- **Muted Text**: Light gray (#6b6b6b, #999) for hints and footers
- **Borders**: Very light gray (#e8e8e8) for subtle separations
- **Card/Panel**: White with subtle shadow for elevated surfaces

### Typography
- **Headings**: "Cormorant Garamond" - elegant serif for titles and section headers
  - Document title: 36px, font-weight 300, uppercase, letter-spacing 3px
  - Section titles: 17px, font-weight 500, letter-spacing 0.5px
- **Body**: "Montserrat" - clean sans-serif for content
  - Section content: 12px, line-height 1.6
  - UI elements: 14px for buttons and inputs

### Spacing & Layout
- **Container padding**: 0.75in horizontal, 0.6-0.65in vertical for print pages
- **Section spacing**: 24px between sections
- **Small spacing**: 8px for tight groupings
- **Medium spacing**: 16px for component padding
- **Large spacing**: 28px for major separations

### Components

#### Document Title
- Centered, elegant serif typography
- Gold bottom border (1px solid #d4af37)
- Generous padding and spacing

#### Section
- Title in Cormorant Garamond, dark foreground
- Content in Montserrat, slightly lighter foreground
- Content indented (18px left padding)
- Consistent 24px bottom margin

#### Divider
- Decorative symbol (✦) in gold color
- Centered, subtle opacity (0.6)
- Used to separate major document sections

#### Print Layout
- Letter size (8.5" × 11")
- Page breaks handled elegantly
- Shadow removed in print mode
- Clean white background for printing

### Interactions
- Smooth transitions on all interactive elements
- Subtle hover effects on editable sections
- Clear focus states for inputs
- Drag handles visible on hover for reordering

### Visual Principles
1. **Elegance**: Refined typography with generous spacing
2. **Clarity**: Clear hierarchy through font sizes and weights
3. **Simplicity**: Minimal UI that doesn't distract from content
4. **Print-first**: Optimized for beautiful printed output
5. **Timeless**: Classic design that won't feel dated

### Editor Interface
- Clean, distraction-free editing experience
- Split view: editor on left, live preview on right
- Subtle visual cues for editable areas
- Icons from lucide-react for actions
- Minimal toolbar with essential functions

### Responsive Behavior
- Desktop-first design (optimized for document creation)
- Preview scales appropriately on smaller screens
- Mobile: stack editor and preview vertically
