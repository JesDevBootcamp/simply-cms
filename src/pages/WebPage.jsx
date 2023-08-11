// Web Page: Markdown generated page for any user-created content.

import DOMPurify from "dompurify";
import { marked } from "marked";
import { useEffect, useState } from "react";
import axios from "axios";

import "../styles/web-page.scss";

export default function WebPage({ id }) {
	// Create state for Markdown content:
	const [markdown, setMarkdown] = useState("");

	// Update page title and content on page ID change:
	useEffect(async () => {
		// Get the title and markdown content for page:
		const { title, content } = await axios.get(`/api/pages/${id}`);

		// Update the webpage title:
		document.title = title;

		// Set the Markdown state:
		setMarkdown(content);
	}, [id]);

	// Return sanitized Markdown output:
	return (
		<div className="web-page"
			dangerouslySetInnerHTML={{
				__html: DOMPurify.sanitize(marked.parse(markdown))
			}}
		/>
	);
}