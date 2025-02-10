import { Contact } from "../models/Contact";
import { Audit } from "../models/Audit";
import { ContactRepository } from "../repositories/ContactRepository";
import { AuditRepository } from "../repositories/AuditRepository";
import { AppDataSource } from "../config/database";
import { NotFoundError, ValidationError } from "../utils/AppError";
import { CreateContactDto } from "../dtos/CreateContact.dto";
import { UpdateContactDto } from "../dtos/UpdateContact.dto";
import { TransferBalanceDto } from "../dtos/TransferBalance.dto";
import { GetContactsQueryDto } from "../dtos/GetContactsQuery.dto";

export class ContactService {
	private contactRepo = new ContactRepository();
	private auditRepo = new AuditRepository();

	async getAllContacts(filters?: GetContactsQueryDto): Promise<Contact[]> {
		return this.contactRepo.findAll(filters);
	}

	async getContact(id: string): Promise<Contact> {
		const contact = await this.contactRepo.findById(id);
		if (!contact) throw new NotFoundError("Contact not found");
		return contact;
	}

	async createContact(data: CreateContactDto): Promise<Contact> {
		const existingContact = await this.contactRepo.findByEmail(data.email);
		if (existingContact) throw new ValidationError("Email already exists");

		const contact = await this.contactRepo.save(data);

		// Audit log
		await this.auditRepo.create({
			action: "CREATE",
			newData: contact,
			contactId: contact.id,
		});

		return contact;
	}

	async updateContact(id: string, data: UpdateContactDto): Promise<Contact> {
		const oldContact = await this.contactRepo.findById(id);
		if (!oldContact) throw new NotFoundError("Contact not found");

		const updatedContact = await this.contactRepo.update(id, data);

		// Audit log
		const auditLog: Partial<Audit> = {
			type: "CONTACT",
			action: "UPDATE",
			oldData: oldContact,
			contactId: id,
		};

		if (updatedContact) {
			auditLog.newData = updatedContact;
		}

		await this.auditRepo.create(auditLog);

		return updatedContact!;
	}

	async deleteContact(id: string): Promise<void> {
		const contact = await this.contactRepo.findById(id);
		if (!contact) throw new NotFoundError("Contact not found");

		await this.contactRepo.softDelete(id);

		// Audit log
		await this.auditRepo.create({
			type: "CONTACT",
			action: "DELETE",
			oldData: contact,
			contactId: id,
		});
	}

	async getAuditHistory(contactId: string): Promise<Audit[]> {
		return this.auditRepo.find({
			where: [
				{ contactId },
				{ fromContactId: contactId },
				{ toContactId: contactId },
			],
			order: { createdAt: "DESC" },
		});
	}

	async transferBalance(data: TransferBalanceDto): Promise<void> {
		const { from_contact_id, to_contact_id, amount } = data;

		const fromContact = await this.contactRepo.findById(from_contact_id);
		const toContact = await this.contactRepo.findById(to_contact_id);

		if (!fromContact || !toContact)
			throw new NotFoundError("Contact not found");
		if (fromContact.balance === undefined || toContact.balance === undefined)
			throw new ValidationError("Balance is undefined for one of the contacts");
		if (fromContact.balance < amount)
			throw new ValidationError("Insufficient balance");

		await AppDataSource.transaction(async (manager) => {
			fromContact.balance! -= amount;
			toContact.balance! += amount;

			await manager.save(Contact, fromContact);
			await manager.save(Contact, toContact);

			await this.auditRepo.logTransaction(
				from_contact_id,
				to_contact_id,
				amount
			);
		});
	}
}
