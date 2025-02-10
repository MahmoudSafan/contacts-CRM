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
	contactId: string; // Nullable for transactions

	@Column({ nullable: true })
	fromContactId: string; // For balance transfers

	@Column({ nullable: true })
	toContactId: string; // For balance transfers

	@Column({ type: "decimal", nullable: true })
	amount: number; // For balance transfers

	@CreateDateColumn()
	createdAt: Date;
}
