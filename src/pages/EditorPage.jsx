// Editor Page: Page for editing and creating notes.

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Button from "../components/Button";
import NoteList from "../components/NoteList";
import EditableNote from "../components/EditableNote";
import RenderedNote from "../components/RenderedNote";
import NoteControls from "../components/NoteControls";

import getLogout from "../functions/getLogout";
import getNotes from "../functions/getNotes";
import putNote from "../functions/putNote";
import useLogin from "../functions/useLogin";

import "../styles/editor-page.scss";

export default function EditorPage() {
	// Create state for current login presence:
	const [login, setLogin] = useLogin();

	// Handler to logout user:
	async function logoutHander() {
		await getLogout();
		setLogin(false);
	}

	// Create states for user notes:
	const [allNotes, setAllNotes] = useState(false);
	const [note, setNote] = useState(false);

	// Initialize note state data:
	useEffect(() => {
		(async() => {
			// Get array of all notes in database:
			let array = await getNotes();
			// Put note in database and array if none:
			array = array.length !== 0 ? array : [await putNote()];
			// If not set note is first in array:
			!note && setNote(array[0]);
			// Set all notes to those in array:
			setAllNotes(array);
		})();
	}, [note]);

	// Create state for whether the controls are active:
	const [controls, setControls] = useState("active");

	return login && (
		<main className="editor-page">
			<div onClick={() => setControls("")}>
				<div className="editor-page-nav">
					<Link to="/account">
						<Button variant="info">Manage Account</Button>
					</Link>
					<Button action={logoutHander} variant="warning">Logout</Button>
				</div>
				<div className="editor-page-content">
					{note && <>
						<RenderedNote content={note.content} />
					</>}
				</div>
			</div>
			<div
				className={["editor-page-controls", controls].join(" ")}
				onClick={() => setControls("active")}>
				{note && <>
					<NoteList list={allNotes} active={note.noteId} callback={setNote} />
					<EditableNote note={note} callback={setNote} />
					<NoteControls note={note} callback={setNote} />
				</>}
			</div>
		</main>
	);
}