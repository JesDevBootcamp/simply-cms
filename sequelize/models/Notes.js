// Notes: Export of attributes for the Sequelize Notes model.

import { DataTypes } from "sequelize";

export default {
	noteId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true
	},
	title: {
		type: DataTypes.STRING(60),
		allowNull: false,
		defaultValue: "Untitled",
		validate: {
			notEmpty: true
		}
	},
	content: {
		type: DataTypes.TEXT,
		allowNull: false,
		defaultValue: ""
	}
}