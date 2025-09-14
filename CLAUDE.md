# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a web application for "吱吱连环画" (ZZ Comic Stripe), a platform for creating comic-style stories. The application is built with React 19, TypeScript, and Vite, using Tailwind CSS for styling.

## Key Technologies
- React 19 with TypeScript
- Vite as the build tool
- Tailwind CSS v4 for styling
- Lucide React for icons
- React Router for navigation
- React PageFlip for book flip effect

## Project Structure
- `src/` - Main source code
  - `components/` - React components (Navigation, HeroSection, IOSPage)
  - `contexts/` - React contexts for state management
  - `styles/` - CSS files (theme.css)
- `public/` - Static assets
- `dist/` - Build output

## Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Architecture Notes
- Uses a component-based architecture with React functional components
- Styling is done with Tailwind CSS and custom CSS variables
- Responsive design with mobile-first approach
- Performance optimizations including CSS code splitting and manual chunking
- Accessibility features implemented (ARIA labels, semantic HTML)
- Implements a book flip effect using react-pageflip library
- Uses context API for state management of the flip book functionality
- Navigation uses smooth scrolling that triggers page flips instead of traditional scrolling
- Implements route-aware book flipping with React Router integration
- Mobile-responsive design with different layouts for mobile and desktop

## Deployment
- Base path configured as `/ZZComicStripe_Web/`
- CSS code splitting enabled
- Manual chunking for vendor libraries

## Important Implementation Details
- The book flip effect is implemented using the react-pageflip library
- Each logical page is represented as two physical pages (left and right halves)
- The FlipBookContext provides centralized control over the book flip functionality
- Route changes are synchronized with book page flips
- Mobile devices use a different layout without the book flip effect