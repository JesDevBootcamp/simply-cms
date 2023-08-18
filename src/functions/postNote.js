// Post Note: Sends POST request to update note and returns boolean.

import axios from "axios";

export default async function postNote(title, content, id) {
	// Send POST request to update note data:
	const { data } = await axios.post("/api/notes/", { title, content, id });

	// Return response data boolean:
	return data;
}