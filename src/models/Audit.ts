import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
} from "typeorm";
import { Contact } from "./Contact";

@Entity()
export class Audit {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	type: "CONTACT" | "TRANSACTION";
	@Column()
	action: "CREATE" | "UPDATE" | "DELETE" | "TRANSFER";

	@Column("jsonb", { nullable: true })
	oldData: Partial<Contact>;

	@Column("jsonb", { nullable: true })
	newData: Partial<Contact>;

	@Column({ nullable: true })
	contactId: string;

	@Column({ nullable: true })
	fromContactId: string;

	@Column({ nullable: true })
	toContactId: string;

	@Column({ type: "decimal", nullable: true })
	amount: number;

	@CreateDateColumn()
	createdAt: Date;
}
