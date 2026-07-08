import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('payroll_records')
export class Payroll {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 120 })
  employeeName: string;

  @Column({ length: 30 })
  period: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  grossSalary: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  deductions: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  netPay: number;

  @Column({ length: 20, default: 'pending' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
