// Put Login: Sends PUT request to add login information and returns boolean.

import axios from "axios";

export default async function putLogin(email, password) {
	// Send PUT request to add login information:
	const { data } = await axios.put("/api/login/", { email, password });

	// Return response data boolean:
	return data;
}