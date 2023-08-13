// App: Component containing the entire application.

import { Route, Routes } from "react-router-dom";

import EditorPage from "./pages/EditorPage";
import LoginPage from "./pages/LoginPage";

import "./styles/app.scss";

export default function App() {
	return (
		<Routes>
			<Route index element={<LoginPage />} />
			<Route path="editor" element={<EditorPage />} />
		</Routes>
	);
}