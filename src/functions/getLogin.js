// Get Login: Sends a login GET request and returns data.

import axios from "axios";

export default async function getLogin() {
	// Send GET request to verify login:
	const { data } = await axios.get("/api/login/");

	// Return response data:
	return data;
}