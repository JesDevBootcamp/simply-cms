// Users: Export of attributes for the Sequelize Users model.

import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";

export default {
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true
	},
	email: {
		type: DataTypes.STRING(50),
		allowNull: false,
		unique: true,
		validate: {
			isEmail: true
		}
	},
	password: {
		type: DataTypes.STRING(72),
		allowNull: false,
		validate: {
			async notEmptyHash(value) {
				const emptyPassword = await bcrypt.compare("", value);
				if (emptyPassword) {
					throw new Error("Password cannot be empty.");
				}
			}
		}
	}
}