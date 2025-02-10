import { Contact } from "../models/Contact";
import { AppDataSource } from "../config/database";
import { GetContactsQueryDto } from "../dtos/GetContactsQuery.dto";

export class ContactRepository {
	private contactRepository = AppDataSource.getRepository(Contact);

	async save(contact: Partial<Contact>): Promise<Contact> {
		return this.contactRepository.save(contact);
	}

	async findAll(filters?: GetContactsQueryDto): Promise<Contact[]> {
		const query = this.contactRepository.createQueryBuilder("contact");
		console.log("filters", filters);
		if (filters?.company) {
			query.andWhere("contact.company = :company", {
				company: filters.company,
			});
		}

		if (filters?.isDeleted !== undefined) {
			query.andWhere("contact.isDeleted = :isDeleted", {
				isDeleted: filters.isDeleted,
			});
		}

		if (filters?.createdAfter) {
			query.andWhere("contact.createdAt > :createdAfter", {
				createdAfter: new Date(filters.createdAfter),
			});
		}

		return query.getMany();
	}

	async findById(id: string): Promise<Contact | null> {
		return this.contactRepository.findOneBy({ id });
	}

	async findByEmail(email: string): Promise<Contact | null> {
		return this.contactRepository.findOneBy({ email });
	}

	async update(id: string, data: Partial<Contact>): Promise<Contact | null> {
		await this.contactRepository.update(id, data);
		return this.findById(id);
	}

	async softDelete(id: string): Promise<void> {
		await this.contactRepository.softDelete(id);
	}
}
