# Design Document

## Overview

The Shadcn Portfolio Rewrite will transform the existing static HTML portfolio into a modern, component-based Next.js application using Shadcn UI components. The design follows a clean, professional layout with excellent typography, proper spacing, and smooth interactions. The application will be built in a separate `shadcn-portfolio` directory to maintain isolation from the existing static site.

## Architecture

### Technology Stack
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript for type safety
- **UI Library**: Shadcn UI components built on Radix UI primitives
- **Styling**: Tailwind CSS (required by Shadcn UI)
- **Theme Management**: next-themes for dark/light mode
- **Icons**: Lucide React (default with Shadcn UI)
- **Image Optimization**: Next.js Image component

### Project Structure
```
shadcn-portfolio/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── favicon.ico
├── components/
│   ├── ui/           # Shadcn UI components
│   ├── sections/     # Page sections
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
├── lib/
│   └── utils.ts
├── public/
│   └── assets/       # Certification images, dev card
├── package.json
├── tailwind.config.js
├── components.json   # Shadcn UI config
└── tsconfig.json
```

## Components and Interfaces

### Core Shadcn UI Components Used
- **Card**: For section containers (About Me, Links, Certifications)
- **Button**: For theme toggle and interactive elements
- **Badge**: For certification display
- **Separator**: For visual section breaks
- **Container/Grid**: For responsive layout
- **Typography**: Consistent text styling

### Custom Components

#### ThemeProvider
```typescript
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: string;
  storageKey?: string;
}
```

#### ThemeToggle
```typescript
interface ThemeToggleProps {
  className?: string;
}
```

#### Section Components
```typescript
interface AboutSectionProps {
  className?: string;
}

interface LinksSectionProps {
  className?: string;
}

interface CertificationsSectionProps {
  className?: string;
}
```

### Layout Design

#### Header Section
- Gradient background using CSS variables for theme compatibility
- Flexbox layout with name/title on left, theme toggle center, dev card on right
- Responsive design that stacks vertically on mobile
- Dev card with hover effects using Shadcn UI Card component

#### Main Content Grid
- CSS Grid layout with 2 columns on desktop, 1 column on mobile
- Equal height cards using Shadcn UI Card components
- Consistent spacing using Tailwind CSS spacing scale
- Responsive breakpoints: mobile (<768px), tablet (768px-1024px), desktop (>1024px)

#### Footer
- Centered GitHub follow badge
- Shadcn UI Card styling for consistency

## Data Models

### Portfolio Data Structure
```typescript
interface AboutItem {
  icon: string;
  text: string;
  link?: string;
}

interface ExternalLink {
  icon: string;
  title: string;
  url: string;
  description?: string;
}

interface Certification {
  id: string;
  title: string;
  imageUrl: string;
  credlyUrl: string;
  alt: string;
}

interface PortfolioData {
  personalInfo: {
    name: string;
    devCardUrl: string;
  };
  about: AboutItem[];
  links: ExternalLink[];
  certifications: Certification[];
}
```

## Error Handling

### Image Loading
- Next.js Image component with proper fallbacks
- Loading states for certification images
- Error boundaries for component failures
- Graceful degradation for missing images

### Theme Management
- Fallback to system theme if stored preference fails
- Error handling for localStorage access
- Default light theme as ultimate fallback

### External Links
- Proper `target="_blank"` and `rel="noopener noreferrer"` for security
- Error handling for malformed URLs
- Visual indicators for external links

## Testing Strategy

### Unit Testing
- Component rendering tests using React Testing Library
- Theme toggle functionality tests
- Responsive behavior tests
- Accessibility tests for keyboard navigation and screen readers

### Integration Testing
- Theme persistence across page reloads
- Image loading and optimization
- External link functionality
- Mobile responsive behavior

### Visual Testing
- Screenshot comparisons for different themes
- Cross-browser compatibility testing
- Mobile device testing

### Performance Testing
- Lighthouse performance audits
- Core Web Vitals monitoring
- Bundle size analysis
- Image optimization verification

## Theme Implementation

### CSS Variables Structure
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* Additional Shadcn UI theme variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  /* Dark theme overrides */
}
```

### Custom Gradient Header
- CSS custom properties for theme-aware gradients
- Smooth transitions between light and dark modes
- Fallback colors for older browsers

## Accessibility Considerations

### Keyboard Navigation
- Proper tab order for all interactive elements
- Focus indicators using Shadcn UI focus styles
- Skip links for screen readers

### Screen Reader Support
- Semantic HTML structure
- Proper ARIA labels for interactive elements
- Alt text for all images including certifications

### Color Contrast
- WCAG AA compliance for all text/background combinations
- High contrast mode support
- Color-blind friendly design choices

## Performance Optimizations

### Next.js Features
- Static generation for optimal loading speed
- Image optimization for certification badges and dev card
- Automatic code splitting
- Font optimization for Google Fonts

### Bundle Optimization
- Tree shaking for unused Shadcn UI components
- Dynamic imports where appropriate
- Minimal JavaScript for static content

### Caching Strategy
- Static asset caching
- Theme preference caching in localStorage
- Service worker for offline functionality (optional)