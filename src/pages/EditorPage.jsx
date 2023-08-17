// Editor Page: Page for editing and creating notes.

import LoginModal from "../components/LoginModal";

import "../styles/editor-page.scss";

export default function EditorPage() {
	return (
		<div className="editor-page">
			<LoginModal />
		</div>
	);
}