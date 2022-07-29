import { render, screen } from '@testing-library/react';
import CountriesApp from './CountriesApp';

test('renders learn react link', () => {
  render(<CountriesApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
