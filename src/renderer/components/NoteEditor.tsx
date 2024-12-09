import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, updateNote, clearSelectedNote, RootState } from '../store';

const NoteEditor = () => {
  const dispatch = useDispatch();
  const selectedNote = useSelector((state: RootState) => state.notes.selectedNote);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [selectedNote]);

  const saveNote = () => {
    if (title) {
      if (selectedNote) {
        const updatedNote = { ...selectedNote, title, content };
        // console.log('Dispatching updateNote:', updatedNote);
        dispatch(updateNote(updatedNote));
        dispatch(clearSelectedNote());
      } else {
        const newNote = { id: Date.now().toString(), title, content };
        // console.log('Dispatching addNote:', newNote);
        dispatch(addNote(newNote));
      }
      setTitle('');
      setContent('');
    }
  };

  return (
    <div className="note-editor">
      <h2>{selectedNote ? 'Edit Note' : 'New Note'}</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
      />
      <button onClick={saveNote}>{selectedNote ? 'Update Note' : 'Save Note'}</button>
      {selectedNote && <button onClick={() => dispatch(clearSelectedNote())}>Cancel</button>}
    </div>
  );
};

export default NoteEditor;
