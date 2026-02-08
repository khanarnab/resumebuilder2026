# Architecture

This document outlines the technical architecture, design decisions, and folder structure for the ResumeBuilder2026 application.

## Tech Stack Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                              │
│  Next.js 14 (App Router) + React + TypeScript + Tailwind    │
└─────────────────────────────┬───────────────────────────────┘
                              │
┌─────────────────────────────┴───────────────────────────────┐
│                     API Layer                                │
│         Next.js API Routes + Server Actions                  │
└─────────────────────────────┬───────────────────────────────┘
                              │
┌─────────────────────────────┴───────────────────────────────┐
│                   Authentication                             │
│                   NextAuth.js v5                             │
└─────────────────────────────┬───────────────────────────────┘
                              │
┌─────────────────────────────┴───────────────────────────────┐
│                    Data Layer                                │
│              Prisma ORM + PostgreSQL (Neon)                  │
└─────────────────────────────────────────────────────────────┘
```

## Technology Decisions

### Next.js 14 with App Router

**Why:** The App Router provides React Server Components, simplified data fetching, and better performance out of the box. It's the future of Next.js and aligns with modern React patterns.

**Key patterns used:**
- Server Components for data fetching
- Client Components for interactivity
- Server Actions for mutations
- Middleware for auth protection

### TypeScript

**Why:** Type safety catches errors at compile time, improves IDE support, and serves as documentation. Essential for maintainable full-stack applications.

### Tailwind CSS

**Why:** Utility-first CSS enables rapid prototyping and consistent styling. No context switching between files, and the bundle only includes used styles.

### NextAuth.js v5 (Auth.js)

**Why:** Deep learning opportunity. Unlike managed services, NextAuth exposes the full authentication flow including OAuth callbacks, session management, JWT handling, and database integration.

**Key concepts implemented:**
- OAuth 2.0 authorization code flow
- JWT vs database sessions
- CSRF protection
- Secure cookie handling

See [AUTH.md](./AUTH.md) for implementation details.

### PostgreSQL + Prisma

**Why PostgreSQL:** Industry-standard relational database. Resumes have structured, relational data (users → resumes → sections → entries) that maps naturally to SQL.

**Why Prisma:** Type-safe database queries, auto-generated TypeScript types from schema, readable migration files, and excellent developer experience.

### Neon

**Why:** Serverless PostgreSQL with generous free tier. Scales to zero when inactive, provides connection pooling for serverless functions, and requires minimal configuration.

## Folder Structure

```
ResumeBuilder2026/
├── app/                      # Next.js App Router
│   ├── (auth)/               # Auth route group
│   │   └── auth/
│   │       └── signin/
│   │           └── page.tsx
│   ├── (main)/               # Main app route group
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   └── editor/
│   │       └── [id]/
│   │           └── page.tsx
│   ├── api/                  # API routes
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Landing page
│
├── components/               # React components
│   ├── auth/                 # Authentication components
│   │   ├── auth-card.tsx
│   │   ├── oauth-buttons.tsx
│   │   ├── sign-in-form.tsx
│   │   └── user-menu.tsx
│   ├── dashboard/            # Dashboard components
│   │   ├── create-resume-button.tsx
│   │   ├── empty-state.tsx
│   │   ├── resume-card.tsx
│   │   └── resume-list.tsx
│   ├── editor/               # Resume editor components
│   │   ├── editor-layout.tsx
│   │   ├── editor-sidebar.tsx
│   │   ├── resume-preview.tsx
│   │   └── sections/
│   │       ├── contact-info-form.tsx
│   │       ├── education-section.tsx
│   │       ├── experience-section.tsx
│   │       ├── skills-section.tsx
│   │       └── summary-form.tsx
│   ├── landing/              # Landing page components
│   │   ├── cta-section.tsx
│   │   ├── feature-card.tsx
│   │   └── hero.tsx
│   ├── layout/               # Layout components
│   │   ├── container.tsx
│   │   ├── footer.tsx
│   │   ├── navbar.tsx
│   │   └── page-header.tsx
│   └── ui/                   # Reusable UI primitives
│       ├── button.tsx
│       ├── form-field.tsx
│       ├── input.tsx
│       ├── modal.tsx
│       └── toast.tsx
│
├── lib/                      # Utility functions and configs
│   ├── auth.ts               # NextAuth configuration
│   ├── db.ts                 # Prisma client instance
│
├── prisma/                   # Database
│   ├── schema.prisma         # Data models
│   └── migrations/           # Migration history
│
├── types/                    # TypeScript type definitions
│   └── index.ts
│
├── docs/                     # Documentation
│   ├── ARCHITECTURE.md
│   ├── AUTH.md
│   ├── COMPONENTS.md
│   ├── DATABASE.md
│   └── USER-FLOWS.md
│
├── public/                   # Static assets
│
├── .env.example              # Environment variable template
├── .env.local                # Local environment variables (gitignored)
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── package.json
```

## Key Architectural Patterns

### Server Components vs Client Components

**Server Components (default):**
- Data fetching
- Database queries
- Rendering static content
- Accessing backend resources

**Client Components (`"use client"`):**
- Event handlers (onClick, onChange)
- useState, useEffect
- Browser APIs
- Interactive UI elements

### Data Fetching Strategy

```
┌─────────────────┐
│  Server Action  │  ← Mutations (create, update, delete)
└────────┬────────┘
         │
┌────────┴────────┐
│ Server Component │  ← Initial data fetch
└────────┬────────┘
         │
┌────────┴────────┐
│ Client Component │  ← UI state, optimistic updates
└─────────────────┘
```

### Authentication Flow

```
User clicks "Sign in with GitHub"
         │
         ▼
Redirect to GitHub OAuth
         │
         ▼
User authorizes application
         │
         ▼
GitHub redirects to callback URL
         │
         ▼
NextAuth exchanges code for tokens
         │
         ▼
User record created/updated in database
         │
         ▼
Session cookie set
         │
         ▼
Redirect to dashboard
```

## Performance Considerations

1. **Server Components:** Reduce client-side JavaScript by rendering on the server
2. **Connection Pooling:** Neon provides pooled connections for serverless functions
3. **Image Optimization:** Next.js Image component for optimized loading
4. **Code Splitting:** Automatic via Next.js App Router

## Security Measures

1. **CSRF Protection:** Built into NextAuth
2. **SQL Injection:** Prisma parameterizes all queries
3. **XSS Prevention:** React escapes content by default
4. **Environment Variables:** Secrets never exposed to client
5. **Auth Middleware:** Protects routes at the edge
