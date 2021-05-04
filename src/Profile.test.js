import React from 'react';
import { render } from '@testing-library/react';
import Profile from './components/Profile';


test('should render without crashing', () => {
  render(<Profile />);
});