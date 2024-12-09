import React from 'react';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import ThemeSwitcher from './components/ThemeSwitcher';
import { useSelector } from 'react-redux';
import { RootState } from './store';

const App = () => {
  const theme = useSelector((state: RootState) => state.theme);

  return (
    <div className="app-container" data-theme={theme}>
      <ThemeSwitcher />
      <div style={{ display: 'flex' }}>
        <NoteEditor />
        <NoteList />
      </div>
    </div>
  );
};

export default App;