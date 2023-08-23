// Rendered Note: Renders HTML from Markdown note content.

import DOMPurify from "dompurify";
import { marked } from "marked";

import "../styles/rendered-note.scss";

export default function RenderedNote({ content }) {
	// Return rendered sanitized Markdown note:
	return (
		<article className="rendered-note"
			dangerouslySetInnerHTML={{
				__html: DOMPurify.sanitize(marked.parse(content))
			}}
		/>
	);
}