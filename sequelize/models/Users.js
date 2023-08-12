// Users: Creates the Users table using Sequelize.

import { DataTypes, Model } from "sequelize";
import util from "util";
import connect from "../connect.js";

// Establish connection to database:
const sequelize = await connect();

// Create User table using Sequelize Model:
export class User extends Model {
	[util.inspect.custom]() {
		return this.toJSON();
	}
}

// Initilize User Model structure:
User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		username: {
			type: DataTypes.STRING(40),
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING(60),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(320),
			allowNull: false,
			unique: true
		}
	},
	{
		sequelize: sequelize,
		modelName: "User"
	}
);

// Synchronize User Model:
await User.sync();

// Export Sequelize Database:
export default sequelize;