import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '@/components/Navbar';

describe('Navbar', () => {
  // Mock refs
  const aboutRef = { current: null } as React.RefObject<HTMLDivElement>;
  const contactRef = { current: null } as React.RefObject<HTMLDivElement>;
  const donateRef = { current: null } as React.RefObject<HTMLDivElement>;

  // Mock DOM elements
  const aboutDiv = document.createElement('div');
  const contactDiv = document.createElement('div');
  const donateDiv = document.createElement('div');

  // Assign refs
  (aboutRef as any).current = aboutDiv;
  (contactRef as any).current = contactDiv;
  (donateRef as any).current = donateDiv;

  const mockProps = {
    opacity: 1,
    scrollToSection: jest.fn(),
    aboutRef,
    contactRef,
    donateRef,
  };

  it('renders the navigation links', () => {
    render(<Navbar {...mockProps} />);

    // Check if all navigation links are present
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Donate')).toBeInTheDocument();
  });

  it('renders the logo text', () => {
    render(<Navbar {...mockProps} />);

    // Check if the logo text is present
    expect(screen.getByText('Cogaineum')).toBeInTheDocument();
  });

  it('calls scrollToSection when navigation buttons are clicked', () => {
    render(<Navbar {...mockProps} />);

    // Click each navigation button
    screen.getByText('About').click();
    expect(mockProps.scrollToSection).toHaveBeenCalledWith(mockProps.aboutRef);

    screen.getByText('Contact').click();
    expect(mockProps.scrollToSection).toHaveBeenCalledWith(mockProps.contactRef);

    screen.getByText('Donate').click();
    expect(mockProps.scrollToSection).toHaveBeenCalledWith(mockProps.donateRef);
  });
});
