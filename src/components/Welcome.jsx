// Welcome: Displays a welcome message to the user.

export default function Welcome({ title, subtitle }) {
	return (
		<header className="Welcome">
			<h1 className="Welcome-title">{title}</h1>
			<h2 className="Welcome-subtitle">{subtitle}</h2>
		</header>
	);
}