import {
	IsString,
	IsEmail,
	MinLength,
	IsOptional,
	IsDecimal,
	IsPositive,
	IsNumber,
} from "class-validator";
import { Decimal128 } from "typeorm";

export class UpdateContactDto {
	@IsString()
	@MinLength(2)
	@IsOptional()
	first_name?: string;

	@IsString()
	@MinLength(2)
	@IsOptional()
	last_name?: string;

	@IsEmail()
	@IsOptional()
	email?: string;

	@IsString()
	@IsOptional()
	company?: string;

	@IsNumber()
	@IsPositive()
	@IsOptional()
	balance?: number;
}
