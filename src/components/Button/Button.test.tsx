// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '.';

const mockOnClick = jest.fn();

describe('Button component', () => {

  it('renders the button text correctly', () => {
    render(<Button text="Click me" className="btn" onClick={mockOnClick} />);

    // Check if the button contains the correct text
    const buttonText = screen.getByText(/Click me/i);
    expect(buttonText).toBeInTheDocument();
  });

  it('renders the left icon when passed as a prop', () => {
    render(<Button text="Click me" leftIcon="left-icon.png" className="btn" onClick={mockOnClick} />);

    // Check if the left icon is rendered
    const leftIcon = screen.getByAltText('left-icon');
    expect(leftIcon).toBeInTheDocument();
    expect(leftIcon).toHaveAttribute('src', 'left-icon.png');
  });

  it('renders the right icon when passed as a prop', () => {
    render(<Button text="Click me" rightIcon="right-icon.png" className="btn" onClick={mockOnClick} />);

    // Check if the right icon is rendered
    const rightIcon = screen.getByAltText('right-icon');
    expect(rightIcon).toBeInTheDocument();
    expect(rightIcon).toHaveAttribute('src', 'right-icon.png');
  });

  it('renders the button with both left and right icons', () => {
    render(
      <Button 
        text="Click me" 
        leftIcon="left-icon.png" 
        rightIcon="right-icon.png" 
        className="btn" 
        onClick={mockOnClick} 
      />
    );

    // Check if both left and right icons are rendered
    const leftIcon = screen.getByAltText('left-icon');
    expect(leftIcon).toHaveAttribute('src', 'left-icon.png');
    
    const rightIcon = screen.getByAltText('right-icon');
    expect(rightIcon).toHaveAttribute('src', 'right-icon.png');
  });

  it('does not render the left icon when leftIcon prop is not passed', () => {
    render(<Button text="Click me" className="btn" onClick={mockOnClick} />);

    // Check if the left icon is not rendered
    const leftIcon = screen.queryByAltText('left-icon');
    expect(leftIcon).not.toBeInTheDocument();
  });

  it('does not render the right icon when rightIcon prop is not passed', () => {
    render(<Button text="Click me" className="btn" onClick={mockOnClick} />);

    // Check if the right icon is not rendered
    const rightIcon = screen.queryByAltText('right-icon');
    expect(rightIcon).not.toBeInTheDocument();
  });

  it('calls the onClick function when clicked', () => {
    render(<Button text="Click me" className="btn" onClick={mockOnClick} />);

    // Fire click event
    const button = screen.getByText(/Click me/i);
    fireEvent.click(button);

    // Check if the mock onClick function was called
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('disables the button when the disabled prop is true', () => {
    render(<Button text="Click me" className="btn" disabled={true} onClick={mockOnClick} />);

    // Check if the button is disabled
    const button = screen.getByText(/Click me/i);
    expect(button).toBeDisabled();
  });

  it('does not call onClick when the button is disabled', () => {
    render(<Button text="Click me" className="btn" disabled={true} onClick={mockOnClick} />);

    // Fire click event on the disabled button
    const button = screen.getByText(/Click me/i);
    fireEvent.click(button);

    // Check that onClick is not called
    expect(mockOnClick).toHaveBeenCalledTimes(0);
  });

  it('applies custom className when passed as a prop', () => {
    render(<Button text="Click me" className="custom-class" onClick={mockOnClick} />);

    // Check if the button has the custom class
    const button = screen.getByText(/Click me/i);
    expect(button).toHaveClass('custom-class');
  });

});
