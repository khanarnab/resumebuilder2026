# Components

This document provides an inventory of all React components in the ResumeBuilder2026 application, organized by feature area.

## Component Hierarchy

```
App
├── RootLayout
│   ├── Navbar
│   │   ├── Logo
│   │   ├── NavLinks
│   │   └── UserMenu / SignInButton
│   │
│   ├── [Page Content]
│   │
│   └── Footer
│
├── Landing Page (/)
│   ├── Hero
│   ├── FeatureList
│   │   └── FeatureCard (×3)
│   └── CTASection
│
├── Dashboard (/dashboard)
│   ├── PageHeader
│   ├── CreateResumeButton
│   ├── ResumeList
│   │   └── ResumeCard (×n)
│   └── EmptyState (conditional)
│
├── Editor (/editor/[id])
│   └── EditorLayout
│       ├── EditorSidebar
│       ├── [Active Section Form]
│       │   ├── ContactInfoForm
│       │   ├── SummaryForm
│       │   ├── ExperienceSection
│       │   │   └── ExperienceItem (×n)
│       │   ├── EducationSection
│       │   │   └── EducationItem (×n)
│       │   ├── SkillsSection
│       │   └── ProjectsSection
│       │       └── ProjectItem (×n)
│       └── ResumePreview
│
└── Auth (/auth/signin)
    └── AuthCard
        └── OAuthButtons
```

## Component Inventory

### Layout Components

Core structural components used across all pages.

| Component | File | Description |
|-----------|------|-------------|
| `RootLayout` | `app/layout.tsx` | HTML structure, providers, global styles |
| `Navbar` | `components/layout/navbar.tsx` | Top navigation bar |
| `Footer` | `components/layout/footer.tsx` | Site footer |
| `Container` | `components/layout/container.tsx` | Max-width content wrapper |
| `PageHeader` | `components/layout/page-header.tsx` | Page title and description |

#### Navbar

```typescript
// components/layout/navbar.tsx
interface NavbarProps {
  // No props - uses session internally
}

// Features:
// - Logo linking to home
// - Navigation links
// - Auth state: shows UserMenu when logged in, SignInButton when not
```

#### Container

```typescript
// components/layout/container.tsx
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

// Usage:
<Container>
  <PageContent />
</Container>
```

#### PageHeader

```typescript
// components/layout/page-header.tsx
interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode; // Optional button/action on the right
}

// Usage:
<PageHeader 
  title="My Resumes" 
  description="Manage your resume collection"
  action={<CreateResumeButton />}
/>
```

---

### Authentication Components

Components for the sign-in flow.

| Component | File | Description |
|-----------|------|-------------|
| `AuthCard` | `components/auth/auth-card.tsx` | Centered card wrapper for auth forms |
| `OAuthButtons` | `components/auth/oauth-buttons.tsx` | Social sign-in buttons |
| `SignInForm` | `components/auth/sign-in-form.tsx` | Email/password form (if using credentials) |
| `UserMenu` | `components/auth/user-menu.tsx` | Dropdown with user info and sign out |
| `SignInButton` | `components/auth/sign-in-button.tsx` | Simple sign-in link/button |

#### AuthCard

```typescript
// components/auth/auth-card.tsx
interface AuthCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

// Usage:
<AuthCard title="Welcome Back" description="Sign in to continue">
  <OAuthButtons />
</AuthCard>
```

#### UserMenu

```typescript
// components/auth/user-menu.tsx
// Client component - uses useSession

// Features:
// - User avatar
// - User name/email
// - Dropdown menu with:
//   - Dashboard link
//   - Settings link (future)
//   - Sign out button
```

---

### Dashboard Components

Components for managing resumes.

| Component | File | Description |
|-----------|------|-------------|
| `ResumeList` | `components/dashboard/resume-list.tsx` | Grid of resume cards |
| `ResumeCard` | `components/dashboard/resume-card.tsx` | Single resume preview card |
| `CreateResumeButton` | `components/dashboard/create-resume-button.tsx` | Button to create new resume |
| `EmptyState` | `components/dashboard/empty-state.tsx` | Shown when user has no resumes |
| `DeleteResumeDialog` | `components/dashboard/delete-resume-dialog.tsx` | Confirmation modal |

#### ResumeCard

```typescript
// components/dashboard/resume-card.tsx
interface ResumeCardProps {
  resume: {
    id: string;
    title: string;
    updatedAt: Date;
  };
  onDelete: (id: string) => void;
}

// Features:
// - Title (editable inline)
// - Last updated timestamp
// - Click to open editor
// - Menu with: Edit, Duplicate, Delete
```

#### EmptyState

```typescript
// components/dashboard/empty-state.tsx
interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

// Default usage:
<EmptyState
  title="No resumes yet"
  description="Create your first resume to get started"
  action={<CreateResumeButton />}
/>
```

---

### Editor Components

The resume editing interface.

| Component | File | Description |
|-----------|------|-------------|
| `EditorLayout` | `components/editor/editor-layout.tsx` | Two-column editor layout |
| `EditorSidebar` | `components/editor/editor-sidebar.tsx` | Section navigation |
| `ResumePreview` | `components/editor/resume-preview.tsx` | Live preview panel |
| `PreviewControls` | `components/editor/preview-controls.tsx` | Zoom, download buttons |
| `SaveIndicator` | `components/editor/save-indicator.tsx` | Auto-save status display |

#### EditorLayout

```typescript
// components/editor/editor-layout.tsx
interface EditorLayoutProps {
  resume: FullResume; // Resume with all relations
}

// Structure:
// ┌──────────────────────────────────────────────┐
// │ Header: Resume title, Back button, Download  │
// ├─────────┬──────────────────┬─────────────────┤
// │ Sidebar │   Section Form   │    Preview      │
// │         │                  │                 │
// └─────────┴──────────────────┴─────────────────┘
```

#### EditorSidebar

```typescript
// components/editor/editor-sidebar.tsx
interface EditorSidebarProps {
  activeSection: SectionType;
  onSectionChange: (section: SectionType) => void;
  completionStatus: Record<SectionType, boolean>; // Show checkmarks
}

type SectionType = 
  | 'contact'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects';
```

---

### Section Form Components

Forms for editing each resume section.

| Component | File | Description |
|-----------|------|-------------|
| `ContactInfoForm` | `components/editor/sections/contact-info-form.tsx` | Personal details |
| `SummaryForm` | `components/editor/sections/summary-form.tsx` | Professional summary |
| `ExperienceSection` | `components/editor/sections/experience-section.tsx` | Work history list |
| `ExperienceItem` | `components/editor/sections/experience-item.tsx` | Single job entry |
| `EducationSection` | `components/editor/sections/education-section.tsx` | Education list |
| `EducationItem` | `components/editor/sections/education-item.tsx` | Single education entry |
| `SkillsSection` | `components/editor/sections/skills-section.tsx` | Skill tags |
| `ProjectsSection` | `components/editor/sections/projects-section.tsx` | Projects list |
| `ProjectItem` | `components/editor/sections/project-item.tsx` | Single project entry |

#### ContactInfoForm

```typescript
// components/editor/sections/contact-info-form.tsx
interface ContactInfoFormProps {
  data: ContactInfo | null;
  onChange: (data: Partial<ContactInfo>) => void;
}

// Fields:
// - Full name
// - Email
// - Phone
// - Location
// - LinkedIn URL
// - GitHub URL
// - Personal website
```

#### ExperienceSection

```typescript
// components/editor/sections/experience-section.tsx
interface ExperienceSectionProps {
  items: Experience[];
  onAdd: () => void;
  onUpdate: (id: string, data: Partial<Experience>) => void;
  onDelete: (id: string) => void;
  onReorder: (items: Experience[]) => void;
}

// Features:
// - List of ExperienceItem components
// - Add new entry button
// - Drag-and-drop reordering
```

#### ExperienceItem

```typescript
// components/editor/sections/experience-item.tsx
interface ExperienceItemProps {
  data: Experience;
  onChange: (data: Partial<Experience>) => void;
  onDelete: () => void;
}

// Fields:
// - Company name
// - Position/title
// - Location
// - Start date
// - End date (with "current" checkbox)
// - Description (textarea)
```

---

### Shared Editor Components

Reusable components within the editor.

| Component | File | Description |
|-----------|------|-------------|
| `SectionHeader` | `components/editor/shared/section-header.tsx` | Section title with actions |
| `EntryCard` | `components/editor/shared/entry-card.tsx` | Collapsible entry wrapper |
| `DateRangeInput` | `components/editor/shared/date-range-input.tsx` | Start/end date picker |
| `DraggableList` | `components/editor/shared/draggable-list.tsx` | Reorderable list wrapper |

#### SectionHeader

```typescript
// components/editor/shared/section-header.tsx
interface SectionHeaderProps {
  title: string;
  description?: string;
  onAdd?: () => void;
  addLabel?: string;
}

// Usage:
<SectionHeader 
  title="Work Experience" 
  description="Add your work history, most recent first"
  onAdd={handleAddExperience}
  addLabel="Add Position"
/>
```

#### EntryCard

```typescript
// components/editor/shared/entry-card.tsx
interface EntryCardProps {
  title: string;
  subtitle?: string;
  defaultExpanded?: boolean;
  onDelete?: () => void;
  children: React.ReactNode;
  dragHandleProps?: DragHandleProps; // For drag-and-drop
}

// Collapses/expands to show form fields
```

---

### Landing Page Components

Marketing/landing page components.

| Component | File | Description |
|-----------|------|-------------|
| `Hero` | `components/landing/hero.tsx` | Main headline and CTA |
| `FeatureList` | `components/landing/feature-list.tsx` | Feature grid |
| `FeatureCard` | `components/landing/feature-card.tsx` | Single feature highlight |
| `CTASection` | `components/landing/cta-section.tsx` | Bottom call-to-action |

#### Hero

```typescript
// components/landing/hero.tsx
// No props - content is static

// Structure:
// - Headline
// - Subheadline
// - CTA button (Sign in / Go to Dashboard based on auth state)
// - Optional: screenshot or illustration
```

---

### UI Primitives

Base components used throughout the app.

| Component | File | Description |
|-----------|------|-------------|
| `Button` | `components/ui/button.tsx` | Button with variants |
| `Input` | `components/ui/input.tsx` | Text input |
| `Textarea` | `components/ui/textarea.tsx` | Multi-line input |
| `Select` | `components/ui/select.tsx` | Dropdown select |
| `Checkbox` | `components/ui/checkbox.tsx` | Checkbox with label |
| `FormField` | `components/ui/form-field.tsx` | Label + input + error |
| `Modal` | `components/ui/modal.tsx` | Dialog overlay |
| `Toast` | `components/ui/toast.tsx` | Notification popup |
| `Spinner` | `components/ui/spinner.tsx` | Loading indicator |
| `IconButton` | `components/ui/icon-button.tsx` | Button with only icon |
| `Dropdown` | `components/ui/dropdown.tsx` | Dropdown menu |

#### Button

```typescript
// components/ui/button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// Usage:
<Button variant="primary" loading={isSubmitting}>
  Save Changes
</Button>
```

#### FormField

```typescript
// components/ui/form-field.tsx
interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode; // The input element
}

// Usage:
<FormField label="Email" error={errors.email} required>
  <Input type="email" {...register('email')} />
</FormField>
```

#### Modal

```typescript
// components/ui/modal.tsx
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

// Usage:
<Modal open={showDelete} onClose={() => setShowDelete(false)} title="Delete Resume">
  <p>Are you sure? This cannot be undone.</p>
  <div className="flex gap-2">
    <Button variant="ghost" onClick={() => setShowDelete(false)}>Cancel</Button>
    <Button variant="danger" onClick={handleDelete}>Delete</Button>
  </div>
</Modal>
```

---

## Component Patterns

### Server vs Client Components

```typescript
// Server Component (default) - for data fetching
// components/dashboard/resume-list.tsx
export async function ResumeList({ userId }: { userId: string }) {
  const resumes = await prisma.resume.findMany({ where: { userId } });
  return <div>{resumes.map(r => <ResumeCard key={r.id} resume={r} />)}</div>;
}

// Client Component - for interactivity
// components/dashboard/resume-card.tsx
"use client";
export function ResumeCard({ resume }: { resume: Resume }) {
  const [isDeleting, setIsDeleting] = useState(false);
  // ... event handlers
}
```

### Form Pattern with React Hook Form

```typescript
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactInfoSchema, type ContactInfo } from "@/lib/validations/resume";

export function ContactInfoForm({ data, onSubmit }: Props) {
  const form = useForm<ContactInfo>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: data ?? {},
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormField label="Full Name" error={form.formState.errors.fullName?.message}>
        <Input {...form.register("fullName")} />
      </FormField>
      {/* ... more fields */}
    </form>
  );
}
```

### Optimistic Updates

```typescript
"use client";
import { useOptimistic } from "react";

export function ResumeList({ resumes }: { resumes: Resume[] }) {
  const [optimisticResumes, addOptimistic] = useOptimistic(
    resumes,
    (state, deletedId: string) => state.filter(r => r.id !== deletedId)
  );

  async function handleDelete(id: string) {
    addOptimistic(id); // Immediately update UI
    await deleteResume(id); // Then sync with server
  }

  return (
    <div>
      {optimisticResumes.map(resume => (
        <ResumeCard key={resume.id} onDelete={() => handleDelete(resume.id)} />
      ))}
    </div>
  );
}
```

---

## Recommended Build Order

1. **UI Primitives:** Button, Input, FormField, Modal
2. **Layout:** Container, Navbar, PageHeader
3. **Auth:** AuthCard, OAuthButtons, UserMenu
4. **Landing:** Hero, FeatureCard
5. **Dashboard:** EmptyState, ResumeCard, ResumeList
6. **Editor:** EditorLayout, EditorSidebar, ResumePreview
7. **Section Forms:** ContactInfoForm, then others
