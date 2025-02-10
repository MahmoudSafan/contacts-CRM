import { DataSource } from "typeorm";
import { Contact } from "../models/Contact";
import { Audit } from "../models/Audit";
import "reflect-metadata";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.DB_HOST || "localhost",
	port: parseInt(process.env.DB_PORT || "5432"),
	username: process.env.DB_USER || "postgres",
	password: process.env.DB_PASSWORD || "2012000",
	database: process.env.DB_NAME || "crm",
	entities: [Contact, Audit],
	synchronize: true,
	logging: false,
});

// Initialize database connection
AppDataSource.initialize().catch((err) => {
	console.error("Database connection failed:", err);
});
