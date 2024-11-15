
import  { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Fetch notes from the backend
    fetch('http://localhost:8080/notes')
      .then((response) => response.json())
      .then(setNotes);
  }, []);

  const addNote = (newNote) => {
    fetch('http://localhost:8080/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNote),
    })
      .then((response) => response.json())
      .then((note) => setNotes((prevNotes) => [...prevNotes, note]));
  };

  const deleteNote = (id) => {
    fetch(`http://localhost:8080/notes/${id}`, { method: 'DELETE' })
      .then(() => setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id)));
  };

  return (
    <div className="App">
      <h1>Notes</h1>
      <NoteForm onSubmit={addNote} />
      <NoteList notes={notes} onDelete={deleteNote} />
    </div>
  );
}

export default App;
