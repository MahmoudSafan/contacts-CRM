import express from "express";
import { ContactController } from "../controllers/ContactController";
import { validateRequest } from "../middlewares/validation.middleware";
import { CreateContactDto } from "../dtos/CreateContact.dto";
import { UpdateContactDto } from "../dtos/UpdateContact.dto";
import { TransferBalanceDto } from "../dtos/TransferBalance.dto";

const router = express.Router();
const controller = new ContactController();

// Contacts
router.get("/contacts", controller.getAllContacts);
router.get("/contacts/:id", controller.getContact);

router.post(
	"/contacts",
	validateRequest(CreateContactDto),
	controller.createContact
);

router.patch(
	"/contacts/:id",
	validateRequest(UpdateContactDto),
	controller.updateContact
);
router.delete("/contacts/:id", controller.deleteContact);

// Audit
router.get("/contacts/:id/audit", controller.getAuditHistory);

// Balance transfer
router.post(
	"/contacts/transfer",
	validateRequest(TransferBalanceDto),
	controller.transferBalance
);

export default router;
