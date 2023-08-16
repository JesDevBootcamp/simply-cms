// Post Login: Sends a POST request and runs callback function on response.

import axios from "axios";

export default async function postLogin(email, password, valid, invalid) {
	// Send POST request to verify login:
	const { data } = await axios.post("/api/login/", { email, password });

	// Run callback function based on data boolean:
	if (valid && invalid) {
		!!data ? valid() : invalid();
	}

	// Return response data boolean:
	return data;
}