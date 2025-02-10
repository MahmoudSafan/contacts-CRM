import { Audit } from "../models/Audit";
import { AppDataSource } from "../config/database";

export class AuditRepository {
	private auditRepository = AppDataSource.getRepository(Audit);

	async create(auditData: Partial<Audit>): Promise<Audit> {
		const audit = this.auditRepository.create(auditData);
		return this.auditRepository.save(audit);
	}

	async find(options: any): Promise<Audit[]> {
		return this.auditRepository.find(options);
	}

	async findByContactId(contactId: string): Promise<Audit[]> {
		return this.auditRepository.find({
			where: { contactId },
			order: { createdAt: "DESC" },
		});
	}

	async logTransaction(
		fromContactId: string,
		toContactId: string,
		amount: number
	): Promise<Audit> {
		const audit = this.auditRepository.create({
			type: "TRANSACTION",
			action: "TRANSFER",
			fromContactId,
			toContactId,
			amount,
		});

		return this.auditRepository.save(audit);
	}
}
