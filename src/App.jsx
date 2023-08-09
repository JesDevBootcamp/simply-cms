// App: Component containing the entire application.

import { Route, Routes } from "react-router-dom";

import SetupPage from "./pages/SetupPage";
import LoginPage from "./pages/LoginPage";
import EditorPage from "./pages/EditorPage";
import WebPage from "./pages/WebPage";

export default function App() {
	return (
		<Routes>
			<Route path="/setup" element={<SetupPage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/editor" element={<EditorPage />} />
			<Route element={<WebPage />} path="*" />
		</Routes>
	);
}