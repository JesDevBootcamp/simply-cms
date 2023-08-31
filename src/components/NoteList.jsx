// Note List: Scrollable list of all user notes.

import "../styles/note-list.scss";

export default function NoteList({ list, active, callback }) {
	return (
		<ul className="note-list">
			{list.map((note) => (
				<li
					key={note.noteId}
					tabIndex={0}
					className={`note-list-item ${active == note.noteId ? "active" : ""}`}
					onFocus={() => callback(note)}>
					<strong>{note.title}</strong>
				</li>
			))}
		</ul>
	);
}