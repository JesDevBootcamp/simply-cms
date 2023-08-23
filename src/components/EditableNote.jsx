// Editable Note: Simple editable note that autosaves.

import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

import postNote from "../functions/postNote";

import "../styles/editable-note.scss";

export default function EditableNote({ note, callback }) {
	// Create state for note content:
	const [content, setContent] = useState("");

	// Initially set note content:
	useEffect(() => setContent(note.content), [note]);

	// Automatically save note and run callback on change:
	useEffect(() => {
		const timer = setTimeout(async () => {
			const title = content.substring(0, 60) || "No Content";
			const post = await postNote(title, content, note.noteId);
			callback(post);
		}, 350);
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
				setContent(DOMPurify.sanitize(event.target.value));
			}}
		/>
	);
}