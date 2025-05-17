import { render, screen } from '@testing-library/react';
import Hero from '@/components/Hero';
import '@testing-library/jest-dom';

describe('Hero', () => {
  const defaultProps = {
    currentWord: 'gain',
    isSpinning: false,
    animationComplete: false,
    scrollOpacity: 1,
    blurAmount: 0,
  };

  it('renders the hero text correctly when not spinning', () => {
    render(<Hero {...defaultProps} />);
    expect(screen.getByText('Co')).toBeInTheDocument();
    expect(screen.getByText('gain')).toBeInTheDocument();
    expect(screen.getByText('eum')).toBeInTheDocument();
  });

  it('shows spinning animation when isSpinning is true', () => {
    render(<Hero {...defaultProps} isSpinning={true} />);
    
    // When spinning, we should see both 'loss' and 'gain' in the animation
    const spinningWords = screen.getAllByText(/loss|gain/);
    expect(spinningWords).toHaveLength(2);
    
    const spinContainer = screen.getByText('loss').closest('div.single-spin-animation');
    expect(spinContainer).toBeInTheDocument();
  });

  it('applies blur effect based on blurAmount', () => {
    const blurAmount = 5;
    const { container } = render(<Hero {...defaultProps} blurAmount={blurAmount} />);
    
    const mainDiv = container.querySelector('.text-center');
    expect(mainDiv).toHaveStyle({
      filter: `blur(${blurAmount}px)`,
      transform: `scale(${1 + blurAmount * 0.01})`,
    });
  });

  it('controls visibility based on scrollOpacity', () => {
    const { container, rerender } = render(<Hero {...defaultProps} scrollOpacity={0} />);
    
    const mainDiv = container.querySelector('.text-center');
    expect(mainDiv).toHaveStyle({ visibility: 'hidden' });

    rerender(<Hero {...defaultProps} scrollOpacity={1} />);
    expect(mainDiv).toHaveStyle({ visibility: 'visible' });
  });

  it('applies gradient classes when animation is complete', () => {
    render(<Hero {...defaultProps} animationComplete={true} />);
    
    expect(screen.getByText('Co')).toHaveClass('liquid-gradient-left');
    expect(screen.getByText('gain')).toHaveClass('liquid-gradient-center');
    expect(screen.getByText('eum')).toHaveClass('liquid-gradient-right');
  });
});
