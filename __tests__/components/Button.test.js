import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from 'src';

describe('Button Component', () => {
  it('renders with default text', () => {
    render(<Button />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('calls onClick prop when clicked', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();
    render(<Button text="Click Me" onClick={mockOnClick} />);
    await user.click(screen.getByText('Click Me'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
