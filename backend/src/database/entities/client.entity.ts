import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 120 })
  name: string;

  @Column({ length: 180 })
  company: string;

  @Column({ length: 20, default: 'active' })
  status: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  value: number;

  @Column({ type: 'int', default: 0 })
  progress: number;

  @Column({ length: 4 })
  initials: string;

  @Column({ length: 7 })
  avColor: string;

  @Column({ length: 4 })
  owner: string;

  @Column({ length: 60 })
  ownerName: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
