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

	try {
		// Get the user with given ID:
		const user = await User.findOne({
			where: { userId: id }
		});

		// Respond with user data:
		res.json(user);
	}
	catch {
		// Respond with falsy:
		res.send(false);
	}
});

// Route to get current logged in user ID:
app.get("/api/login/", (req, res) => {
	if (req.session.user !== undefined) {
		// Respond with user ID:
		res.send(req.session.user.toString());
	}
	else {
		// Respond with falsy:
		res.send(false);
	}
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

		// Respond with truthy:
		res.send(true);
	}
	catch {
		// Respond with falsy:
		res.send(false);
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
		req.session.user = user.userId;
	}

	// Respond with login boolean:
	res.send(login);
});

// Route to modify user login information:
app.patch("/api/login/", async (req, res) => {
	// Get email and password from request body:
	const { email, password } = req.body;

	// Create password hash:
	const hash = bcrypt.hashSync(password.trim(), 10);

	// Only modify user data if logged in:
	if (req.session.user !== undefined) {
		// Update logged in user with new email and password:
		await User.update({ email, password: hash }, {
			where: { userId: req.session.user }
		});

		// Respond with truthy:
		res.send(true);
	}
	else {
		// Respond with falsy:
		res.send(false);
	}
});

// Route to delete a user login and their notes:
app.delete("/api/login/:id", async (req, res) => {
	// Get ID within parameters:
	const { id } = req.params;

	// Only delete user data if user login:
	if (req.session.user !== undefined) {
		// Delete all notes to given user:
		await Note.destroy({ where: { userId: id } });

		// Delete User with given email:
		await User.destroy({ where: { userId: id } });

		// Respond with truthy:
		res.send(true);
	}
	else {
		// Respond with falsy:
		res.send(false);
	}
});

// Route to logout current user:
app.get("/api/logout/", (req, res) => {
	// Delete user ID in session:
	delete req.session.user;

	// Respond with truthy:
	res.send(true);
});

// Route to verify user is logged in to access notes:
app.all("/api/notes/*", (req, res, next) => {
	// Only access note data if user signed in:
	if (req.session.user !== undefined) {
		next();
	}
	else {
		// Respond with falsy:
		res.send(false);
	}
});

// Route to get notes from logged in user:
app.get("/api/notes/", async (req, res) => {
	// Get all notes from user:
	const note = await Note.findAll({
		where: { userId: req.session.user }
	});

	// Send note JSON data:
	res.json(note);
});

// Route to get logged in user note with ID:
app.get("/api/notes/:id", async (req, res) => {
	// Get ID within parameters:
	const { id } = req.params;

	// Get first user note with ID:
	const note = await Note.findOne({
		where: { userId: req.session.user, noteId: id }
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
			userId: req.session.user
		});

		// Respond with truthy:
		res.send(true);
	}
	catch {
		// Respond with falsy:
		res.send(false);
	}
});

// Route to update note data:
app.post("/api/notes/", async (req, res) => {
	// Get title, content and ID from request body:
	const { title, content, id } = req.body;

	try {
		// Update Note matching given ID:
		await Note.update({ title, content }, {
			where: { userId: req.session.user, noteId: id }
		});

		// Respond with truthy:
		res.send(true);
	}
	catch {
		// Respond with falsy:
		res.send(false);
	}
});

// Route to delete note data:
app.delete("/api/notes/:id", async (req, res) => {
	// Get ID within parameters:
	const { id } = req.params;

	// Delete note with ID:
	await Note.destroy({ where: { userId: req.session.user, noteId: id } });

	// Respond with truthy:
	res.send(true);
});

// Setup Vite Express and listen to port:
ViteExpress.listen(app, port, () => {
	console.log(`Server is listening on http://localhost:${port}`);
});