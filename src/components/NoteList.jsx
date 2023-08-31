// Note List: Scrollable list of all user notes.

import "../styles/note-list.scss";

export default function NoteList({ list, callback }) {
	return (
		<ul className="note-list">
			{list.map((note) => (
				<li className="note-list-item"
					onClick={() => callback(note)}
					onKeyUp={() => callback(note)}
					key={note.noteId}
					tabIndex={0}>
					<strong>{note.title}</strong>
				</li>
			))}
		</ul>
	);
}