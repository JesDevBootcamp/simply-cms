// Note List: Scrollable list of all user notes.

import { useState, useEffect } from "react";
import getNotes from "../functions/getNotes";

export default function NoteList({ callback }) {
	// Create state for user notes:
	const [notes, setNotes] = useState([]);

	// Get array of all user notes:
	useEffect(() => {
		(async () => setNotes(await getNotes() || []))();
	}, []);

	return (
		<ul className="note-list">
			{notes.map(note =>
				<li className="note-list-item" onClick={() => callback(note)} key={note.noteId}>
					<h4 className="note-list-title">
						{note.title}
					</h4>
					<span className="note-list-content">
						{note.content.replace(/(.{100})..+/, "$1&hellip;")}
					</span>
				</li>
			)}
		</ul>
	);
}