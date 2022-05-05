import { render, screen } from '@testing-library/react';
import LTC_Footer from '../components/footer';
import '@testing-library/jest-dom';

describe('Footer', () => {
  it('renders a footer', () => {
    render(<LTC_Footer />);

    const footer = screen.getByText('Copyright © 2022 The Dream Team');
    expect(footer).toBeInTheDocument();
  });
});