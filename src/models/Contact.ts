import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
} from "typeorm";

@Entity()
export class Contact {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column()
	first_name!: string;

	@Column()
	last_name!: string;

	@Column({ unique: true })
	email!: string;

	@Column()
	company!: string;

	@Column({ type: "decimal", default: 0.0 })
	balance?: number;

	@Column({ default: false })
	isDeleted?: boolean;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt?: Date;

	@DeleteDateColumn()
	deletedAt?: Date;
}
