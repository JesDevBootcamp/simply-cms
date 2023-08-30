// Button: Clickable component that triggers an action.

import "../styles/button.scss";

export default function Button({ action, type, variant, children }) {
	return (
		<button
			className={["button", variant].join(" ")}
			type={type}
			onClick={action}>
			{children}
		</button>
	);
}