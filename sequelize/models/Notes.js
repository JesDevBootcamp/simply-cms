// Notes: Creates the Notes table using Sequelize.

import { DataTypes, Model } from "sequelize";
import util from "util";
import connect from "../connect.js";

// Establish connection to database:
const sequelize = await connect();

// Create Note table using Sequelize Model:
export class Note extends Model {
	[util.inspect.custom]() {
		return this.toJSON();
	}
}

// Initilize Note Model structure:
Note.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		title: {
			type: DataTypes.STRING(60),
			allowNull: false,
			defaultValue: "Untitled"
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
			defaultValue: ""
		},
		owner: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	},
	{
		sequelize: sequelize,
		modelName: "Note"
	}
);

// Synchronize Note Model:
await Note.sync();

// Export Sequelize Database:
export default sequelize;