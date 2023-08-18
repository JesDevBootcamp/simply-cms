// Delete Note: Sends a DELETE request to remove user note.

import axios from "axios";

export default async function deleteNote(id) {
	// Send DELETE request to remove note data:
	const { data } = await axios.delete("/api/notes/" + id);

	// Return response data boolean:
	return data;
}