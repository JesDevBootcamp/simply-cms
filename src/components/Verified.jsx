// Verified: Displays differing content whether logged in or not.

import axios from "axios";
import { useState, useEffect } from "react";

export default function Verified({ login, logout }) {
	// Create state for content output:
	const [content, setContent] = useState();

	// Set content based on login status:
	useEffect(() => {
		axios.get("/api/login/").then(response => {
			if (response.data === true) {
				// Set logged in content:
				setContent(login);
			}
			else {
				// Set logged out content:
				setContent(logout);
			}
		});
	}, [login, logout]);

	// Return content:
	return <>{content}</>;
}