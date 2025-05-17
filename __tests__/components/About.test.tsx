import { render, screen } from '@testing-library/react';
import About from '@/components/About';
import '@testing-library/jest-dom';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ priority, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('About', () => {
  it('renders the about section with title', () => {
    render(<About />);
    expect(screen.getByText('About the Artist')).toBeInTheDocument();
  });

  it('renders the artwork images', () => {
    render(<About />);

    const anRKeyImage = screen.getByAltText('an-r-key');
    expect(anRKeyImage).toBeInTheDocument();
    expect(anRKeyImage).toHaveAttribute('src', '/an-r-key.webp');
    expect(anRKeyImage).toHaveAttribute('width', '300');
    expect(anRKeyImage).toHaveAttribute('height', '300');

    const monopowerlyImage = screen.getByAltText('monopowerly');
    expect(monopowerlyImage).toBeInTheDocument();
    expect(monopowerlyImage).toHaveAttribute('src', '/monopowerly.webp');
    expect(monopowerlyImage).toHaveAttribute('width', '300');
    expect(monopowerlyImage).toHaveAttribute('height', '300');
  });

  it('renders the artist description', () => {
    render(<About />);
    expect(
      screen.getByText(/I am anti-corporate and do not wish to work with them unless necesary/i)
    ).toBeInTheDocument();
  });

  it('renders the artwork titles', () => {
    render(<About />);

    expect(screen.getByText('An-R-Key')).toBeInTheDocument();
    expect(screen.getByText('Monopowerly')).toBeInTheDocument();
  });

  it('renders the description text', () => {
    render(<About />);
    expect(
      screen.getByText(/My work illustrates the absurdity and vibrancy of life itself/i)
    ).toBeInTheDocument();
  });

  it('renders with correct styling', () => {
    const { container } = render(<About />);
    const section = container.firstChild;
    expect(section).toHaveClass('min-h-screen', 'bg-black', 'animate-fade-in');
  });
});
