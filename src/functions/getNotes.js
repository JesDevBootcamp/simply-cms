// Get Notes: Sends a GET request and returns user note data.

import axios from "axios";

export default async function getNotes() {
	// Send GET request for user notes:
	const { data } = await axios.get("/api/notes/");

	// Return response data array:
	return data;
}