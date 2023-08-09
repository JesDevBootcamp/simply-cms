// Login Page: Simple page with a login form and welcome header.

import { Navigate } from "react-router-dom";

import Welcome from "../components/Welcome";
import TextField from "../components/TextField";
import Button from "../components/Button";

export default function LoginPage() {
	const siteTitle = "Welcome!";

	if (!siteTitle) {
		alert("NO DATABASE!");
		return <Navigate to="/setup" />;
	}

	function loginHandler() {
		alert("LOGGED IN!");
		return <Navigate to="/editor" />;
	}

	return (
		<main className="login-page">
			<Welcome title={siteTitle} />
			<form className="login-page-form">
				<fieldset>
					<TextField label="Enter Username:" type="text" />
					<TextField label="Enter Password:" type="password" />
				</fieldset>
				<fieldset>
					<Button action={loginHandler}>Login</Button>
				</fieldset>
			</form>
		</main>
	);
}