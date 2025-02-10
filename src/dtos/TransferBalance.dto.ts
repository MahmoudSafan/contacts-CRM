import { IsUUID, IsDecimal, IsPositive, IsNumber } from "class-validator";

export class TransferBalanceDto {
	@IsUUID()
	from_contact_id: string;

	@IsUUID()
	to_contact_id: string;

	@IsNumber()
	@IsPositive()
	amount: number;
}
