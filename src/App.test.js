import { render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import App from './App';

test('Check for Navbar', async () => {
  render(<App />);
  const linkElement = screen.getByText(/smiling face/i);
  expect(linkElement).toBeInTheDocument();
});

test('Going to create model page', async () => {
  render(<App />);
  const createButton = screen.getByText(/create/i)
  expect(createButton).toBeInTheDocument();
})