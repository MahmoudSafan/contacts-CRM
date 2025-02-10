import app from "./app";
import { AppDataSource } from "./config/database";

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
	.then(() => {
		console.log("Database connected");

		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.log(
			process.env.DB_HOST,
			process.env.DB_PORT,
			process.env.DB_USER,
			process.env.DB_PASSWORD,
			process.env.DB_NAME
		);
		console.error("Database connection failed:", err);
	});
