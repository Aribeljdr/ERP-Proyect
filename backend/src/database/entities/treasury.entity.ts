import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('treasury_movements')
export class Treasury {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  concept: string;

  @Column({ length: 20, default: 'income' })
  type: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  amount: number;

  @Column({ type: 'date' })
  date: string;

  @Column({ length: 40 })
  category: string;

  @Column({ length: 20, default: 'completed' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
