import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('kanban_cards')
export class KanbanCard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  title: string;

  @Column({ length: 60 })
  tag: string;

  @Column({ length: 20, default: 'Media' })
  priority: string;

  @Column({ length: 4 })
  assignee: string;

  @Column({ length: 7 })
  avColor: string;

  @Column({ type: 'int', default: 0 })
  comments: number;

  @Column({ length: 20 })
  due: string;

  @Column({ type: 'int', default: 0 })
  progress: number;

  @Column({ length: 40 })
  columnKey: string;

  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
