// Rendered Note: Renders HTML from Markdown for any created note.

import DOMPurify from "dompurify";
import { marked } from "marked";
import { useEffect, useState } from "react";

import getNote from "../functions/getNote";

import "../styles/rendered-note.scss";

export default function RenderedNote({ id }) {
	// Create state for Markdown content:
	const [markdown, setMarkdown] = useState("");

	// Update rendered content on ID change:
	useEffect(() => {
		(async() => {
			const { content } = await getNote(id);
			setMarkdown(content || "");
		})();
	}, [id]);

	// Return rendered sanitized Markdown note:
	return (
		<div className="rendered-note"
			dangerouslySetInnerHTML={{
				__html: DOMPurify.sanitize(marked.parse(markdown))
			}}
		/>
	);
}