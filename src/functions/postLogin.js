// Post Login: Sends a login POST request and returns boolean.

import axios from "axios";

export default async function postLogin(email, password) {
	// Send POST request to verify login:
	const { data } = await axios.post("/api/login/", { email, password });

	// Dispatch custom "login" event:
	window.dispatchEvent(new CustomEvent("login", {
		cancelable: false
	}));

	// Return response data boolean:
	return JSON.parse(data);
}