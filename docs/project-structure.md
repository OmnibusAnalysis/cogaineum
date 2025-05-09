# Project Structure

This document explains the organization of the Cogaineum project and the purpose of each directory and file.

## Directory Structure

```
cogaineum/
├── app/                  # Next.js app directory
│   ├── actions/         # Server actions
│   ├── types/           # TypeScript types
│   ├── page.tsx         # Main page component
│   └── layout.tsx       # Root layout
├── components/          # React components
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Donate.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Intro.tsx
│   └── Navbar.tsx
├── docs/               # Documentation
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── public/             # Static assets
└── __tests__/          # Test files
```

## Detailed Breakdown

### `/app`

The `app` directory contains the Next.js application code using the App Router.

#### `/app/actions`

Contains server actions for handling form submissions and other server-side operations.

- `email.ts` - Handles email sending functionality
- `types.ts` - TypeScript types for server actions

#### `/app/types`

Contains TypeScript type definitions used throughout the application.

- `index.ts` - Exports all type definitions
- `email.ts` - Email-related types
- `components.ts` - Component prop types

### `/components`

Contains all React components used in the application.

#### Core Components

- `About.tsx` - About section component
- `Contact.tsx` - Contact form component
- `Donate.tsx` - Donation section component
- `Footer.tsx` - Footer component
- `Hero.tsx` - Hero section component
- `Intro.tsx` - Introduction section component
- `Navbar.tsx` - Navigation component

#### Shared Components

- `ErrorBoundary.tsx` - Error boundary component
- `Analytics.tsx` - Analytics integration component

### `/docs`

Contains all project documentation.

- `README.md` - Main documentation file
- `getting-started.md` - Getting started guide
- `project-structure.md` - Project structure documentation
- `development.md` - Development guide
- `testing.md` - Testing guide
- `deployment.md` - Deployment guide
- `security.md` - Security documentation
- `performance.md` - Performance documentation
- `maintenance.md` - Maintenance guide

### `/hooks`

Contains custom React hooks.

- `useScroll.ts` - Scroll position hook
- `useAnimation.ts` - Animation hook
- `useForm.ts` - Form handling hook

### `/lib`

Contains utility functions and shared code.

- `email.ts` - Email utility functions
- `validation.ts` - Form validation utilities
- `analytics.ts` - Analytics utility functions

### `/public`

Contains static assets.

- `images/` - Image assets
- `fonts/` - Font files
- `favicon.ico` - Favicon
- `site.webmanifest` - Web app manifest

### `/__tests__`

Contains test files.

- `components/` - Component tests
- `hooks/` - Hook tests
- `lib/` - Utility function tests
- `setup.ts` - Test setup file

## Configuration Files

### Root Directory

- `package.json` - Project dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `next.config.ts` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.mjs` - PostCSS configuration
- `jest.config.js` - Jest configuration
- `eslint.config.mjs` - ESLint configuration
- `.env.local` - Environment variables (not in version control)
- `.gitignore` - Git ignore rules

## File Naming Conventions

- React components: PascalCase (e.g., `Contact.tsx`)
- Utility functions: camelCase (e.g., `sendEmail.ts`)
- Test files: `*.test.ts` or `*.spec.ts`
- Type definitions: `*.d.ts`
- Configuration files: `*.config.*`

## Import Aliases

The project uses the following import aliases:

- `@/` - Root directory
- `@/components` - Components directory
- `@/hooks` - Hooks directory
- `@/lib` - Utility functions directory
- `@/app` - App directory

## Best Practices

1. **Component Organization**

   - Keep components small and focused
   - Use composition over inheritance
   - Follow the single responsibility principle

2. **File Structure**

   - Group related files together
   - Use index files for clean exports
   - Keep file names descriptive

3. **Code Organization**

   - Use TypeScript for type safety
   - Follow consistent naming conventions
   - Document complex logic

4. **Testing**
   - Write tests for all components
   - Keep tests focused and isolated
   - Use meaningful test descriptions

## Next Steps

- Read the [Development Guide](./development.md)
- Learn about [Testing](./testing.md)
- Understand [Deployment](./deployment.md)
