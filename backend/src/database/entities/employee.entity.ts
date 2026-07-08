import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 60 })
  firstName: string;

  @Column({ length: 60 })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 60 })
  position: string;

  @Column({ length: 40 })
  department: string;

  @Column({ length: 20, default: 'active' })
  status: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  salary: number;

  @Column({ type: 'date' })
  hireDate: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
