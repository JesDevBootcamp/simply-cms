// Notification: Displays a dismissable popover notification.

import { useEffect, useState } from "react";

import "../styles/notification.scss";

export default function Notification({ message, callback, show = true }) {
	// Create state for whether notification is open:
	const [open, setOpen] = useState(show);

	// Set open state when show property changes:
	useEffect(() => setOpen(show), [show]);

	// Create handler for closing notification: 
	function closeHandler() {
		setOpen(false);
		callback(false);
	}

	return open && (
		<article
			className="notification"
			onAnimationEnd={closeHandler}>
			<span
				className="notification-message">
				{message}
			</span>
			<button
				className="notification-close"
				onClick={closeHandler}>
				&times;
			</button>
		</article>
	);
}