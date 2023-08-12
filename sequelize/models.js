// Models: Export Sequelize Models, establish any relationships.

import { User } from "./models/Users.js";
import { Note } from "./models/Notes.js";

// Create a One-To-Many relationship with User/Note Models:
User.hasMany(Note, { foreignKey: { name: "id", field: "id" } });
Note.belongsTo(User, { foreignKey: { name: "id", field: "id" } });

// Export all Models:
export { User, Note };