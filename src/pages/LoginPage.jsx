// Login Page: Simple page with a login form and welcome header.

import { Navigate } from "react-router-dom";

import Welcome from "../components/Welcome";
import TextField from "../components/TextField";
import Button from "../components/Button";
import NavList from "../components/NavList";

export default function LoginPage() {
	const siteTitle = "Welcome!";

	if (!siteTitle) {
		return <Navigate to="/admin/sign-up" />;
	}

	function loginHandler() {
		alert("LOGGED IN!");
		return <Navigate to="/admin/editor" />;
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
			<NavList links={{
				"Sign-up": "/admin/sign-up/"
			}}></NavList>
		</main>
	);
}