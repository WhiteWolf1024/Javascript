import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const app = render(<App />);
  expect(app).toMatchSnapshot();
});
