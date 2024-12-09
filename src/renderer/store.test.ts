import store, { addNote, updateNote, deleteNote, selectNote, clearSelectedNote, toggleTheme } from './store';

describe('notesSlice', () => {
  it('should add a note', () => {
    const note = { id: '1', title: 'Test Note', content: 'This is a test note.' };
    store.dispatch(addNote(note));
    const state = store.getState().notes;
    expect(state.notes).toContainEqual(note);
  });

  it('should update a note', () => {
    const note = { id: '1', title: 'Updated Note', content: 'This is an updated test note.' };
    store.dispatch(updateNote(note));
    const state = store.getState().notes;
    expect(state.notes).toContainEqual(note);
  });

  it('should delete a note', () => {
    store.dispatch(deleteNote('1'));
    const state = store.getState().notes;
    expect(state.notes).not.toContainEqual(expect.objectContaining({ id: '1' }));
  });

  it('should select a note', () => {
    const note = { id: '2', title: 'Another Note', content: 'This is another test note.' };
    store.dispatch(addNote(note));
    store.dispatch(selectNote('2'));
    const state = store.getState().notes;
    expect(state.selectedNote).toEqual(note);
  });

  it('should clear selected note', () => {
    store.dispatch(clearSelectedNote());
    const state = store.getState().notes;
    expect(state.selectedNote).toBeNull();
  });
});

describe('themeSlice', () => {
  it('should toggle theme', () => {
    const initialTheme = store.getState().theme;
    store.dispatch(toggleTheme());
    const newTheme = store.getState().theme;
    expect(newTheme).not.toBe(initialTheme);
  });
});