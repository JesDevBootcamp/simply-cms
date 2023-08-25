// Use Login: React useState hook that redirects based on login status.

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import getLogin from "./getLogin";

export default function Login(redirect = false) {
	// Create state for current login presence:
	const [login, setLogin] = useState(null);

	// Create route navigation hook for redirects:
	const navigate = useNavigate();

	// Get login presence then redirect:
	useEffect(() => {
		(async() => {
			// If logged in redirect if truthy:
			if (login === true && !!redirect) {
				navigate(redirect);
			}
			// If logged out redirect to root:
			if (login === false) {
				navigate("/", { replace: true });
			}
			// Get and set current login presence:
			setLogin(await getLogin() !== false);
		})();
	}, [login]);

	// Return useState login hook:
	return [login, setLogin];
}