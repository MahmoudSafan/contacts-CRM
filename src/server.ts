import app from "./app";
import { AppDataSource } from "./config/database";

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
	.then(async () => {
		console.log("Database connected");
		await AppDataSource.runMigrations();
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.error("Database connection failed:", err);
	});
