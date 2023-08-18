// Delete Login: Sends a DELETE request to remove user login.

import axios from "axios";

export default async function deleteLogin() {
	// Send DELETE request to remove user:
	const { data } = await axios.delete("/api/login/");

	// Return response data boolean:
	return JSON.parse(data);
}