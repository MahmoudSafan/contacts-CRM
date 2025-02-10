import request from "supertest";
import app from "../src/app";
import { AppDataSource } from "../src/config/database";
import { Contact } from "../src/models/Contact";
import { clearDatabase } from "../src/utils/clearDB";
describe("Contacts API", () => {
	beforeAll(async () => {
		await AppDataSource.initialize();
	});

	afterAll(async () => {
		await clearDatabase();
		await AppDataSource.destroy();
	});

	describe("POST /contacts", () => {
		it("should create a contact", async () => {
			const contactData = {
				first_name: "John",
				last_name: "Doe",
				email: "john@example.com",
				company: "Tech Corp",
			};

			const response = await request(app).post("/contacts").send(contactData);

			expect(response.status).toBe(201);
			expect(response.body).toMatchObject(contactData);
		});

		it("should return 400 if email is invalid", async () => {
			const contactData = {
				first_name: "John",
				last_name: "Doe",
				email: "invalid-email",
				company: "Tech Corp",
			};

			const response = await request(app).post("/contacts").send(contactData);

			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty("message", "Validation failed");
		});
	});

	describe("GET /contacts/:id", () => {
		it("should return a contact by ID", async () => {
			const contact = await AppDataSource.getRepository(Contact).save({
				first_name: "John",
				last_name: "Doe",
				email: "jane@example.com",
				company: "Tech Corp",
			});

			const response = await request(app).get(`/contacts/${contact.id}`);

			expect(response.status).toBe(200);
			expect(response.body).toMatchObject({
				first_name: "John",
				last_name: "Doe",
				email: "jane@example.com",
				company: "Tech Corp",
			});
		});

		it("should return 400 if contact_id is not valid", async () => {
			const response = await request(app).get("/contacts/not-a-valid-uuid");

			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty("message", "Validation failed");
		});
	});
});
