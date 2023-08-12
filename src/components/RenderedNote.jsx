// Rendered Note: Renders HTML from Markdown for any created note.

import DOMPurify from "dompurify";
import { marked } from "marked";
import { useEffect, useState } from "react";
import axios from "axios";

import "../styles/rendered-note.scss";

export default function RenderedNote({ id }) {
	// Create state for Markdown content:
	const [markdown, setMarkdown] = useState("");

	// Update rendered content on ID change:
	useEffect(() => {
		(async () => {
			try {
				// Get page data from axios API call:
				const { data } = await axios.get(`/api/notes/${id}`);

				// Set the Markdown state:
				setMarkdown(data.content);
			}
			catch (error) {
				console.error("The following error occurred:", error);
			}
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