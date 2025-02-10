import { DataSource } from "typeorm";
import { AppDataSource } from "../config/database";

export const clearDatabase = async () => {
	const connection: DataSource = AppDataSource;

	if (!connection.isInitialized) {
		await connection.initialize();
	}

	const entities = connection.entityMetadatas;

	for (const entity of entities) {
		const repository = connection.getRepository(entity.name);
		await repository.query(
			`TRUNCATE TABLE "${entity.tableName}" RESTART IDENTITY CASCADE;`
		);
	}
	return;
};
