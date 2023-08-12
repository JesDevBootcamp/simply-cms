// App: Component containing the entire application.

import { Route, Routes } from "react-router-dom";

import EditorPage from "./pages/EditorPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import WebPage from "./pages/WebPage";

import "./styles/app.scss";

export default function App() {
	return (
		<Routes>
			<Route path="editor">
				<Route index element={<EditorPage />} />
				<Route path="login" element={<LoginPage />} />
				<Route path="sign-up" element={<SignUpPage />} />
			</Route>
			<Route path=":slug" element={<WebPage />} />
		</Routes>
	);
}