// Put Note: Sends PUT request to add note and returns boolean.

import axios from "axios";

export default async function putNote(title, content) {
	// Send PUT request to add note information:
	const { data } = await axios.put("/api/notes/", { title, content });

	// Return response data boolean:
	return data;
}