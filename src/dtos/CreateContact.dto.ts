import { IsString, IsEmail, MinLength } from "class-validator";

export class CreateContactDto {
	@IsString()
	@MinLength(2)
	first_name: string;

	@IsString()
	@MinLength(2)
	last_name: string;

	@IsEmail()
	email: string;

	@IsString()
	company: string;
}
