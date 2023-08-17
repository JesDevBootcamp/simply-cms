// Login Modal: Simple modal with a login form and welcome header.

import { useState, useEffect } from "react";

import Heading from "./Heading";
import TextField from "./TextField";
import Button from "./Button";

import postLogin from "../functions/postLogin";
import putLogin from "../functions/putLogin";
import getLogin from "../functions/getLogin";

import "../styles/login-modal.scss";

export default function LoginModal() {
	// Create state for if the modal is open:
	const [modal, setModal] = useState(true);

	// Display modal based on login status:
	useEffect(() => {
		(async () => {
			setModal(await getLogin() === false);
		})();
	}, []);

	// Create states for email and password:
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// Login authentication handler:
	async function loginHandler(event) {
		// Prevent default page reload:
		event.preventDefault();

		// Close modal or reset password on POST:
		await postLogin(email, password) ? setModal(false) : setPassword("");
	}

	// User sign-up handler:
	async function signUpHandler(event) {
		// Put login info into database:
		await putLogin(email, password);
		// Run login handler:
		loginHandler(event);
	}

	return (
		<dialog className="login-modal" open={modal}>
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