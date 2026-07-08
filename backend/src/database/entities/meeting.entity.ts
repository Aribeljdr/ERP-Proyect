import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('meetings')
export class Meeting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 10 })
  time: string;

  @Column({ length: 6 })
  ampm: string;

  @Column({ length: 120 })
  title: string;

  @Column({ length: 120 })
  sub: string;

  @Column({ length: 7 })
  color: string;

  @Column({ type: 'timestamp', nullable: true })
  scheduledAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
