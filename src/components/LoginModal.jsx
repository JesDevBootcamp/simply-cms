// Login Modal: Simple modal with a login form and welcome header.

import { useEffect, useState } from "react";

import Heading from "./Heading";
import TextField from "./TextField";
import Button from "./Button";

import getLogin from "../functions/getLogin";
import postLogin from "../functions/postLogin";
import putLogin from "../functions/putLogin";

import "../styles/login-modal.scss";

export default function LoginModal() {
	// Create state for current display presence:
	const [open, setOpen] = useState(true);

	// Create event listener callback function:
	const listener = async () => setOpen(await getLogin() === false);

	// Update open state given login status:
	useEffect(() => {
		// Create and run "login" event listener:
		(async () => {
			window.addEventListener("login", listener);
			await listener();
		})();

		// Cleanup "login" event listener on unmount:
		return () => {
			window.removeEventListener("login", listener);
		};
	}, [open]);

	// Create states for email and password:
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// Login authentication handler:
	async function loginHandler(event) {
		// Prevent default page reload:
		event.preventDefault();

		// POST login and set display state if true:
		await postLogin(email, password) && setOpen(false);

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

	return (
		<dialog className="login-modal" open={open}>
			<Heading title="Simply Notes!" subtitle="Login or Sign-up:" />
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