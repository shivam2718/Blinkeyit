import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    const linkElement = screen.getByText(/some text/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('handles error correctly', () => {
    const { getByText } = render(<App />);
    expect(getByText(/error message/i)).toBeInTheDocument();
  });
});