import { render, screen } from '@testing-library/react'
import Footer from '@/components/Footer'
import '@testing-library/jest-dom'

describe('Footer', () => {
  const mockDate = new Date('2024-01-01')
  const originalDate = global.Date

  beforeAll(() => {
    global.Date = class extends Date {
      constructor() {
        super()
        return mockDate
      }
    } as DateConstructor
  })

  afterAll(() => {
    global.Date = originalDate
  })

  it('renders the footer with copyright text', () => {
    render(<Footer />)
    
    expect(screen.getByText(`© 2024 CoGaineum. All rights reserved.`)).toBeInTheDocument()
  })

  it('renders with correct styling', () => {
    render(<Footer />)
    
    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('bg-black', 'py-8', 'border-t', 'border-gray-800')
    
    const container = footer.firstElementChild
    expect(container).toHaveClass('max-w-4xl', 'mx-auto', 'px-6', 'text-center')
    
    const text = screen.getByText(/CoGaineum/)
    expect(text).toHaveClass('text-gray-400')
  })
}) 