import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KanbanCard } from '../../database/entities/kanban-card.entity';

const COLUMNS = [
  { key: 'backlog', title: 'Backlog', color: '#94A3B8' },
  { key: 'progress', title: 'En progreso', color: '#2563EB' },
  { key: 'review', title: 'En revisión', color: '#F59E0B' },
  { key: 'done', title: 'Completado', color: '#22C55E' },
];

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(KanbanCard)
    private cardsRepo: Repository<KanbanCard>,
  ) {}

  async getBoard() {
    const cards = await this.cardsRepo.find({ order: { sortOrder: 'ASC' } });
    const grouped: Record<string, KanbanCard[]> = {};
    for (const col of COLUMNS) {
      grouped[col.key] = cards.filter(c => c.columnKey === col.key);
    }
    return { columns: COLUMNS, cards: grouped };
  }

  async moveCard(id: string, toColumn: string) {
    const card = await this.cardsRepo.findOne({ where: { id } });
    if (!card) throw new NotFoundException('Tarjeta no encontrada');
    card.columnKey = toColumn;
    if (toColumn === 'done') card.progress = 100;
    return this.cardsRepo.save(card);
  }

  async createCard(data: Partial<KanbanCard>) {
    const card = this.cardsRepo.create(data);
    return this.cardsRepo.save(card);
  }

  async updateCard(id: string, data: Partial<KanbanCard>) {
    await this.cardsRepo.update(id, data);
    return this.cardsRepo.findOne({ where: { id } });
  }

  async deleteCard(id: string) {
    await this.cardsRepo.delete(id);
    return { deleted: true };
  }
}
