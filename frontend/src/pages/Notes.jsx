import React, { useState, useEffect } from 'react';
import API from '../services/api';
import '../styles/notes.css';  // <-- Import the new CSS file

import { useNavigate } from 'react-router-dom';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await API.get('/notes');
        setNotes(res.data);
      } catch (err) {
        alert("Session expired or not logged in. Redirecting to login.");
        navigate('/login');
      }
    };
    fetchNotes();
  }, [navigate]);

  const handleCreateNote = async () => {
    try {
      const res = await API.post('/notes', { title, content });
      setNotes([...notes, res.data]);
      setTitle('');
      setContent('');
    } catch (err) {
      alert("Failed to create note.");
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await API.delete(`/notes/${noteId}`);
      setNotes(notes.filter(note => note.id !== noteId));
    } catch (err) {
      alert("Failed to delete note.");
    }
  };

  const startEdit = (note) => {
    setEditId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleUpdateNote = async () => {
    try {
      await API.put(`/notes/${editId}`, { title, content });
      const updatedNotes = notes.map(n =>
        n.id === editId ? { ...n, title, content } : n
      );
      setNotes(updatedNotes);
      setEditId(null);
      setTitle('');
      setContent('');
    } catch (err) {
      alert("Failed to update note.");
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setTitle('');
    setContent('');
  };

  return (
    <div className="notes-container">
      <h2>{editId ? 'Edit Note' : 'Your Notes'}</h2>

      <div className="note-form">
        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Note content"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        {editId ? (
          <>
            <button onClick={handleUpdateNote}>Update</button>
            <button onClick={cancelEdit}>Cancel</button>
          </>
        ) : (
          <button onClick={handleCreateNote}>Add Note</button>
        )}
      </div>

      <div className="notes-list">
        {notes.map(note => (
          <div key={note.id} className="note-card">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => startEdit(note)}>Edit</button>
            <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
