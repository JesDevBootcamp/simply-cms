// Get Login: Sends a login GET request and runs callback.

import axios from "axios";

export default async function getLogin(truthy, falsy) {
	// Send GET request to verify login:
	const { data } = await axios.get("/api/login/");

	// Run callback function based on data:
	if (truthy && falsy) {
		(data !== false) ? truthy() : falsy();
	}

	// Return response data:
	return data;
}