// Put Login: Sends PUT request to add login information and runs callbacks.

import axios from "axios";

export default async function putLogin(email, password, success, failure) {
	// Send PUT request to add login information:
	const { data } = await axios.put("/api/login/", { email, password });

	// Run callback function based on data boolean:
	if (success && failure) {
		!!data ? success() : failure();
	}

	// Return response data boolean:
	return data;
}