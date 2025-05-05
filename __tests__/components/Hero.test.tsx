import { render, screen } from '@testing-library/react'
import Hero from '@/components/Hero'
import '@testing-library/jest-dom'

describe('Hero', () => {
  const mockProps = {
    currentWord: 'gain',
    isSpinning: false,
    animationComplete: true,
    scrollOpacity: 1,
    blurAmount: 0,
  }

  it('renders the hero section with title', () => {
    render(<Hero {...mockProps} />)
    
    // Check if title parts are present
    expect(screen.getByText('Co')).toBeInTheDocument()
    expect(screen.getByText('gain')).toBeInTheDocument()
    expect(screen.getByText('eum')).toBeInTheDocument()
  })

  it('shows spinning animation when isSpinning is true', () => {
    render(<Hero {...mockProps} isSpinning={true} />)
    
    // Check if spinning words are present
    const spinningElements = screen.getAllByText('loss')
    expect(spinningElements.length).toBe(3)
    
    // Find the spinning container
    const spinContainer = spinningElements[0].closest('div.single-spin-animation')
    expect(spinContainer).toBeInTheDocument()
  })

  it('applies blur effect based on blurAmount', () => {
    const blurAmount = 5
    render(<Hero {...mockProps} blurAmount={blurAmount} />)
    
    const container = screen.getByText('Co').closest('.text-center')
    expect(container).toHaveStyle({
      filter: `blur(${blurAmount}px)`,
      transform: `scale(${1 + blurAmount * 0.01})`
    })
  })

  it('adjusts opacity based on scrollOpacity', () => {
    const scrollOpacity = 0.5
    render(<Hero {...mockProps} scrollOpacity={scrollOpacity} />)
    
    const container = screen.getByText('Co').closest('.text-center')
    expect(container).toHaveStyle({
      opacity: scrollOpacity.toString()
    })
  })

  it('applies gradient classes when animation is complete', () => {
    render(<Hero {...mockProps} animationComplete={true} />)
    
    expect(screen.getByText('Co')).toHaveClass('liquid-gradient-left')
    expect(screen.getByText('gain')).toHaveClass('liquid-gradient-center')
    expect(screen.getByText('eum')).toHaveClass('liquid-gradient-right')
  })
}) 