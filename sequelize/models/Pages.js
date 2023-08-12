// Pages: Creates the Pages table using Sequelize.

import { DataTypes, Model } from "sequelize";
import util from "util";
import connect from "../connect.js";

// Establish connection to database:
const sequelize = await connect();

// Create Page table using Sequelize Model:
export class Page extends Model {
	[util.inspect.custom]() {
		return this.toJSON();
	}
}

// Initilize Page Model structure:
Page.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		title: {
			type: DataTypes.STRING(40),
			allowNull: false,
			defaultValue: "Untitled"
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
			defaultValue: ""
		},
		slug: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		}
	},
	{
		sequelize: sequelize,
		modelName: "Page"
	}
);

// Synchronize Page Model:
await Page.sync();

// Export Sequelize Database:
export default sequelize;