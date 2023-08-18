// Get Login: Sends a login GET request and returns data.

import axios from "axios";

export default async function getLogin() {
	// Grab login state from session storage:
	const login = sessionStorage.getItem("login") || "false";

	// Run if no login in storage:
	if (login === "false") {
		// Send GET request to verify login:
		const { data } = await axios.get("/api/login/");
		// Set login session to response:
		sessionStorage.setItem("login", JSON.stringify(data));
	}

	// Return response data:
	return JSON.parse(login);
}