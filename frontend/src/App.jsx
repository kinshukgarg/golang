
import { useState, useEffect } from 'react';

import './App.css'; 

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/notes')
      .then((response) => response.json())
      .then((data) => setNotes(data));
  }, []);

  const handleCreateNote = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/notes/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    })
      .then((response) => response.json())
      .then((newNote) => setNotes([...notes, newNote]));
  };

  return (
    <div className="App">
      <h1>Notes</h1>
      <form onSubmit={handleCreateNote}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />
        <button type="submit">Add Note</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.ID}>
            <h2>{note.Title}</h2>
            <p>{note.Content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
