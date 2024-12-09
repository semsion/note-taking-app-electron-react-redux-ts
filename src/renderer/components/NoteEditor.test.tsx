import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store';
import NoteEditor from './NoteEditor';

describe('NoteEditor', () => {
  it('should render NoteEditor component', () => {
    render(
      <Provider store={store}>
        <NoteEditor />
      </Provider>
    );
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Content')).toBeInTheDocument();
  });

  it('should add a new note', () => {
    render(
      <Provider store={store}>
        <NoteEditor />
      </Provider>
    );
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Test Note' } });
    fireEvent.change(screen.getByPlaceholderText('Content'), { target: { value: 'This is a test note.' } });
    fireEvent.click(screen.getByText('Save Note'));
    const state = store.getState().notes;
    expect(state.notes).toContainEqual(expect.objectContaining({ title: 'Test Note', content: 'This is a test note.' }));
  });
});