import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '@/components/Navbar';
import '@testing-library/jest-dom';

// Mock window.scrollTo
const mockScrollTo = jest.fn();
Object.defineProperty(window, 'scrollTo', {
  value: mockScrollTo,
  writable: true,
});

describe('Navbar', () => {
  beforeEach(() => {
    // Clear mock before each test
    mockScrollTo.mockClear();
  });

  const mockProps = {
    scrollToSection: jest.fn(),
    homeRef: { current: null },
    aboutRef: { current: null },
    contactRef: { current: null },
    donateRef: { current: null },
    opacity: 1,
  };

  it('renders the navigation links', () => {
    render(<Navbar {...mockProps} />);

    // Check if all navigation links are present in desktop view
    const desktopNav = screen.getAllByRole('list')[0];
    expect(desktopNav).toHaveClass('hidden', 'md:flex');
    
    const navLinks = desktopNav.querySelectorAll('button');
    expect(navLinks).toHaveLength(4);
    expect(navLinks[0]).toHaveTextContent('Home');
    expect(navLinks[1]).toHaveTextContent('About');
    expect(navLinks[2]).toHaveTextContent('Contact');
    expect(navLinks[3]).toHaveTextContent('Donate');
  });

  it('calls scrollToSection when navigation buttons are clicked', () => {
    render(<Navbar {...mockProps} />);

    // Get desktop navigation buttons
    const desktopNav = screen.getAllByRole('list')[0];
    const navButtons = desktopNav.querySelectorAll('button');

    // Click each navigation button
    fireEvent.click(navButtons[1]); // About
    expect(mockProps.scrollToSection).toHaveBeenCalledWith(mockProps.aboutRef);

    fireEvent.click(navButtons[2]); // Contact
    expect(mockProps.scrollToSection).toHaveBeenCalledWith(mockProps.contactRef);

    fireEvent.click(navButtons[3]); // Donate
    expect(mockProps.scrollToSection).toHaveBeenCalledWith(mockProps.donateRef);

    fireEvent.click(navButtons[0]); // Home
    expect(mockProps.scrollToSection).toHaveBeenCalledWith(mockProps.homeRef);
  });

  it('toggles mobile menu when hamburger button is clicked', () => {
    render(<Navbar {...mockProps} />);

    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    expect(menuButton).toBeInTheDocument();

    // Click to open menu
    fireEvent.click(menuButton);
    const mobileMenuContainer = screen.getByRole('navigation').querySelector('.md\\:hidden.fixed');
    expect(mobileMenuContainer).toHaveClass('translate-y-0', 'pointer-events-auto');

    // Click to close menu
    fireEvent.click(menuButton);
    expect(mobileMenuContainer).toHaveClass('-translate-y-full', 'pointer-events-none');
  });

  it('applies opacity to the navigation bar', () => {
    const opacity = 0.5;
    render(<Navbar {...mockProps} opacity={opacity} />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveStyle({ opacity: opacity });
  });

  it('closes mobile menu when navigation item is clicked', () => {
    render(<Navbar {...mockProps} />);
    
    // Open menu
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(menuButton);
    
    // Click a nav item
    const aboutButton = screen.getAllByText('About')[1]; // Get mobile menu button
    fireEvent.click(aboutButton);
    
    // Check if menu closed
    const mobileMenu = screen.getByRole('navigation').querySelector('.md\\:hidden.fixed');
    expect(mobileMenu).toHaveClass('-translate-y-full', 'pointer-events-none');
    expect(mockProps.scrollToSection).toHaveBeenCalledWith(mockProps.aboutRef);
  });

  it('handles mobile menu button states correctly', () => {
    render(<Navbar {...mockProps} />);
    
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    const bars = menuButton.querySelectorAll('span');
    
    // Initial state
    expect(bars[0]).not.toHaveClass('rotate-45');
    expect(bars[1]).not.toHaveClass('opacity-0');
    expect(bars[2]).not.toHaveClass('-rotate-45');
    
    // Clicked state
    fireEvent.click(menuButton);
    expect(bars[0]).toHaveClass('rotate-45');
    expect(bars[1]).toHaveClass('opacity-0');
    expect(bars[2]).toHaveClass('-rotate-45');
  });

  it('calls window.scrollTo when Home button is clicked in desktop view', () => {
    render(<Navbar {...mockProps} />);
    
    const desktopNav = screen.getAllByRole('list')[0];
    const homeButton = desktopNav.querySelectorAll('button')[0];
    
    fireEvent.click(homeButton);
    expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('calls window.scrollTo when Home button is clicked in mobile view', () => {
    render(<Navbar {...mockProps} />);
    
    // Open mobile menu
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(menuButton);
    
    // Click home button in mobile menu
    const mobileHomeButton = screen.getAllByText('Home')[1];
    fireEvent.click(mobileHomeButton);
    
    expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('handles accessibility attributes correctly', () => {
    render(<Navbar {...mockProps} />);
    
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    
    // Initial state
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    
    // Open menu
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    
    // Close menu
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('handles mobile menu overlay transitions correctly', () => {
    render(<Navbar {...mockProps} />);
    
    const mobileMenu = screen.getByRole('navigation').querySelector('.md\\:hidden.fixed');
    
    // Initial state
    expect(mobileMenu).toHaveClass('opacity-0');
    expect(mobileMenu).toHaveClass('pointer-events-none');
    
    // Open menu
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(menuButton);
    
    expect(mobileMenu).not.toHaveClass('opacity-0');
    expect(mobileMenu).toHaveClass('pointer-events-auto');
  });

  it('handles responsive behavior correctly', () => {
    render(<Navbar {...mockProps} />);
    
    // Desktop menu should be hidden on mobile
    const desktopNav = screen.getAllByRole('list')[0];
    expect(desktopNav).toHaveClass('hidden');
    expect(desktopNav).toHaveClass('md:flex');
    
    // Mobile menu button should be hidden on desktop
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    expect(menuButton).toHaveClass('md:hidden');
  });
});
