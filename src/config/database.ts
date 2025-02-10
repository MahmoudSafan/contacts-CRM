import { DataSource } from "typeorm";
import { Contact } from "../models/Contact";
import { Audit } from "../models/Audit";
import "reflect-metadata";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.DB_HOST || "localhost",
	port: parseInt(process.env.DB_PORT || "5432"),
	username: process.env.DB_USER || "postgres",
	password: process.env.DB_PASSWORD || "admin",
	database: process.env.DB_NAME || "crm",
	entities: [Contact, Audit],
	migrations: ["src/migrations/*.ts"],
	synchronize: true,
	logging: false,
});
