// Web Page: Markdown based layout for any user-created page.

import DOMPurify from "dompurify";
import { marked } from "marked";
import { Helmet } from "react-helmet";

import "../styles/web-page.scss";

export default function WebPage({ title = "Untitled", markdown }) {
	return <>
		<Helmet>
			<title>{title}</title>
		</Helmet>
		<div className="web-page"
			dangerouslySetInnerHTML={{
				__html: DOMPurify.sanitize(marked.parse(markdown))
			}}
		/>
	</>;
}