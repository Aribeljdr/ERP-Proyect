import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('attendance_records')
export class AttendanceRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 120 })
  employeeName: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ length: 5, nullable: true })
  checkIn?: string;

  @Column({ length: 5, nullable: true })
  checkOut?: string;

  @Column({ length: 20, default: 'present' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
