// App: Component containing the entire application.

import { Route, Routes } from "react-router-dom";

import SetupPage from "./pages/SetupPage";
import LoginPage from "./pages/LoginPage";
import EditorPage from "./pages/EditorPage";
import WebPage from "./pages/WebPage";

import "./styles/app.scss";

export default function App() {
	return (
		<Routes>
			<Route path="/editor">
				<Route index element={<EditorPage />} />
				<Route path="login" element={<LoginPage />} />
				<Route path="setup" element={<SetupPage />} />
			</Route>
			<Route path="*" element={<WebPage />} />
		</Routes>
	);
}