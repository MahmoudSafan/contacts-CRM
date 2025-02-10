import { IsString, IsBoolean, IsOptional } from "class-validator";

export class GetContactsQueryDto {
	@IsString()
	@IsOptional()
	company?: string;

	@IsBoolean()
	@IsOptional()
	is_deleted?: boolean;

	@IsString()
	@IsOptional()
	createdAfter?: string; // ISO date string
}
