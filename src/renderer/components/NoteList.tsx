import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { deleteNote, selectNote } from '../store';

const NoteList = () => {
  const notes = useSelector((state: RootState) => state.notes.notes);
  const dispatch = useDispatch();

  return (
    <div className="note-list">
      <h2>Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => dispatch(deleteNote(note.id))}>Delete</button>
            <button onClick={() => dispatch(selectNote(note.id))}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;