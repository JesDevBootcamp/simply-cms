// Account Page: Page for editing or deleting account information.

import { useState } from "react";

import Heading from "../components/Heading";
import TextField from "../components/TextField";
import Button from "../components/Button";

import getLogout from "../functions/getLogout";
import patchLogin from "../functions/patchLogin";
import postLogin from "../functions/postLogin";
import deleteLogin from "../functions/deleteLogin";
import useLogin from "../functions/useLogin";

import "../styles/account-page.scss";

export default function AccountPage() {
	// Create state for current login presence:
	const [login, setLogin] = useLogin();

	// Create states for confirming account deletion:
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// Create states for updated email and password info:
	const [newEmail, setNewEmail] = useState("");
	const [newPassword, setNewPassword] = useState("");

	// Handler to update login data:
	async function updateHandler(event) {
		// Prevent default page reload:
		event.preventDefault();

		// Update login information:
		await patchLogin(newEmail, newPassword);

		// Logout user if signed-in:
		await getLogout() && setLogin(false);
	}

	// Handler to delete login data:
	async function deleteHandler(event) {
		// Prevent default page reload:
		event.preventDefault();

		// Delete all login information if valid login:
		if (await postLogin(email, password)) {
			// Delete login information:
			await deleteLogin();

			// Logout user if signed-in:
			await getLogout() && setLogin(false);
		}
		// Otherwise reset password state:
		else {
			setPassword("");
		}
	}

	return login && (
		<main className="account-page">
			<Heading title="Simply Notes!" />
			<form className="account-page-update" onSubmit={updateHandler}>
				<Heading subtitle="Update Account:" />
				<fieldset>
					<TextField
						label="Enter New Email:"
						type="email"
						required={true}
						value={newEmail}
						onChange={setNewEmail}
					/>
					<TextField
						label="Enter New Password:"
						type="password"
						required={true}
						value={newPassword}
						onChange={setNewPassword}
					/>
				</fieldset>
				<Button>Update Account</Button>
			</form>
			<form className="account-page-delete" onSubmit={deleteHandler}>
				<Heading subtitle="Delete Account:" />
				<fieldset>
					<TextField
						label="Confirm Email:"
						type="email"
						required={true}
						value={email}
						onChange={setEmail}
					/>
					<TextField
						label="Confirm Password:"
						type="password"
						required={true}
						value={password}
						onChange={setPassword}
					/>
				</fieldset>
				<Button variant="danger">Delete Account</Button>
			</form>
		</main>
	);
}