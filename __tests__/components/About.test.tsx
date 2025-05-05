import { render, screen } from '@testing-library/react'
import About from '@/components/About'
import '@testing-library/jest-dom'

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ priority, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  },
}))

describe('About', () => {
  it('renders the about section with title', () => {
    render(<About />)
    
    expect(screen.getByText('About the Artist')).toBeInTheDocument()
  })

  it('renders the artist description', () => {
    render(<About />)
    
    expect(screen.getByText(/My name is Robert Maxwell Remlinger/)).toBeInTheDocument()
    expect(screen.getByText(/My work illustrates the absurdity and vibrancy of life itself/)).toBeInTheDocument()
    expect(screen.getByText(/I am anti-corporate/)).toBeInTheDocument()
  })

  it('renders the artwork images', () => {
    render(<About />)
    
    const anRKeyImage = screen.getByAltText('an-r-key')
    expect(anRKeyImage).toBeInTheDocument()
    expect(anRKeyImage).toHaveAttribute('src', '/an-r-key.webp')
    expect(anRKeyImage).toHaveAttribute('width', '150')
    expect(anRKeyImage).toHaveAttribute('height', '150')

    const monopowerlyImage = screen.getByAltText('monopowerly')
    expect(monopowerlyImage).toBeInTheDocument()
    expect(monopowerlyImage).toHaveAttribute('src', '/monopowerly.webp')
    expect(monopowerlyImage).toHaveAttribute('width', '200')
    expect(monopowerlyImage).toHaveAttribute('height', '200')
  })

  it('renders the artwork titles', () => {
    render(<About />)
    
    expect(screen.getByText('An-R-Key')).toBeInTheDocument()
    expect(screen.getByText('Monopowerly')).toBeInTheDocument()
  })

  it('applies custom styles when provided', () => {
    const customStyle = { backgroundColor: 'red' }
    render(<About style={customStyle} />)
    
    const container = screen.getByTestId('about-container')
    expect(container).toHaveStyle(customStyle)
  })
}) 