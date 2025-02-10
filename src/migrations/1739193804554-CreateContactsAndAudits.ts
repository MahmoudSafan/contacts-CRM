import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateContactsAndAudits1739193804554
	implements MigrationInterface
{
	name = "CreateContactsAndAudits1739193804554";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "contact" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "company" character varying NOT NULL, "balance" numeric NOT NULL DEFAULT '0', "is_deleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_eff09bb429f175523787f46003b" UNIQUE ("email"), CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "audit" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, "action" character varying NOT NULL, "oldData" jsonb, "newData" jsonb, "contactId" character varying, "fromContactId" character varying, "toContactId" character varying, "amount" numeric, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1d3d120ddaf7bc9b1ed68ed463a" PRIMARY KEY ("id"))`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "audit"`);
		await queryRunner.query(`DROP TABLE "contact"`);
	}
}
