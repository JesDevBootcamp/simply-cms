// Editor Page: Page for editing and creating notes.

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/editor-page.scss";

export default function EditorPage() {
	// Navigate to login page if user not logged in:
	const navigate = useNavigate();
	useEffect(() => {
		axios.get("/api/login/").then(response => {
			if (response.data === false) {
				navigate("/");
			}
		});
	}, []);

	return (
		<div className="editor-page">
			<div className="editor-page-preview">
				Webpage preview goes here!
			</div>
		</div>
	);
}