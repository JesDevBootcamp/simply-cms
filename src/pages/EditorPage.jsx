// Editor Page: Page for editing and creating notes.

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import getLogin from "../functions/getLogin";

import "../styles/editor-page.scss";

export default function EditorPage() {
	// Create state for current login presence:
	const [login, setLogin] = useState(true);

	// Default login state to current presence:
	useEffect(() => {
		(async() => setLogin(await getLogin() !== false))();
	}, []);

	return login && (
		<div className="editor-page"></div>
	) || <Navigate to="/" />;
}