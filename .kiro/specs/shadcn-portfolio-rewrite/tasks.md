# Implementation Plan

- [ ] 1. Set up Next.js project structure and Shadcn UI configuration
  - Create new `shadcn-portfolio` directory with Next.js 14+ TypeScript project
  - Install and configure Shadcn UI with Tailwind CSS
  - Set up project structure with proper directories (components, lib, app)
  - Configure components.json for Shadcn UI customization
  - _Requirements: 5.1, 5.2, 5.5_

- [ ] 2. Install and configure required Shadcn UI components
  - Install Card, Button, Badge, Separator components via Shadcn CLI
  - Install next-themes for theme management
  - Install Lucide React for icons
  - Configure Tailwind CSS with Shadcn UI theme variables
  - _Requirements: 1.1, 3.1, 3.4_

- [ ] 3. Create theme provider and theme toggle components
  - Implement ThemeProvider component wrapping the application
  - Create ThemeToggle component with sun/moon icons and smooth transitions
  - Add theme persistence using localStorage
  - Implement system theme detection as default
  - _Requirements: 3.1, 3.2, 3.3_

- [ ] 4. Create portfolio data structure and constants
  - Define TypeScript interfaces for portfolio data (AboutItem, ExternalLink, Certification)
  - Create constants file with all portfolio content (about items, links, certifications)
  - Implement proper typing for all data structures
  - _Requirements: 2.1, 2.2, 2.3, 5.3_

- [ ] 5. Implement main layout and header section
  - Create app/layout.tsx with ThemeProvider and global styles
  - Implement header component with gradient background and responsive design
  - Add dev card image with Next.js Image optimization and hover effects
  - Position theme toggle in header with proper styling
  - _Requirements: 1.2, 4.1, 4.2, 6.2_

- [ ] 6. Create About Me section component
  - Build AboutSection component using Shadcn UI Card
  - Implement responsive list layout with icons and text
  - Add contact email link with proper external link handling
  - Style with consistent typography and spacing
  - _Requirements: 2.1, 2.4_

- [ ] 7. Create Links section component
  - Build LinksSection component using Shadcn UI Card
  - Implement external links with proper target="_blank" and security attributes
  - Add icons for each link type using Lucide React
  - Ensure all links open in new tabs as specified
  - _Requirements: 2.2, 2.4_

- [ ] 8. Create Certifications section component
  - Build CertificationsSection component using Shadcn UI Card
  - Implement responsive grid layout for certification badges
  - Use Next.js Image component for certification images with optimization
  - Add hover effects and proper alt text for accessibility
  - Link each certification to respective Credly URLs
  - _Requirements: 2.3, 2.4, 6.2_

- [ ] 9. Implement responsive grid layout for main content
  - Create CSS Grid layout with 2 columns on desktop, 1 column on mobile
  - Ensure equal height cards across the grid
  - Implement proper breakpoints for tablet and mobile views
  - Test responsive behavior across different screen sizes
  - _Requirements: 1.2, 1.3_

- [ ] 10. Create footer component with GitHub badge
  - Implement footer component using Shadcn UI Card styling
  - Add GitHub followers badge with proper external link handling
  - Center align footer content with consistent spacing
  - _Requirements: 2.4_

- [ ] 11. Implement main page component integrating all sections
  - Create app/page.tsx as the main portfolio page
  - Integrate all section components (About, Links, Certifications, Footer)
  - Implement proper component composition and props passing
  - Ensure proper TypeScript typing throughout
  - _Requirements: 1.1, 5.3_

- [ ] 12. Add global styles and theme-aware CSS variables
  - Configure globals.css with Shadcn UI theme variables
  - Implement custom gradient styles for header background
  - Add smooth transitions for theme switching
  - Ensure proper dark mode styling for all components
  - _Requirements: 3.4, 1.3_

- [ ] 13. Optimize images and implement Next.js Image component
  - Copy certification images to public/assets directory
  - Implement Next.js Image component for dev card and certifications
  - Configure proper image sizing and optimization
  - Add loading states and error handling for images
  - _Requirements: 6.1, 6.2, 6.3_

- [ ] 14. Add error handling and accessibility features
  - Implement error boundaries for component failures
  - Add proper ARIA labels and semantic HTML structure
  - Ensure keyboard navigation works for all interactive elements
  - Test screen reader compatibility
  - _Requirements: 1.3, 6.4_

- [ ] 15. Write unit tests for core components
  - Create tests for ThemeToggle component functionality
  - Test theme persistence and system theme detection
  - Write tests for responsive behavior of main sections
  - Test external link functionality and security attributes
  - _Requirements: 5.3_

- [ ] 16. Perform final integration and performance testing
  - Test complete application functionality across different browsers
  - Verify theme switching works correctly in all sections
  - Run Lighthouse performance audit and optimize as needed
  - Test mobile responsiveness on actual devices
  - Verify all external links and certifications work correctly
  - _Requirements: 6.1, 6.3, 6.4_