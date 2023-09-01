// Login Page: Simple page with a login form and welcome header.

import { useState } from "react";

import Heading from "../components/Heading";
import TextField from "../components/TextField";
import Button from "../components/Button";
import Notification from "../components/Notification";

import postLogin from "../functions/postLogin";
import putLogin from "../functions/putLogin";
import useLogin from "../functions/useLogin"

import "../styles/login-page.scss";

export default function LoginPage() {
	// Create state for login alert notification:
	const [alert, setAlert] = useState(false);

	// Create state for current login presence:
	const [login, setLogin] = useLogin("editor");

	// Create states for email and password:
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// Login authentication handler:
	async function loginHandler(event) {
		// Prevent default page reload:
		event.preventDefault();

		// POST login and set state if true, alert if false:
		await postLogin(email, password) ? setLogin(true) : setAlert(true);

		// Reset password state:
		setPassword("");
	}

	// User sign-up handler:
	async function signUpHandler(event) {
		// PUT login info into database:
		await putLogin(email, password);

		// Run login handler:
		loginHandler(event);
	}

	return !login && <>
		<Notification
			message="Login authentication failed, try another email or password."
			show={alert} callback={setAlert} />
		<main className="login-page">
			<Heading title="Simply Notes!" subtitle="Login or Sign-up:" />
			<form className="login-page-form" onSubmit={loginHandler}>
				<fieldset className="login-page-inputs">
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
				<fieldset className="login-page-buttons">
 					<Button>Login</Button>
 					<Button variant="success" type="button" action={signUpHandler}>Sign-up</Button>
 				</fieldset>
			</form>
		</main>
	</>;
}