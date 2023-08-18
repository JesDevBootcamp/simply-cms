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
			{notes.map(({ title, content, noteId }) =>
				<li className="note-list-item" key={noteId} onClick={() => callback(noteId)}>
					<h4 className="note-list-title">
						{title}
					</h4>
					<span className="note-list-content">
						{content.replace(/(.{100})..+/, "$1&hellip;")}
					</span>
				</li>
			)}
		</ul>
	);
}