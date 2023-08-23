// Button: Clickable component that triggers an action.

import "../styles/button.scss";

export default function Button({ action, type, children }) {
	return (
		<button
			className="button"
			type={type}
			onClick={action}>
			{children}
		</button>
	);
}