// Models: Define and export Sequelize Models, establish any relationships.

import connect from "./connect.js";
import UserModel from "./models/Users.js";
import NoteModel from "./models/Notes.js";

// Establish connection to database:
export const database = await connect();

// Create User and Note tables using Sequelize Model:
export const User = database.define("User", UserModel);
export const Note = database.define("Note", NoteModel, { timestamps: true });

// Create a One-To-Many relationship with User/Note Models:
User.hasMany(Note, { foreignKey: { name: "userId", field: "user_id" } });
Note.belongsTo(User, { foreignKey: { name: "userId", field: "user_id" } });

// Synchronize Sequelize Models:
await database.sync();