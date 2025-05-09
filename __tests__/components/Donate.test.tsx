import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Donate from '@/components/Donate';
import '@testing-library/jest-dom';

// Mock clipboard API
const mockClipboard = {
  writeText: jest.fn(),
};
Object.defineProperty(navigator, 'clipboard', {
  value: mockClipboard,
  writable: true,
});

// Mock console.error to avoid polluting test output
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});
afterAll(() => {
  console.error = originalConsoleError;
});

describe('Donate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders the donate section with title', () => {
    render(<Donate />);

    expect(screen.getByText('Help me make art.')).toBeInTheDocument();
  });

  it('renders Venmo ID and copy button', () => {
    render(<Donate />);

    expect(screen.getByText('@CoGaineum-Art')).toBeInTheDocument();
    expect(screen.getByText('Copy')).toBeInTheDocument();
  });

  it('copies Venmo ID to clipboard when copy button is clicked', async () => {
    mockClipboard.writeText.mockResolvedValueOnce(undefined);
    render(<Donate />);

    const copyButton = screen.getByText('Copy');
    fireEvent.click(copyButton);

    expect(mockClipboard.writeText).toHaveBeenCalledWith('@CoGaineum-Art');
    await waitFor(() => {
      expect(copyButton).toHaveTextContent('Copied!');
    });

    // Wait for the success message to disappear
    jest.advanceTimersByTime(2000);
    await waitFor(() => {
      expect(copyButton).toHaveTextContent('Copy');
    });
  });

  it('handles clipboard error gracefully', async () => {
    const error = new Error('Clipboard error');
    mockClipboard.writeText.mockRejectedValueOnce(error);
    render(<Donate />);

    const copyButton = screen.getByText('Copy');
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(mockClipboard.writeText).toHaveBeenCalledWith('@CoGaineum-Art');
      expect(console.error).toHaveBeenCalledWith('Failed to copy: ', error);
    });
  });

  it('renders support reasons', () => {
    render(<Donate />);

    expect(screen.getByText('Fund New Projects')).toBeInTheDocument();
    expect(screen.getByText('Enable Exhibitions')).toBeInTheDocument();
    expect(screen.getByText('Support Innovation')).toBeInTheDocument();
  });

  it('renders Venmo app link', () => {
    render(<Donate />);

    const venmoLink = screen.getByText('Open Venmo App');
    expect(venmoLink).toHaveAttribute('href', 'https://venmo.com/');
    expect(venmoLink).toHaveAttribute('target', '_blank');
    expect(venmoLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders QR code placeholder', () => {
    render(<Donate />);

    expect(screen.getByText('Venmo QR Code')).toBeInTheDocument();
    expect(screen.getByText('Scan with your phone camera')).toBeInTheDocument();
    expect(screen.getByText('Scan to donate directly')).toBeInTheDocument();
  });
});
