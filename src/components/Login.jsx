// Login: Displays contents if logged in:

import Verified from "./Verified";

export default function Login({ children }) {
	return <Verified login={children} />
}