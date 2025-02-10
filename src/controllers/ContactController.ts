import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ContactService } from "../services/ContactService";
import { GetContactsQueryDto } from "../dtos/GetContactsQuery.dto";

export class ContactController {
	private contactService = new ContactService();

	getAllContacts = asyncHandler(async (req: Request, res: Response) => {
		const filters = req.query as GetContactsQueryDto;
		const contacts = await this.contactService.getAllContacts(filters);
		res.json(contacts);
	});

	getContact = asyncHandler(async (req: Request, res: Response) => {
		const contact = await this.contactService.getContact(req.params.id);
		res.json(contact);
	});

	createContact = asyncHandler(async (req: Request, res: Response) => {
		const contact = await this.contactService.createContact(req.body);
		res.status(201).json(contact);
	});

	updateContact = asyncHandler(async (req: Request, res: Response) => {
		const contact = await this.contactService.updateContact(
			req.params.id,
			req.body
		);
		res.json(contact);
	});

	deleteContact = asyncHandler(async (req: Request, res: Response) => {
		await this.contactService.deleteContact(req.params.id);
		res.status(204).send();
	});

	getAuditHistory = asyncHandler(async (req: Request, res: Response) => {
		const audits = await this.contactService.getAuditHistory(req.params.id);
		res.json(audits);
	});

	transferBalance = asyncHandler(async (req: Request, res: Response) => {
		await this.contactService.transferBalance(req.body);
		res.json({ message: "Balance transferred successfully" });
	});
}
