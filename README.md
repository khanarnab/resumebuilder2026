# ResumeBuilder2026

A full-stack resume builder application built with Next.js, demonstrating authentication, database design, and modern React patterns.

## Live Demo

[resumebuilder2026.vercel.app](https://resumebuilder2026.vercel.app)

## Features

- **GitHub Authentication** — Secure sign-in with OAuth 2.0
- **Multiple Resumes** — Create and manage multiple resumes
- **Real-time Preview** — See your resume as you build it
- **PDF Export** — Download your resume as a professionally formatted PDF
- **Auto-save** — Data persists as you edit each section
- **Responsive Editor** — Sidebar navigation with section-based editing

### Resume Sections

- Contact Information
- Professional Summary
- Work Experience (multiple entries)
- Education (multiple entries)
- Skills
- Projects (multiple entries)

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Authentication | NextAuth.js v5 |
| Database | PostgreSQL |
| ORM | Prisma |
| PDF Generation | @react-pdf/renderer |
| Database Hosting | Neon |
| Deployment | Vercel |

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- GitHub OAuth app credentials
- PostgreSQL database (Neon recommended)

### Installation

1. Clone the repository:
```bash
   git clone https://github.com/yourusername/ResumeBuilder2026.git
   cd ResumeBuilder2026
```

2. Install dependencies:
```bash
   npm install
```

3. Set up environment variables:
```bash
   cp .env.example .env
```

4. Configure your `.env` with:
```
   DATABASE_URL="your-neon-connection-string"
   NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
   NEXTAUTH_URL="http://localhost:3000"
   GITHUB_ID="your-github-oauth-app-id"
   GITHUB_SECRET="your-github-oauth-app-secret"
```

5. Generate Prisma client and run migrations:
```bash
   npx prisma generate
   npx prisma db push
```

6. Start the development server:
```bash
   npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000)

## Project Structure
```
ResumeBuilder2026/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── api/auth/         # NextAuth.js API routes
│   │   ├── auth/signin/      # Sign-in page
│   │   ├── dashboard/        # Resume list page
│   │   └── editor/[id]/      # Resume editor page
│   ├── components/
│   │   ├── editor/           # Editor components
│   │   ├── landing/          # Landing page components
│   │   └── layout/           # Layout components
│   └── lib/
│       ├── actions.ts        # Server actions
│       ├── auth.ts           # NextAuth configuration
│       └── db.ts             # Prisma client
├── prisma/
│   └── schema.prisma         # Database schema
└── docs/                     # Documentation
```

## Documentation

- [Architecture](docs/ARCHITECTURE.md) — Tech stack decisions and design patterns
- [User Flows](docs/USER-FLOWS.md) — Application user journeys
- [Database Schema](docs/DATABASE.md) — Data models and relationships
- [Authentication](docs/AUTH.md) — NextAuth.js implementation
- [Components](docs/COMPONENTS.md) — Component inventory

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx prisma studio` | Open database GUI |
| `npx prisma db push` | Push schema to database |

## License

MIT