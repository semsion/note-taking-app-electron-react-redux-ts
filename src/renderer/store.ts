import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

type Note = {
  id: string;
  title: string;
  content: string;
};

type NotesState = {
  notes: Note[];
  selectedNote: Note | null;
};

const initialState: NotesState = {
  notes: [],
  selectedNote: null,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      // console.log('Adding note:', action.payload);
      state.notes.push(action.payload);
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex((note) => note.id === action.payload.id);
      if (index !== -1) state.notes[index] = action.payload;
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    selectNote: (state, action: PayloadAction<string>) => {
      state.selectedNote = state.notes.find((note) => note.id === action.payload) || null;
    },
    clearSelectedNote: (state) => {
      state.selectedNote = null;
    },
    // Add reset action for testing
    reset: () => initialState
  },
});

export const { addNote, updateNote, deleteNote, selectNote, clearSelectedNote } = notesSlice.actions;

type ThemeState = 'light' | 'dark';

const themeSlice = createSlice({
  name: 'theme',
  initialState: 'dark' as ThemeState,
  reducers: {
    toggleTheme: (state) => (state === 'light' ? 'dark' : 'light'),
  },
});

export const { toggleTheme } = themeSlice.actions;

const store = configureStore({
  reducer: {
    notes: notesSlice.reducer,
    theme: themeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
