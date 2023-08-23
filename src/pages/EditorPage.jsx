// Editor Page: Page for editing and creating notes.

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import Heading from "../components/Heading";
import Button from "../components/Button";
import NoteList from "../components/NoteList";
import EditableNote from "../components/EditableNote";
import RenderedNote from "../components/RenderedNote";

import getLogin from "../functions/getLogin";
import getLogout from "../functions/getLogout";
import getNotes from "../functions/getNotes";
import putNote from "../functions/putNote";

import "../styles/editor-page.scss";

export default function EditorPage() {
	// Create state for current login presence:
	const [login, setLogin] = useState(true);

	// Default login state to current presence:
	useEffect(() => {
		(async() => setLogin(await getLogin() !== false))();
	}, []);

	// Handler to logout user:
	async function logoutHander() {
		await getLogout();
		setLogin(false);
	}

	// Create states for user notes:
	const [allNotes, setAllNotes] = useState(false);
	const [note, setNote] = useState(false);

	// Set all notes to those in database:
	useEffect(() => async () => {
		setAllNotes(await getNotes());
	}, [note]);

	// Set note to first in database:
	useEffect(() => async() => {
		const array = await getNotes();
		if (array.length !== 0) {
			setNote(array[0]);
		}
		else {
			setNote(await putNote());
		}
	}, []);

	return login ? note && (
		<main className="editor-page">
			<Heading title="Simply Notes!" />
			<div className="editor-page-controls">
				<Button action={logoutHander}>Logout</Button>
			</div>
			<div className="editor-page-content">
				<NoteList list={allNotes} callback={setNote} />
				<EditableNote note={note} callback={setNote} />
				<RenderedNote content={note.content} />
			</div>
		</main>
	) : <Navigate to="/" />;
}