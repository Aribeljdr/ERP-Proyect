import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('kpis')
export class Kpi {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 80 })
  label: string;

  @Column({ length: 30 })
  value: string;

  @Column({ length: 10 })
  delta: string;

  @Column({ default: true })
  good: boolean;

  @Column({ default: false })
  down: boolean;

  @Column({ length: 40 })
  icon: string;

  @Column({ length: 7 })
  accent: string;

  @Column({ length: 30 })
  tint: string;

  @CreateDateColumn()
  createdAt: Date;
}
