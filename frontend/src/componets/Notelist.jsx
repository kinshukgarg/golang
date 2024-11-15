
import Note from './Note';

const NoteList = ({ notes, onDelete }) => {
  return (
    <div>
      {notes.length > 0 ? (
        notes.map((note) => (
          <Note key={note.id} note={note} onDelete={onDelete} />
        ))
      ) : (
        <p>No notes available.</p>
      )}
    </div>
  );
};

export default NoteList;
