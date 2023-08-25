// Login: Redirects based on current login status.

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import getLogin from "../functions/getLogin";

export default function Login({ redirect = false }) {
	// Create state for current login presence:
	const [login, setLogin] = useState(null);

	// Set current login presence if not true:
	useEffect(() => {
		if (login !== true) {
			(async() => {
				setLogin(await getLogin() !== false);
			})();
		}
	});

	// Redirect based on login state:
	return <>
		{login === true && !!redirect && (
			<Navigate to={redirect} />
		)}
		{login === false && (
			<Navigate to="/" replace={true} />
		)}
	</>;
}