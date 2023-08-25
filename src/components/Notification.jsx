// Notification: Displays a dismissable popover notification.

import { useState } from "react";

import "../styles/notification.scss";

export default function Notification({ message }) {
	// Create state for whether notification is open:
	const [open, setOpen] = useState(true);

	return open && (
		<article
			className="notification"
			onTransitionEnd={() => setOpen(false)}>
			<span
				className="notification-message">
				{message}
			</span>
			<button
				className="notification-close"
				onClick={() => setOpen(false)}>
				&times;
			</button>
		</article>
	);
}