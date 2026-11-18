# Wedding Invitation Project Guide

## Overview
This repository contains the digital wedding invitation website for Lokeshwari Devi & Shiva Kumar (Bride's family invitation).

## Key Architecture & Conventions

### Event Details
- Keep all wedding facts, venue details, and countdown calculations in `src/config/weddingDetails.ts` so event information has a single editable source of truth.

### Design & Styling
- The design uses custom semantic color tokens defined in `src/styles.css` along with Tailwind CSS.
- The color palette is centered around traditional festive tones: auspicious crimson/maroon, deep gold, ivory/cream, and warm bronze.
- Designed with mobile-first responsiveness, graceful motion reductions for accessibility (`useReducedMotion`), and traditional Telugu motifs.

### Artwork & Assets
- Wedding illustrations (`*.webp`) are stored directly in `src/assets/wedding/` and imported via `src/assets/wedding/artwork.ts`.
- The site favicon is hosted in `public/favicon.svg` and `public/favicon.ico`.

### Page Flow
- Single scrolling index route with an interactive opening reveal state (`src/components/wedding-invitation.tsx`).
