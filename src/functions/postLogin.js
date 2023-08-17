// Post Login: Sends a POST request and returns boolean.

import axios from "axios";

export default async function postLogin(email, password) {
	// Send POST request to verify login:
	const { data } = await axios.post("/api/login/", { email, password });

	// Return response data boolean:
	return JSON.parse(data);
}