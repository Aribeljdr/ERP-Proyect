import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20, unique: true })
  invoiceNumber: string;

  @Column({ length: 120 })
  clientName: string;

  @Column({ length: 180 })
  clientCompany: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  total: number;

  @Column({ length: 20, default: 'issued' })
  status: string;

  @Column({ type: 'date' })
  issuedAt: string;

  @Column({ type: 'date' })
  dueAt: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
