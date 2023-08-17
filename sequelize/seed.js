// Seed: Populate database with user and note data.

import bcrypt from "bcrypt";
import { database, User, Note } from "./models.js";

// Force database to rebuild models:
await database.sync({ force: true });

// Log that we are seeding the database:
console.log("Seeding database...");

// Create an initial user entry:
const user = await User.create({
    email: "me@email.com",
    password: bcrypt.hashSync("password", 10)
});

// Create initial user note entries:
await user.createNote({
	title: "First Note!",
	content: "Note content."
});

await Note.create({
    title: "Last Note!",
    content: "More content!",
    userId: user.userId
});

// Log that we have seeded the database:
console.log("Successfully seeded database.");

// Close connection to database:
await database.close();