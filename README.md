# Cogaineum

A modern web application built with Next.js, TypeScript, and Tailwind CSS. This project features a responsive design with multiple sections including About, Contact, Donate, and more.

## Features

- 🚀 Next.js 15 with App Router
- ⚡ TypeScript for type safety
- 🎨 Tailwind CSS for styling
- 📧 Nodemailer integration for contact form
- 🧪 Jest for testing
- 📱 Responsive design
- 🔍 ESLint for code quality
- 🎯 Component-based architecture

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
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── public/             # Static assets
└── __tests__/          # Test files
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

3. Create a `.env.local` file in the root directory with the following variables:

```env
EMAIL_SERVER_HOST=your_smtp_host
EMAIL_SERVER_PORT=your_smtp_port
EMAIL_SERVER_USER=your_email
EMAIL_SERVER_PASSWORD=your_password
EMAIL_FROM=your_from_email
```

4. Start the development server:

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
- `npm test` - Run Jest tests
- `npm run test:watch` - Run Jest tests in watch mode
- `npm run test:coverage` - Generate test coverage report

## Testing

The project uses Jest and React Testing Library for testing. Run the following commands:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Deployment

The application can be deployed on Vercel:

1. Push your code to a GitHub repository
2. Import the project on Vercel
3. Configure environment variables
4. Deploy!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
