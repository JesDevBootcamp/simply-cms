// App: Express backend for our application.

import express from "express";
import ViteExpress from "vite-express";
// import bcrypt from "bcrypt";

import users from "./data/users.js";

// Setup Express instance:
const app = express();

// Setup HTTP port:
const port = 8080;

// Mount Express Middleware:
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());

// Configure Vite Express:
ViteExpress.config({ printViteDevServerHost: true });

// Route to get all users:
app.get("/api/users/", async (req, res) => {
	// Send out test user data:
	res.json(users);
});

// Route to validate user login:
app.post("/api/login/", async (req, res) => {
	const { username, password } = req.body;

	console.log(username, password);

	// const passwordMatch = await bcrypt.compare(password, user.password);

	res.send(true);
});

// Setup Vite Express and listen to port:
ViteExpress.listen(app, port, () => {
	console.log(`Server is listening on http://localhost:${port}`);
});