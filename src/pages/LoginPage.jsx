// Login Page: Simple page with a login form and welcome header.

import Welcome from "../components/Welcome";
import TextField from "../components/TextField";
import Button from "../components/Button";

export default function LoginPage() {
	function signUpHandler() {
		return null;
	}

	function loginHandler() {
		return null;
	}

	return <>
		<Welcome
			title="Welcome!"
			subtitle="Login or Sign-up:"
		/>
		<form>
			<fieldset>
				<TextField
					label="Enter User Email:"
					type="email"
				/>
				<TextField
					label="Enter Password:"
					type="password"
				/>
			</fieldset>
			<fieldset>
				<Button action={signUpHandler}>Sign-up</Button>
				<Button action={loginHandler}>Login</Button>
			</fieldset>
		</form>
	</>;
}