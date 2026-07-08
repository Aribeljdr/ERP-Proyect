import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('email_templates')
export class EmailTemplate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 120 })
  name: string;

  @Column({ length: 200 })
  subject: string;

  @Column({ length: 40, default: 'general' })
  category: string;

  @Column({ length: 20, default: 'draft' })
  status: string;

  @Column({ type: 'int', default: 0 })
  opensCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
