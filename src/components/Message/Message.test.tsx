import { render, screen } from '@testing-library/react';
import Message from '.';

describe('Message component', () => {
  it('renders the success message with correct styles', () => {
    render(<Message type="success" text="Operation was successful" />);

  
    const messageText = screen.getByText(/Operation was successful/i);
    expect(messageText).toBeInTheDocument();

    // Check if the success styles are applied
    const message = screen.getByRole('alert');
    expect(message).toHaveClass('bg-green-100');
    expect(message).toHaveClass('text-green-700');
    expect(message).toHaveClass('border-green-500');
  });

  it('renders the error message with correct styles', () => {
    render(<Message type="error" text="An error occurred" />);

  
    const messageText = screen.getByText(/An error occurred/i);
    expect(messageText).toBeInTheDocument();

    // Check if the error styles are applied
    const message = screen.getByRole('alert');
    expect(message).toHaveClass('bg-red-100');
    expect(message).toHaveClass('text-red-700');
    expect(message).toHaveClass('border-red-500');
  });

  it('renders with default styles when an invalid type is provided', () => {
    render(<Message type="invalid" text="Unknown type message" />);
  
    const messageText = screen.getByText(/Unknown type message/i);
    expect(messageText).toBeInTheDocument();

    const message = screen.getByRole('alert');
    expect(message).not.toHaveClass('bg-green-100');
    expect(message).not.toHaveClass('text-green-700');
    expect(message).not.toHaveClass('border-green-500');
    expect(message).not.toHaveClass('bg-red-100');
    expect(message).not.toHaveClass('text-red-700');
    expect(message).not.toHaveClass('border-red-500');
  });
});
