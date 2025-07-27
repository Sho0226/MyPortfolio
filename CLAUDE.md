# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.3.4 portfolio website bootstrapped with `create-next-app`. It uses the App Router architecture and TypeScript.

## Development Commands

- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check code quality

## Code Formatting

This project uses Prettier for automatic code formatting. Files are automatically formatted on save according to Prettier configuration. Key formatting rules:
- Double quotes for strings
- Semicolons included
- 2 spaces for indentation
- Trailing commas where valid

## Usage Monitoring

When users ask about token usage, remaining credits, or usage limits, run:
```bash
npx ccusage@latest
```

This command provides detailed information about Claude Code usage and remaining limits.

## Architecture

### Tech Stack

- **Framework**: Next.js 15.3.4 with App Router
- **Language**: TypeScript with strict mode enabled
- **Styling**: CSS Modules (see `page.module.css`)
- **Fonts**: Geist and Geist Mono from `next/font/google`

### Project Structure

- `src/app/` - App Router pages and layouts
  - `layout.tsx` - Root layout with font configuration
  - `page.tsx` - Homepage component
  - `globals.css` - Global styles
  - `page.module.css` - Homepage-specific styles
- `public/` - Static assets (SVG icons)
- `tsconfig.json` - TypeScript configuration with path mapping (`@/*` → `./src/*`)

### Key Patterns

- Uses Next.js Image component for optimized images
- CSS Modules for component-scoped styling
- TypeScript with strict type checking enabled
- Path aliases configured for cleaner imports (`@/`)

## Development Notes

The main page is currently the default Next.js welcome page. When developing new features:

- Follow the existing CSS Modules pattern for styling
- Use the Next.js Image component for images
- Maintain TypeScript strict mode compliance
- Primary entry point for content changes is `src/app/page.tsx`
