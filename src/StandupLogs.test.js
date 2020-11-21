import { render, screen } from '@testing-library/react';
import StandupLogs from './StandupLogs';

test('renders learn react link', () => {
  render(<StandupLogs />);
  expect(screen.getByText('Welcome to StandupLogs!')).toBeInTheDocument();
});
