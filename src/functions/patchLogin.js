// Patch Login: Sends a PATCH request to modify user login information.

import axios from "axios";

export default async function patchLogin(email, password) {
	// Send PATCH request to modify login information:
	const { data } = await axios.patch("/api/login/", { email, password });

	// Return response data boolean:
	return JSON.parse(data);
}