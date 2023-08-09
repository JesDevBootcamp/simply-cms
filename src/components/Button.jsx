// Button: Clickable component that triggers an action.

export default function Button({ action, children }) {
	return (
		<span
			role="button"
			className="button"
			onClick={action}>
			{children}
		</span>
	);
}