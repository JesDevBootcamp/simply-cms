// Connect: Connection to database using Sequelize.

import Sequelize from "sequelize";

export default async function connect(URI = "postgres:///simplycms") {
	// Initial log that we are connecting to database:
	console.log(`Connecting to database: ${URI}`);

	// Setup Sequelize instance with configuration:
	const sequelize = new Sequelize(URI, {
		define: {
			timestamps: false,
			underscored: true
		}
	});

	// Attempt connection to database:
	try {
		await sequelize.authenticate();
		console.log("Database connected successfully.");
	}
	catch (error) {
		console.error('Failed to connect to database:', error);
	}

	// Return connection to database:
	return sequelize;
}