# Database Schema

This document describes the data models, relationships, and design decisions for the ResumeBuilder2026 database.

## Entity Relationship Diagram

```mermaid
erDiagram
    User ||--o{ Resume : owns
    User ||--o{ Account : has
    User ||--o{ Session : has
    Resume ||--|| ContactInfo : has
    Resume ||--o| Summary : has
    Resume ||--o{ Experience : contains
    Resume ||--o{ Education : contains
    Resume ||--o{ Skill : contains
    Resume ||--o{ Project : contains

    User {
        string id PK
        string email UK
        string name
        string image
        datetime emailVerified
        datetime createdAt
        datetime updatedAt
    }

    Account {
        string id PK
        string userId FK
        string type
        string provider
        string providerAccountId
        string refresh_token
        string access_token
        int expires_at
        string token_type
        string scope
        string id_token
    }

    Session {
        string id PK
        string sessionToken UK
        string userId FK
        datetime expires
    }

    Resume {
        string id PK
        string userId FK
        string title
        datetime createdAt
        datetime updatedAt
    }

    ContactInfo {
        string id PK
        string resumeId FK UK
        string fullName
        string email
        string phone
        string location
        string linkedin
        string github
        string website
    }

    Summary {
        string id PK
        string resumeId FK UK
        text content
    }

    Experience {
        string id PK
        string resumeId FK
        string company
        string position
        string location
        date startDate
        date endDate
        boolean current
        text description
        int sortOrder
    }

    Education {
        string id PK
        string resumeId FK
        string institution
        string degree
        string field
        date startDate
        date endDate
        text description
        int sortOrder
    }

    Skill {
        string id PK
        string resumeId FK
        string name
        int sortOrder
    }

    Project {
        string id PK
        string resumeId FK
        string name
        string url
        text description
        int sortOrder
    }
```

## Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// NextAuth.js Required Models
// ============================================

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  image         String?
  emailVerified DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts Account[]
  sessions Session[]
  resumes  Resume[]
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

// ============================================
// Application Models
// ============================================

model Resume {
  id        String   @id @default(cuid())
  userId    String
  title     String   @default("Untitled Resume")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user        User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  contactInfo ContactInfo?
  summary     Summary?
  experiences Experience[]
  education   Education[]
  skills      Skill[]
  projects    Project[]

  @@index([userId])
}

model ContactInfo {
  id       String  @id @default(cuid())
  resumeId String  @unique
  fullName String?
  email    String?
  phone    String?
  location String?
  linkedin String?
  github   String?
  website  String?

  resume Resume @relation(fields: [resumeId], references: [id], onDelete: Cascade)
}

model Summary {
  id       String @id @default(cuid())
  resumeId String @unique
  content  String @db.Text

  resume Resume @relation(fields: [resumeId], references: [id], onDelete: Cascade)
}

model Experience {
  id          String    @id @default(cuid())
  resumeId    String
  company     String
  position    String
  location    String?
  startDate   DateTime?
  endDate     DateTime?
  current     Boolean   @default(false)
  description String?   @db.Text
  sortOrder   Int       @default(0)

  resume Resume @relation(fields: [resumeId], references: [id], onDelete: Cascade)

  @@index([resumeId])
}

model Education {
  id          String    @id @default(cuid())
  resumeId    String
  institution String
  degree      String
  field       String?
  startDate   DateTime?
  endDate     DateTime?
  description String?   @db.Text
  sortOrder   Int       @default(0)

  resume Resume @relation(fields: [resumeId], references: [id], onDelete: Cascade)

  @@index([resumeId])
}

model Skill {
  id        String @id @default(cuid())
  resumeId  String
  name      String
  sortOrder Int    @default(0)

  resume Resume @relation(fields: [resumeId], references: [id], onDelete: Cascade)

  @@index([resumeId])
}

model Project {
  id          String  @id @default(cuid())
  resumeId    String
  name        String
  url         String?
  description String? @db.Text
  sortOrder   Int     @default(0)

  resume Resume @relation(fields: [resumeId], references: [id], onDelete: Cascade)

  @@index([resumeId])
}
```

## Model Descriptions

### NextAuth.js Models

These models are required by NextAuth.js for authentication. Do not modify their structure.

| Model | Purpose |
|-------|---------|
| `User` | Core user identity, extended with app-specific fields |
| `Account` | OAuth provider connections (GitHub, Google, etc.) |
| `Session` | Active user sessions (if using database sessions) |
| `VerificationToken` | Email verification tokens (if using email auth) |

### Application Models

| Model | Purpose |
|-------|---------|
| `Resume` | Container for a complete resume, belongs to a user |
| `ContactInfo` | Personal contact details (one per resume) |
| `Summary` | Professional summary text (one per resume) |
| `Experience` | Work history entries (many per resume) |
| `Education` | Academic history entries (many per resume) |
| `Skill` | Individual skill tags (many per resume) |
| `Project` | Portfolio projects (many per resume) |

## Relationships

### One-to-Many

```
User → Resume         (one user can have many resumes)
Resume → Experience   (one resume can have many experiences)
Resume → Education    (one resume can have many education entries)
Resume → Skill        (one resume can have many skills)
Resume → Project      (one resume can have many projects)
```

### One-to-One

```
Resume → ContactInfo  (each resume has exactly one contact info)
Resume → Summary      (each resume has at most one summary)
```

## Design Decisions

### Why Separate Tables for Resume Sections?

**Alternative considered:** Store all resume data as JSON in a single `content` column.

**Decision:** Use separate tables with proper relationships.

**Reasons:**
1. **Type safety:** Prisma generates types for each model
2. **Querying:** Can query/filter individual sections (e.g., find resumes with specific skills)
3. **Validation:** Database enforces structure
4. **Performance:** Can load sections independently if needed
5. **Indexing:** Can add indexes on specific fields

### Why `sortOrder` on List Items?

Users can drag-and-drop to reorder experiences, education, etc. The `sortOrder` field tracks this order.

**Update pattern:**
```typescript
// When reordering, update affected items
await prisma.$transaction([
  prisma.experience.update({ where: { id: 'a' }, data: { sortOrder: 1 } }),
  prisma.experience.update({ where: { id: 'b' }, data: { sortOrder: 0 } }),
]);
```

### Why `onDelete: Cascade`?

When a user or resume is deleted, all related data should be deleted automatically:
- Delete user → Delete all their resumes, accounts, sessions
- Delete resume → Delete all sections (contact, experience, etc.)

This prevents orphaned data and simplifies deletion logic.

### Why `cuid()` for IDs?

CUIDs (Collision-resistant Unique IDentifiers) are:
- URL-safe (no special characters)
- Sortable by creation time
- Unique across distributed systems
- Harder to guess than sequential IDs

## Common Queries

### Get User's Resumes (Dashboard)

```typescript
const resumes = await prisma.resume.findMany({
  where: { userId: session.user.id },
  orderBy: { updatedAt: 'desc' },
  select: {
    id: true,
    title: true,
    updatedAt: true,
  },
});
```

### Get Full Resume (Editor)

```typescript
const resume = await prisma.resume.findUnique({
  where: { id: resumeId },
  include: {
    contactInfo: true,
    summary: true,
    experiences: { orderBy: { sortOrder: 'asc' } },
    education: { orderBy: { sortOrder: 'asc' } },
    skills: { orderBy: { sortOrder: 'asc' } },
    projects: { orderBy: { sortOrder: 'asc' } },
  },
});
```

### Create New Resume

```typescript
const resume = await prisma.resume.create({
  data: {
    userId: session.user.id,
    title: 'My Resume',
    contactInfo: {
      create: {}, // Empty contact info
    },
  },
});
```

### Verify Resume Ownership

```typescript
const resume = await prisma.resume.findFirst({
  where: {
    id: resumeId,
    userId: session.user.id, // Must belong to current user
  },
});

if (!resume) {
  throw new Error('Not found');
}
```

## Indexes

Indexes are added for frequently queried foreign keys:

```prisma
@@index([userId])   // On Resume - find user's resumes
@@index([resumeId]) // On sections - find resume's content
```

## Database Migrations

### Initial Migration

```bash
npx prisma migrate dev --name init
```

### Adding a New Field

1. Update `schema.prisma`
2. Run migration:
   ```bash
   npx prisma migrate dev --name add_field_name
   ```
3. Migration file is created in `prisma/migrations/`

### Viewing Data

```bash
npx prisma studio
```

Opens a web UI to browse and edit database records.
