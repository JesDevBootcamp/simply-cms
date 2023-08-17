// Get Logout: Sends a logout GET request.

import axios from "axios";

export default async function getLogout() {
	// Send GET request to logout:
	const { data } = await axios.get("/api/logout/");

	// Remove login state from session storage:
	sessionStorage.removeItem("login");

	// Return response data:
	return JSON.parse(data);
}