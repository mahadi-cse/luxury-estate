# LuxeEstate BD — Full-Stack Real Estate Platform

A modern, full-featured real estate website built for the Bangladeshi market. Includes a public-facing property listing site, a comprehensive admin panel for managing properties, site theme, branding, and a robust Express/PostgreSQL backend API.

## Tech Stack

### Frontend (Client)
- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript** & **JSX**
- **Tailwind CSS 4** (Pure CSS, no third-party UI libraries)
- **Framer Motion** (animations)

### Backend (Server)
- **Node.js** & **Express.js**
- **PostgreSQL** (Database)
- **Prisma ORM (v7)** (with `@prisma/adapter-pg` & connection pooling)
- **Multer** (File uploads)

## System Architecture

```mermaid
flowchart TD
    Client_Public["🌍 Public Site (Next.js)"]
    Client_Admin["🛠️ Admin Panel (Next.js)"]
    
    Server_API["🔌 Express API Router"]
    Server_Modules["📦 Feature Modules"]
    Server_Prisma["⚙️ Prisma ORM"]
    
    DB_Postgres[("🐘 PostgreSQL DB")]

    Client_Public -->|"REST (JSON)"| Server_API
    Client_Admin -->|"REST (JSON)"| Server_API
    
    Server_API --> Server_Modules
    Server_Modules --> Server_Prisma
    Server_Prisma -->|"Prisma Client"| DB_Postgres

    classDef normalStyle stroke:#4f46e5,stroke-width:2px,fill:#e0e7ff,color:#1e1b4b;
    classDef successStyle stroke:#10b981,stroke-width:2px,fill:#d1fae5,color:#064e3b;
    classDef dbStyle stroke:#f59e0b,stroke-width:2px,fill:#fef3c7,color:#78350f;

    class Client_Public,Client_Admin normalStyle;
    class Server_API,Server_Modules,Server_Prisma successStyle;
    class DB_Postgres dbStyle;
```

## Project Structure

```text
├── client/                         # Next.js frontend
│   ├── app/                        # App Router pages (Public & Admin)
│   ├── components/                 # Shared & Module-specific React components
│   └── lib/                        # TypeScript types, context, API client config
└── server/                         # Express backend API
    ├── prisma/                     # Database schema & seed scripts
    ├── src/
    │   ├── config/                 # DB connections
    │   ├── middleware/             # Error handling & file upload config
    │   ├── modules/                # Feature modules (Property, Customer, Sale, Agent, etc.)
    │   └── utils/                  # API response formatting
    └── uploads/                    # Local storage for uploaded images
```

## Features

### Public Site
- Responsive homepage with hero, search bar, featured properties, stats, and agent section.
- Property detail pages with image gallery, and dynamic building/apartment specific details.
- Dedicated pages for Buy, Rent, Sell, Agents, and List Property submissions.
- BDT currency formatting with lakh/crore shorthand.

### Admin Panel (`/admin`)
- **Dashboard** — Property stats overview, sales revenue, and quick actions.
- **Property Management** — CRUD operations for properties, building specifics, and apartment features.
- **Customer & Sales Management** — Track payments, rent, and purchase history.
- **Image Upload** — Drag-and-drop uploader connecting directly to the server endpoint.
- **Site Settings** — Primary color picker with presets and dynamic text/image logo settings.

### API & Database
- Modular RESTful API built on Express.
- 9 dedicated business modules: `Property`, `Customer`, `Sale`, `Agent`, `Settings`, `Contact`, `Listing Request`, `Upload`, and `Dashboard`.
- Relational database schema handling complex one-to-one and one-to-many associations (e.g., properties to sales, customers to payments).

## Getting Started

### 1. Database Setup
Ensure you have PostgreSQL running locally (or remotely) and a database created (e.g., `luxe_estate`).

### 2. Server Setup (Backend)
```bash
cd server
npm install
```

Configure your `.env` file in the `server` directory:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/luxe_estate?schema=public"
PORT=5000
```

Run database migrations and seed data:
```bash
npm run db:push
npm run db:seed
npm run dev
```
The API server will run at `http://localhost:5000`.

### 3. Client Setup (Frontend)
Open a new terminal session.
```bash
cd client
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) for the public site and [http://localhost:3000/admin](http://localhost:3000/admin) for the admin panel.
