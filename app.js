// App: Express backend for our application.

import express from "express";
import ViteExpress from "vite-express";
// import bcrypt from "bcrypt";

import { Page } from "./sequelize/models.js";

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

// Route to get page with certain URI slug:
app.get("/api/pages/:slug", async (req, res) => {
	// Get decoded slug within parameters:
	const slug = decodeURIComponent(req.params.slug);

	// Get first page data where slug:
	const page = await Page.findOne({
		where: { slug: slug }
	});

	// Send either page or 404 status:
	if (page === null) {
		// Send 404 "Not Found" status:
		res.sendStatus(404);
	}
	else {
		// Send page JSON data:
		res.json(page);
	}
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