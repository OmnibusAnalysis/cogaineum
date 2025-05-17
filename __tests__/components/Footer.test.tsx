import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';
import '@testing-library/jest-dom';

describe('Footer', () => {
  const mockDate = new Date('2024-01-01');
  const originalDate = global.Date;

  beforeAll(() => {
    global.Date = class extends Date {
      constructor() {
        super();
        return mockDate;
      }
    } as DateConstructor;
  });

  afterAll(() => {
    global.Date = originalDate;
  });

  it('renders the footer with copyright text', () => {
    render(<Footer />);
    const copyrightText = screen.getByText((content, element) => {
      return element?.textContent?.includes('Cogaineum. Robert Maxwell Remlinger. All rights reserved.');
    }, { selector: 'p' });
    expect(copyrightText).toBeInTheDocument();
  });

  it('renders with correct styling', () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector('footer');
    expect(footer).toHaveClass('bg-black', 'py-8', 'border-t', 'border-gray-800');

    const innerDiv = container.querySelector('div.max-w-4xl');
    expect(innerDiv).toHaveClass('max-w-4xl', 'mx-auto', 'px-6', 'text-center');

    const text = screen.getByText((content, element) => {
      return element?.textContent?.includes('Cogaineum');
    }, { selector: 'p' });
    expect(text).toHaveClass('text-gray-400');
  });
});
