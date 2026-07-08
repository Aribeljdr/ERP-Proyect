import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('activities')
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 60 })
  who: string;

  @Column({ length: 200 })
  what: string;

  @Column({ length: 40 })
  when: string;

  @Column({ length: 40 })
  icon: string;

  @Column({ length: 7 })
  color: string;

  @Column({ length: 30 })
  tint: string;

  @CreateDateColumn()
  createdAt: Date;
}
