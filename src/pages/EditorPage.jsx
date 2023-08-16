// Editor Page: Page for editing and creating notes.

import { Navigate } from "react-router-dom";

import Logout from "../components/Logout";

import "../styles/editor-page.scss";

export default function EditorPage() {
	return (
		<div className="editor-page">
			<Logout>
				<Navigate to="/" replace={true} />
			</Logout>
		</div>
	);
}