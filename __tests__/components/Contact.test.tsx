import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Contact from '@/components/Contact'
import { sendEmail } from '@/app/actions/email'
import '@testing-library/jest-dom'

// Mock the email action
jest.mock('@/app/actions/email', () => ({
  sendEmail: jest.fn(),
}))

describe('Contact', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  it('renders the contact form with all fields', () => {
    render(<Contact />)
    
    // Check if all form fields are present
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Message')).toBeInTheDocument()
    expect(screen.getByText('Send Message')).toBeInTheDocument()
  })

  it('shows validation error when submitting empty form', async () => {
    render(<Contact />)
    
    // Get the form and submit it
    const form = screen.getByRole('form')
    fireEvent.submit(form)
    
    // Check for validation error message
    await waitFor(() => {
      const errorMessage = screen.getByText('Please fill out all fields before submitting.')
      expect(errorMessage).toBeInTheDocument()
    })
  })

  it('handles successful form submission', async () => {
    // Mock successful email response
    const mockResponse = { success: true, message: 'Message sent successfully!' }
    ;(sendEmail as jest.Mock).mockResolvedValueOnce(mockResponse)

    render(<Contact />)
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } })
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello!' } })
    
    // Submit the form
    const form = screen.getByRole('form')
    fireEvent.submit(form)
    
    // Check loading state
    await waitFor(() => {
      expect(screen.getByText('Sending...')).toBeInTheDocument()
    })
    
    // Wait for submission to complete and check success message
    await waitFor(() => {
      expect(screen.getByText(mockResponse.message)).toBeInTheDocument()
    })
    
    // Verify form was reset
    expect(screen.getByLabelText('Name')).toHaveValue('')
    expect(screen.getByLabelText('Email')).toHaveValue('')
    expect(screen.getByLabelText('Message')).toHaveValue('')
  })

  it('handles form submission error', async () => {
    // Mock failed email response
    const mockError = new Error('Failed to send message')
    ;(sendEmail as jest.Mock).mockRejectedValueOnce(mockError)

    render(<Contact />)
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } })
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello!' } })
    
    // Submit the form
    const form = screen.getByRole('form')
    fireEvent.submit(form)
    
    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('An unexpected error occurred. Please try again.')).toBeInTheDocument()
    })
  })
}) 