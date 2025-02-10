import express from "express";
import { ContactController } from "../controllers/ContactController";
import { validateRequest } from "../middlewares/validation.middleware";
import { CreateContactDto } from "../dtos/CreateContact.dto";
import { UpdateContactDto } from "../dtos/UpdateContact.dto";
import { TransferBalanceDto } from "../dtos/TransferBalance.dto";
import { UUIDParamDto } from "../dtos/ValidateUUID.dto";

const router = express.Router();
const controller = new ContactController();

// Contacts
router.get("/contacts", controller.getAllContacts);
router.get(
	"/contacts/:id",
	validateRequest(UUIDParamDto, "params"),
	controller.getContact
);

router.post(
	"/contacts",
	validateRequest(CreateContactDto, "body"),
	controller.createContact
);

router.patch(
	"/contacts/:id",
	validateRequest(UUIDParamDto, "params"),
	validateRequest(UpdateContactDto, "body"),
	controller.updateContact
);
router.delete(
	"/contacts/:id",
	validateRequest(UUIDParamDto, "params"),
	controller.deleteContact
);

// Audit
router.get(
	"/contacts/:id/audit",
	validateRequest(UUIDParamDto, "params"),
	controller.getAuditHistory
);

// Balance transfer
router.post(
	"/contacts/transfer",
	validateRequest(TransferBalanceDto, "body"),
	controller.transferBalance
);

export default router;
