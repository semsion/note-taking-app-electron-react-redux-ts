import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store';
import ThemeSwitcher from './ThemeSwitcher';

describe('ThemeSwitcher', () => {
  it('should render ThemeSwitcher component', () => {
    render(
      <Provider store={store}>
        <ThemeSwitcher />
      </Provider>
    );
    expect(screen.getByText(/Switch to/i)).toBeInTheDocument();
  });

  it('should toggle theme', () => {
    render(
      <Provider store={store}>
        <ThemeSwitcher />
      </Provider>
    );
    const button = screen.getByText(/Switch to/i);
    const initialTheme = store.getState().theme;
    fireEvent.click(button);
    const newTheme = store.getState().theme;
    expect(newTheme).not.toBe(initialTheme);
  });
});