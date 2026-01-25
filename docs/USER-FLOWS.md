# User Flows

This document describes how users navigate through the ResumeBuilder2026 application.

## Flow Overview

```mermaid
flowchart TD
    Landing[Landing Page] --> SignIn[Sign In Page]
    SignIn --> OAuth[GitHub OAuth]
    OAuth --> Dashboard[Dashboard]
    
    Dashboard --> Create[Create New Resume]
    Dashboard --> Select[Select Existing Resume]
    
    Create --> Editor[Resume Editor]
    Select --> Editor
    
    Editor --> Save[Auto-save]
    Editor --> PDF[Download PDF]
    Editor --> Back[Back to Dashboard]
    Back --> Dashboard
```

## Detailed User Flows

### Flow 1: New User Journey

A first-time user discovering and signing up for the application.

```mermaid
flowchart TD
    A[User visits landing page] --> B[Reads value proposition]
    B --> C[Sees feature highlights]
    C --> D{Decides to try}
    D -->|Yes| E[Clicks 'Get Started']
    D -->|No| F[Leaves site]
    E --> G[Sign In Page]
    G --> H[Clicks 'Sign in with GitHub']
    H --> I[GitHub OAuth Screen]
    I --> J{Authorizes app?}
    J -->|Yes| K[Account created automatically]
    J -->|No| G
    K --> L[Redirect to Dashboard]
    L --> M[Sees empty state]
    M --> N[Clicks 'Create Your First Resume']
    N --> O[Editor opens]
```

**Steps:**

1. User lands on homepage
2. Reads the value proposition and feature list
3. Clicks "Get Started" or "Sign In" button
4. Redirected to sign-in page
5. Clicks "Sign in with GitHub"
6. Redirected to GitHub to authorize the application
7. After authorization, redirected back to the app
8. Account is created automatically using GitHub profile data
9. Redirected to dashboard showing empty state
10. Clicks "Create Your First Resume"
11. Enters the resume editor

### Flow 2: Returning User Journey

A user who already has an account returns to continue working.

```mermaid
flowchart TD
    A[User visits any page] --> B{Already signed in?}
    B -->|Yes| C[Go to Dashboard]
    B -->|No| D[Click Sign In]
    D --> E[Sign In Page]
    E --> F[Sign in with GitHub]
    F --> G[Dashboard]
    G --> H{What to do?}
    H -->|Edit existing| I[Click resume card]
    H -->|Create new| J[Click 'New Resume']
    I --> K[Editor loads with data]
    J --> L[Editor opens blank]
```

**Steps:**

1. User visits the application
2. If not signed in, clicks "Sign In" in the navbar
3. Signs in with GitHub (no registration needed)
4. Redirected to dashboard showing existing resumes
5. Either clicks an existing resume to edit, or creates a new one

### Flow 3: Resume Editing Flow

The core experience of building a resume.

```mermaid
flowchart TD
    A[Enter Editor] --> B[See section sidebar]
    B --> C[Click section to edit]
    C --> D[Form appears in main area]
    D --> E[Fill in/modify fields]
    E --> F[Preview updates in real-time]
    F --> G{More sections?}
    G -->|Yes| C
    G -->|No| H{Finished?}
    H -->|Download| I[Click Download PDF]
    H -->|Save for later| J[Click Back to Dashboard]
    I --> K[PDF generated]
    J --> L[Return to Dashboard]
```

**Editor Sections:**

| Section | Description |
|---------|-------------|
| Contact Info | Name, email, phone, location, links |
| Summary | Professional summary paragraph |
| Experience | Work history entries |
| Education | Academic history entries |
| Skills | Skill tags |
| Projects | Portfolio project entries |

**For list sections (Experience, Education, Projects):**

```mermaid
flowchart TD
    A[View section] --> B{Has entries?}
    B -->|No| C[Click 'Add First Entry']
    B -->|Yes| D[See list of entries]
    D --> E{Action?}
    E -->|Add| F[Click 'Add' button]
    E -->|Edit| G[Click existing entry]
    E -->|Reorder| H[Drag to new position]
    E -->|Delete| I[Click delete icon]
    F --> J[Empty form appears]
    G --> K[Entry expands to form]
    I --> L[Confirmation dialog]
    L -->|Confirm| M[Entry removed]
    L -->|Cancel| D
```

### Flow 4: Resume Management

Managing resumes from the dashboard.

```mermaid
flowchart TD
    A[Dashboard] --> B{Action?}
    B -->|Rename| C[Click title]
    B -->|Duplicate| D[Click menu → Duplicate]
    B -->|Delete| E[Click menu → Delete]
    C --> F[Inline edit mode]
    F --> G[Press Enter or blur]
    G --> H[Title saved]
    D --> I[Copy created]
    I --> J[Redirect to new copy]
    E --> K[Confirmation dialog]
    K -->|Confirm| L[Resume deleted]
    K -->|Cancel| A
```

## Authentication States

How each page behaves based on authentication status.

| Page | Logged Out | Logged In |
|------|------------|-----------|
| `/` (Landing) | Show sign-in CTA | Show "Go to Dashboard" CTA |
| `/dashboard` | Redirect to `/auth/signin` | Show user's resumes |
| `/editor/[id]` | Redirect to `/auth/signin` | Load if owner, 404 if not |
| `/auth/signin` | Show sign-in options | Redirect to `/dashboard` |

### Protected Route Flow

```mermaid
flowchart TD
    A[User requests /dashboard] --> B{Has valid session?}
    B -->|Yes| C[Load dashboard]
    B -->|No| D[Redirect to /auth/signin]
    D --> E[Store original URL as callback]
    E --> F[User signs in]
    F --> G[Redirect to original URL]
```

## Edge Cases

| Scenario | Behavior |
|----------|----------|
| Visit `/editor/[id]` for resume you don't own | Show 404 page |
| Visit `/editor/[id]` that doesn't exist | Show 404 page |
| Session expires while editing | Show sign-in modal, preserve unsaved work |
| Delete your only resume | Show empty state with "Create" CTA |
| Try to access dashboard while logged out | Redirect to sign-in with callback URL |
| GitHub OAuth denied | Return to sign-in with error message |
| Network error while saving | Show error toast, retry option |

## Auto-Save Behavior

The editor uses debounced auto-save for seamless editing.

```mermaid
sequenceDiagram
    participant User
    participant Editor
    participant Server
    participant Database

    User->>Editor: Types in field
    Note over Editor: Debounce timer starts (1.5s)
    User->>Editor: Types more
    Note over Editor: Timer resets
    User->>Editor: Stops typing
    Note over Editor: Timer completes
    Editor->>Server: Save request
    Editor->>Editor: Show "Saving..." indicator
    Server->>Database: Update resume
    Database-->>Server: Success
    Server-->>Editor: Confirmation
    Editor->>Editor: Show "Saved" indicator
```

**Save indicators:**

| State | Display |
|-------|---------|
| No changes | Nothing shown |
| Unsaved changes | "Editing..." |
| Saving in progress | "Saving..." |
| Save successful | "Saved" (fades after 2s) |
| Save failed | "Failed to save" with retry button |

## PDF Export Flow

```mermaid
flowchart TD
    A[Click Download PDF] --> B[Show loading state]
    B --> C[Send resume data to server]
    C --> D[Server generates PDF]
    D --> E{Success?}
    E -->|Yes| F[Return PDF blob]
    E -->|No| G[Show error message]
    F --> H[Trigger browser download]
    H --> I[Hide loading state]
    G --> I
```
