// Editable Note: Simple editable note that autosaves.

import { useEffect, useState } from "react";

import postNote from "../functions/postNote";

import "../styles/editable-note.scss";

export default function EditableNote({ note, callback }) {
	// Create state for note content:
	const [content, setContent] = useState("");

	// Initially set note content:
	useEffect(() => setContent(note.content), [note]);

	// Automatically save note and run callback on change:
	useEffect(() => {
		// Create timer for updating content on change:
		const timer = setTimeout(async () => {
			// Get title using max of 60 characters from first line:
			let title = content.match(/.{0,60}/)[0] || "No Content";
			// Truncate any overflowing title with ellipsis:
			title = title.replace(/(.{59})./, "$1…");
			// Update note in database using POST:
			const post = await postNote(title, content, note.noteId);
			// Run callback passing in updated note:
			callback(post);
		}, 500);

		// Reset timer for updating content on change:
		return () => {
			clearTimeout(timer);
		};
	}, [content]);

	// Return sanitized note content:
	return (
		<textarea
			className="editable-note"
			value={content}
			onChange={(event) => {
				setContent(event.target.value);
			}}
		/>
	);
}