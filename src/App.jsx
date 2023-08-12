// App: Component containing the entire application.

import { Route, Routes } from "react-router-dom";

import EditorPage from "./pages/EditorPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

import "./styles/app.scss";

export default function App() {
	return (
		<Routes>
			<Route index element={<LoginPage />} />
			<Route path="sign-up" element={<SignUpPage />} />
			<Route path="editor" element={<EditorPage />} />
		</Routes>
	);
}