// Logout: Displays contents if logged out:

import Verified from "./Verified";

export default function Logout({ children }) {
	return <Verified logout={children} />
}