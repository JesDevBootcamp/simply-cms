// Login Page: Simple page with a login form and welcome header.

import { useState } from "react";

import Heading from "../components/Heading";
import TextField from "../components/TextField";
import Button from "../components/Button";

import postLogin from "../functions/postLogin";
import putLogin from "../functions/putLogin";
import useLogin from "../functions/useLogin"

import "../styles/login-page.scss";

export default function LoginPage() {
	// Create state for current login presence:
	const [login, setLogin] = useLogin("editor");

	// Create states for email and password:
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// Login authentication handler:
	async function loginHandler(event) {
		// Prevent default page reload:
		event.preventDefault();

		// PUT login info into database when no account:
		await putLogin(email, password);

		// POST login and set state if true:
		await postLogin(email, password) && setLogin(true);

		// Reset password state:
		setPassword("");
	}

	return !login && (
		<main className="login-page">
			<Heading title="Simply Notes!" subtitle="Login or Sign-up:" />
			<form className="login-page-form" onSubmit={loginHandler}>
				<fieldset>
					<TextField
						label="Enter Email:"
						type="email"
						required={true}
						value={email}
						onChange={setEmail}
					/>
					<TextField
						label="Enter Password:"
						type="password"
						required={true}
						value={password}
						onChange={setPassword}
					/>
				</fieldset>
				<Button>Login</Button>
			</form>
		</main>
	);
}