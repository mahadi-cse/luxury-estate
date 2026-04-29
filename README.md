# LuxeEstate BD — Real Estate Platform

A modern, full-featured real estate website built for the Bangladeshi market. Includes a public-facing property listing site and an admin panel for managing properties, site theme, and branding.

## Tech Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript** (types & data) + **JSX** (components & pages)
- **Tailwind CSS 4**
- **Framer Motion** (animations)

No third-party UI libraries — pure Tailwind CSS.

## Project Structure

```
├── client/                         # Next.js frontend
│   ├── app/                        # App Router pages
│   │   ├── page.jsx                # Home
│   │   ├── buy/                    # Properties for sale
│   │   ├── rent/                   # Properties for rent
│   │   ├── sell/                   # Sell your property
│   │   ├── agents/                 # Agent listing
│   │   ├── list-property/          # Public listing form
│   │   ├── properties/[id]/        # Property detail
│   │   └── admin/                  # Admin panel
│   │       ├── page.jsx            # Dashboard
│   │       ├── properties/         # CRUD management
│   │       └── settings/           # Theme & logo
│   ├── components/
│   │   ├── common/                 # Shared (Navbar, Footer, PageHero)
│   │   └── module/
│   │       ├── admin/              # Admin components
│   │       └── public/
│   │           ├── home/           # Homepage sections
│   │           └── property/       # Property detail components
│   └── lib/
│       ├── types/                  # TypeScript interfaces
│       ├── data/                   # Mock data
│       └── context/                # React Context (state management)
└── server/                         # Backend (not yet implemented)
```

## Features

### Public Site
- Responsive homepage with hero, search bar, featured properties, stats, and agent section
- Property detail pages with image gallery (arrow navigation + thumbnails), conditional building/apartment info
- Dedicated pages for Buy, Rent, Sell, Agents, and List Property
- BDT currency formatting with lakh/crore shorthand
- Framer Motion scroll animations throughout

### Admin Panel (`/admin`)
- **Dashboard** — property stats overview and quick actions
- **Property Management** — add, edit, delete properties with category-specific fields (building: floors/units/developer, apartment: floor/facing/furnishing)
- **Image Upload** — drag-and-drop uploader with local blob preview (server upload ready when backend is built)
- **Site Settings** — primary color picker with presets, logo text editor, live preview
- All changes persist in localStorage and reflect on the public site immediately

### Theme System
- Admin-controlled primary color applied site-wide via CSS variable (`--color-primary`)
- Dynamic logo text (accent word + main word) used in Navbar, Footer, and admin sidebar
- Hydration-safe: defaults on server render, localStorage values applied after mount

## Getting Started

```bash
cd client
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site and [http://localhost:3000/admin](http://localhost:3000/admin) for the admin panel.

## Build

```bash
npm run build
npm start
```

## Notes

- All data is mock — no backend API calls. Properties and settings are stored in localStorage.
- The `server/` directory is a placeholder for the future backend.
- Images use Unsplash URLs. The admin image uploader creates local blob URLs for preview; actual upload will connect to the server once built.
