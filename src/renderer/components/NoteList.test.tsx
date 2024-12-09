import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store, { addNote } from '../store';
import NoteList from './NoteList';

describe('NoteList', () => {
  // Reset store before each test
  beforeEach(() => {
    store.dispatch({ type: 'notes/reset' });
  });

  it('should render NoteList component', () => {
    render(
      <Provider store={store}>
        <NoteList />
      </Provider>
    );
    expect(screen.getByText('Notes')).toBeInTheDocument();
  });

  it('should display notes', () => {
    const note = { id: '1', title: 'Test Note', content: 'This is a test note.' };
    store.dispatch(addNote(note));
    
    render(
      <Provider store={store}>
        <NoteList />
      </Provider>
    );
    expect(screen.getByText('Test Note')).toBeInTheDocument();
  });

  it('should delete a note', async () => {
    // Add a single note
    const note = { id: '1', title: 'Test Note', content: 'This is a test note.' };
    store.dispatch(addNote(note));
    
    render(
      <Provider store={store}>
        <NoteList />
      </Provider>
    );

    // Find and click the delete button
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    // Verify the note is deleted
    const state = store.getState().notes;
    expect(state.notes).toHaveLength(0);
  });
});