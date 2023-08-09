// App: Component containing the entire application.

import { Route, Routes } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";
import PageLayout from "./layouts/PageLayout";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import SettingsPage from "./pages/SettingsPage";
import EditorPage from "./pages/EditorPage";

export default function App() {
	return (
		<Routes>
			<Route element={<AdminLayout />} path="admin/">
				<Route index element={<LoginPage />} />
				<Route path="sign-up/" element={<SignUpPage />} />
				<Route path="settings/" element={<SettingsPage />} />
				<Route path="editor/" element={<EditorPage />} />
			</Route>
			<Route element={<PageLayout />} path="*" />
		</Routes>
	);
}