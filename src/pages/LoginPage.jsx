// Login Page: Simple page with a login form and welcome header.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Heading from "../components/Heading";
import TextField from "../components/TextField";
import Button from "../components/Button";

export default function LoginPage() {
	// Create navigation hook for editor once validated:
	const navigate = useNavigate();

	// Create states for email and password:
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// Login authentication handler:
	async function loginHandler(event) {
		// Prevent default page reload:
		event.preventDefault();

		// Send POST request to verify login:
		await axios.post("/api/login/", { email, password });

		// Navigate to editor:
		navigate("/editor");
	}

	// User sign-up handler:
	async function signUpHandler(event) {
		// Prevent default page reload:
		event.preventDefault();

		// Send PUT request to add user:
		await axios.put("/api/login/", { email, password });

		// Empty Password input:
		setPassword("");
	}

	return (
		<main className="login-page">
			<Heading title="Welcome!" subtitle="Please Login or Sign-up:" />
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
				<fieldset>
					<Button>Login</Button>
					<Button type="button" action={signUpHandler}>Sign-up</Button>
				</fieldset>
			</form>
		</main>
	);
}