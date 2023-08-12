// Heading: Displays a title and/or subtitle.

import "../styles/heading.scss";

export default function Heading({ title, subtitle }) {
	return (
		<header className="heading">
			<h1 className="heading-title">{title}</h1>
			{subtitle &&
			<h2 className="heading-subtitle">{subtitle}</h2>}
		</header>
	);
}