// Note List: Scrollable list of all user notes.

import { useState } from "react";

import "../styles/note-list.scss";

export default function NoteList({ list, callback }) {
	// Create state for active note item:
	const [active, setActive] = useState(list[0].noteId);

	return (
		<ul className="note-list">
			{list.map((note) => (
				<li
					key={note.noteId}
					tabIndex={0}
					className={`note-list-item ${active == note.noteId ? "active" : ""}`}
					onFocus={() => {
						setActive(note.noteId);
						callback(note);
					}}>
					<strong>{note.title}</strong>
				</li>
			))}
		</ul>
	);
}