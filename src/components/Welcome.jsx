// Welcome: Displays a welcome message to the user.

export default function Welcome({ title, subtitle }) {
	return (
		<header className="welcome">
			<h1 className="welcome-title">
				{title}
			</h1>
			{
				subtitle &&
				<h2 className="welcome-subtitle">
					{subtitle}
				</h2>
			}
		</header>
	);
}