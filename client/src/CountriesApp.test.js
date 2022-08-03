import { render, screen } from '@testing-library/react';
import CountriesApp from './CountriesApp';

test('renders title of the page', () => {
  render(<CountriesApp />);
  const linkElement = screen.getByText(/"The world is a book, and those who do not travel read only a page."/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders text of the button', () => {
  render(<CountriesApp />);
  const linkElement = screen.getByText(/Explore the countries/i);
  expect(linkElement).toBeInTheDocument();
});
