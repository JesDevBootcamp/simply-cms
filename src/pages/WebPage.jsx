// Web Page: Markdown generated page for any user-created content.

import DOMPurify from "dompurify";
import { marked } from "marked";
import { useEffect } from "react";

import "../styles/web-page.scss";

export default function WebPage({ title = "Untitled", markdown }) {
	// Update the webpage title:
	useEffect(() => {
		document.title = title;
	}, [title]);

	// Return sanitized Markdown output:
	return (
		<div className="web-page"
			dangerouslySetInnerHTML={{
				__html: DOMPurify.sanitize(marked.parse(markdown))
			}}
		/>
	);
}