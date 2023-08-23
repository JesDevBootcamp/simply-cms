// Note Controls: Controls for creating and deleting notes.

import Button from "./Button";

import putNote from "../functions/putNote";
import deleteNote from "../functions/deleteNote";

import "../styles/note-controls.scss";

export default function NoteControls({ note, callback }) {
	// Handler for putting a note in database:
	async function putHandler() {
		callback(await putNote());
	}

	// Handler for deleting a note in database:
	async function deleteHandler() {
		await deleteNote(note.noteId);
		callback(false);
	}

	return (
		<span className="note-controls">
			<Button action={putHandler}>Create</Button>
			<Button action={deleteHandler}>Delete</Button>
		</span>
	);
}