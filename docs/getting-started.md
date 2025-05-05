# Getting Started with Cogaineum

This guide will help you set up your development environment and get started with the Cogaineum project.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18.17 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cogaineum.git
cd cogaineum
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Email Configuration
EMAIL_SERVER_HOST=your_smtp_host
EMAIL_SERVER_PORT=your_smtp_port
EMAIL_SERVER_USER=your_email
EMAIL_SERVER_PASSWORD=your_password
EMAIL_FROM=your_from_email

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id

# Security
NEXT_PUBLIC_SITE_URL=https://cogaineum.art
```

## Development

1. Start the development server:
```bash
npm run dev
# or
yarn dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

## Project Structure

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

## Development Workflow

1. Create a new branch for your feature:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit them:
```bash
git add .
git commit -m "Add your feature"
```

3. Push your changes:
```bash
git push origin feature/your-feature-name
```

4. Create a pull request on GitHub.

## Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Use Prettier for code formatting
- Write meaningful commit messages
- Add tests for new features

## Testing

Run the test suite:
```bash
npm test
```

For more information about testing, see the [Testing Guide](./testing.md).

## Deployment

For deployment instructions, see the [Deployment Guide](./deployment.md).

## Troubleshooting

### Common Issues

1. **Dependencies not installing**
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules: `rm -rf node_modules`
   - Reinstall: `npm install`

2. **TypeScript errors**
   - Run type check: `npm run type-check`
   - Check for missing types: `npm install @types/package-name`

3. **Build errors**
   - Clear Next.js cache: `rm -rf .next`
   - Rebuild: `npm run build`

## Getting Help

- Check the [documentation](./README.md)
- Open an [issue](https://github.com/yourusername/cogaineum/issues)
- Contact the maintainers

## Next Steps

- Read the [Project Structure](./project-structure.md) guide
- Learn about [Development](./development.md) practices
- Understand the [Testing](./testing.md) process 