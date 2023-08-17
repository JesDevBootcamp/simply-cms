// Login Modal: Simple modal with a login form and welcome header.

import { useEffect, useState } from "react";

import Heading from "./Heading";
import TextField from "./TextField";
import Button from "./Button";

import postLogin from "../functions/postLogin";
import putLogin from "../functions/putLogin";
import getLogin from "../functions/getLogin";

import "../styles/login-modal.scss";

export default function LoginModal() {
	// Create state for current login presence:
	const [login, setLogin] = useState(false);

	// Create event listener callback function:
	const listener = async () => setLogin(await getLogin());

	// Initially run event listener:
	(async () => await listener())();

	// Set login state on custom "login" event:
	useEffect(() => {
		window.addEventListener("login", listener);
	}, []);

	// Create states for email and password:
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// Login authentication handler:
	async function loginHandler(event) {
		// Prevent default page reload:
		event.preventDefault();

		// POST login state and reset password:
		await postLogin(email, password);
		setPassword("");
	}

	// User sign-up handler:
	async function signUpHandler(event) {
		// PUT login info into database:
		await putLogin(email, password);
		// Run login handler:
		loginHandler(event);
	}

	return (
		<dialog className="login-modal" open={!login}>
			<Heading title="Login or Sign-up:" />
			<form className="login-modal-form" onSubmit={loginHandler}>
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
				<fieldset>
					<Button>Login</Button>
					<Button type="button" action={signUpHandler}>Sign-up</Button>
				</fieldset>
			</form>
		</dialog>
	);
}