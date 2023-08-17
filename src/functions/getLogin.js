// Get Login: Sends a login GET request and runs callback.

import axios from "axios";

export default async function getLogin(truthy, falsy) {
	// Grab login state from session storage:
	const login = sessionStorage.getItem("login") || "false";

	// Run if current login invalid:
	if (login === "false") {
		// Send GET request to verify login:
		const { data } = await axios.get("/api/login/");
		// Set login session to response:
		sessionStorage.setItem("login", data);
	}

	// Run callback function based on data:
	if (truthy && falsy) {
		(login === "false") ? falsy() : truthy();
	}

	// Return response data:
	return login;
}