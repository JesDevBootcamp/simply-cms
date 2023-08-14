// App: Express backend for our application.

import express from "express";
import session from "express-session";
import ViteExpress from "vite-express";
import bcrypt from "bcrypt";

import { Note, User } from "./sequelize/models.js";

// Setup Express instance:
const app = express();

// Setup HTTP port:
const port = 8080;

// Mount Express Middleware:
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());
app.use(session({
	secret: "super-secret-notes-app",
	saveUninitialized: false,
	resave: false,
	cookie: {
		sameSite: true,
		maxAge: 60 * (60 * 1000)
	}
}));

// Configure Vite Express:
ViteExpress.config({ printViteDevServerHost: true });

// Route to get given user data:
app.get("/api/login/:id", async (req, res) => {
	// Get ID within parameters:
	const { id } = req.params;

	// Get the user with given ID:
	const user = await User.findOne({
		where: { id }
	});

	// Respond with user data:
	res.json(user);
});

// Route to get current login session state:
app.get("/api/login/", (req, res) => {
	res.send(req.session.login || false);
});

// Route to store user login information:
app.put("/api/login/", async (req, res) => {
	// Get email and password from request body:
	const { email, password } = req.body;

	// Create password hash:
	const hash = bcrypt.hashSync(password.trim(), 10);

	try {
		// Create a new User table row:
		await User.create({
			email: email.trim(),
			password: hash
		});

		// Respond with success message:
		res.send("Sign-up and login store successful.");
	}
	catch (error) {
		// Respond with error message:
		res.send("Login was not created: " + error);
	}
});

// Route to validate user login:
app.post("/api/login/", async (req, res) => {
	// Get email and password from request body:
	const { email, password } = req.body;

	// Get the user with given email:
	const user = await User.findOne({
		where: { email }
	});

	// Set initial login verification to false:
	let login = false;

	// Compare passwords if user exists setting login boolean:
	if (user !== null) {
		login = await bcrypt.compare(password, user.password);
	}

	// Store user ID in session if login true:
	if (login === true) {
		req.session.user = user.id;
	}

	// Respond with and store login boolean:
	req.session.login = login;
	res.send(login);
});

// Route to delete a user login and their notes:
app.delete("/api/login/:id", async (req, res) => {
	// Get ID within parameters:
	const { id } = req.params;

	// Only delete user data if signed in:
	if (req.session.login === true) {
		// Delete all notes to given user:
		await Note.destroy({ where: { owner: id } });

		// Delete User with given email:
		await User.destroy({ where: { id } });

		// Respond with success message:
		res.send("Deleted user data and notes.");
	}
	else {
		// Respond with error message:
		res.send("User must be logged in for deletion.");
	}
});

// Route to verify user is logged in to access notes:
app.all("/api/notes/*", (req, res, next) => {
	// Only access note data if user signed in:
	if (req.session.login === true) {
		next();
	}
	else {
		// Respond with error message:
		res.send("User must be logged in to access note.");
	}
});

// Route to get notes from logged in owner:
app.get("/api/notes/", async (req, res) => {
	// Get all notes from owner:
	const note = await Note.findAll({
		where: { owner: req.session.user }
	});

	// Send note JSON data:
	res.json(note);
});

// Route to get logged in owner note with ID:
app.get("/api/notes/:id", async (req, res) => {
	// Get ID within parameters:
	const { id } = req.params;

	// Get first owner note with ID:
	const note = await Note.findOne({
		where: { owner: req.session.user, id }
	});

	// Send note JSON data:
	res.json(note);
});

// Route to store note data:
app.put("/api/notes/", async (req, res) => {
	// Get title and content from request body:
	const { title, content } = req.body;

	try {
		// Create a new Note table row:
		await Note.create({
			title: title.trim(),
			content,
			owner: req.session.user
		});

		// Respond with success message:
		res.send("Note stored successfully.");
	}
	catch (error) {
		// Respond with error message:
		res.send("Note was not created: " + error);
	}
});

// Route to update note data:
app.post("/api/notes/", async (req, res) => {
	// Get title, content and ID from request body:
	const { title, content, id } = req.body;

	try {
		// Update Note matching given ID:
		await Note.update({ title, content }, {
			where: { id, owner: req.session.user }
		});

		// Respond with success message:
		res.send("Note updated successfully, if found.");
	}
	catch (error) {
		// Respond with error message:
		res.send("Note was not updated: " + error);
	}
});

// Route to delete note data:
app.delete("/api/notes/:id", async (req, res) => {
	// Get ID within parameters:
	const { id } = req.params;

	// Delete note with ID:
	await Note.destroy({ where: { id, owner: req.session.user } });

	// Respond with success message:
	res.send("Deleted note successfully.");
});

// Setup Vite Express and listen to port:
ViteExpress.listen(app, port, () => {
	console.log(`Server is listening on http://localhost:${port}`);
});