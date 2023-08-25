// Login: Renders Notification when logged in and otherwise navigates to root.

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import Notification from "./Notification";

import getLogin from "../functions/getLogin";

export default function Login() {
	// Create state for current login presence:
	const [login, setLogin] = useState(true);

	// Default login state to current presence:
	useEffect(() => {
		(async() => setLogin(await getLogin() !== false))();
	}, []);

	// Render Notification if logged in otherwise navigate to root:
	return login && (
		<Notification message="Successfully Logged In." /> 
	) || <Navigate to="/" />;
}