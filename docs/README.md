# ResumeBuilder2026

A full-stack resume builder application built with Next.js, demonstrating authentication, database design, and modern React patterns.

## Live Demo

[Coming Soon](#)

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** NextAuth.js v5
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Validation:** Zod
- **Forms:** React Hook Form
- **Database Hosting:** Neon
- **Deployment:** Vercel

## Features

- GitHub OAuth authentication
- Create, edit, and delete multiple resumes
- Real-time preview while editing
- Drag-and-drop section reordering
- PDF export
- Auto-save functionality

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- GitHub OAuth app credentials
- Neon database (or any PostgreSQL instance)

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
   cp .env.example .env.local
   ```

4. Configure your `.env.local` with:
   ```
   DATABASE_URL="your-neon-connection-string"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   GITHUB_ID="your-github-oauth-app-id"
   GITHUB_SECRET="your-github-oauth-app-secret"
   ```

5. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000)

## Documentation

- [Architecture](docs/ARCHITECTURE.md) — Tech stack decisions, folder structure, design patterns
- [User Flows](docs/USER-FLOWS.md) — How users navigate through the application
- [Database Schema](docs/DATABASE.md) — Data models, relationships, and ERD
- [Authentication](docs/AUTH.md) — NextAuth.js implementation details
- [Components](docs/COMPONENTS.md) — Component inventory and hierarchy

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx prisma studio` | Open Prisma database GUI |
| `npx prisma migrate dev` | Run database migrations |

## Project Status

This project is currently in development. See the [project board](#) for progress.

## License

MIT
