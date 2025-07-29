# Cogaineum

A modern artist portfolio website built with Next.js, TypeScript, and Tailwind CSS. This project features a responsive design with multiple sections including About, Portfolio, Contact, and more.

## Features

- 🚀 Next.js 15 with App Router
- ⚡ TypeScript for type safety
- 🎨 Tailwind CSS for styling
- 📱 Responsive design
- 🔍 ESLint for code quality
- 🎯 Component-based architecture
- 📊 Vercel Analytics integration

## Project Structure

```
cogaineum/
├── app/                  # Next.js app directory
│   ├── styles/          # Modular CSS files
│   ├── page.tsx         # Main page component
│   └── layout.tsx       # Root layout
├── components/          # React components
│   ├── ModernAbout.tsx
│   ├── ModernContact.tsx
│   ├── ModernFooter.tsx
│   ├── ModernHero.tsx
│   ├── ModernNavbar.tsx
│   ├── ModernPortfolio.tsx
│   └── ErrorBoundary.tsx
├── lib/                # Utility functions
├── public/             # Static assets
└── monopowerly_image_set/ # Image gallery page
```

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

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

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## CSS Architecture

The project uses a modular CSS architecture with files organized by responsibility:

- `app/styles/base.css` - Design system variables and base styles
- `app/styles/animations.css` - Animation keyframes and classes
- `app/styles/components.css` - Reusable component styles
- `app/styles/layouts.css` - Page layouts and responsive design
- `app/styles/utilities.css` - Utility classes and gradients

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **React Intersection Observer** - Scroll-based animations
- **Vercel Analytics** - Performance monitoring

## Deployment

The project is optimized for deployment on Vercel. Simply connect your repository to Vercel for automatic deployments.

## License

This project is licensed under the MIT License.
