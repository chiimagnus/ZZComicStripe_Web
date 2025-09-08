# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a web application for "吱吱连环画" (ZZ Comic Stripe), a platform for creating comic-style stories. The application is built with React 19, TypeScript, and Vite, using Tailwind CSS for styling.

## Key Technologies
- React 19 with TypeScript
- Vite as the build tool
- Tailwind CSS v4 for styling
- Lucide React for icons

## Project Structure
- `src/` - Main source code
  - `components/` - React components (Navigation, HeroSection, IOSPage)
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

## Deployment
- Base path configured as `/ZZComicStripe_Web/`
- CSS code splitting enabled
- Manual chunking for vendor libraries