import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store';
import { RootState } from '../store';

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme);

  return (
    <div style={{ marginBottom: '20px' }}>
      <button id="switcher-button" onClick={() => {
        // console.log('Toggle theme button clicked');
        dispatch(toggleTheme());
      }}
      >
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
};

export default ThemeSwitcher;