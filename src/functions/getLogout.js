// Get Logout: Sends a logout GET request.

import axios from "axios";

export default async function getLogout() {
	// Send GET request to logout:
	const { data } = await axios.get("/api/logout/");

	// Return response data:
	return data;
}