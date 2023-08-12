// Models: Export Sequelize Models, and establish relationships.

import { User } from "./models/Users.js";
import { Page } from "./models/Pages.js";

// Create a One-To-Many relationship with User/Page Models:
User.hasMany(Page, { foreignKey: { name: "id", field: "id" } });
Page.belongsTo(User, { foreignKey: { name: "id", field: "id" } });

// Export all Models:
export { User, Page };