import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '../../database/entities/ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketsRepo: Repository<Ticket>,
  ) {}

  async findAll(page = 1, limit = 10) {
    const [data, total] = await this.ticketsRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total, page, limit };
  }

  async findOne(id: string) {
    const ticket = await this.ticketsRepo.findOne({ where: { id } });
    if (!ticket) throw new NotFoundException('Ticket not found');
    return ticket;
  }

  async create(dto: any) {
    const ticket = this.ticketsRepo.create(dto);
    return this.ticketsRepo.save(ticket);
  }

  async update(id: string, dto: any) {
    await this.findOne(id);
    await this.ticketsRepo.update(id, dto);
    return this.findOne(id);
  }

  async delete(id: string) {
    const ticket = await this.findOne(id);
    await this.ticketsRepo.remove(ticket);
    return { deleted: true };
  }

  async getSummary() {
    const [open, inProgress, resolved] = await Promise.all([
      this.ticketsRepo.count({ where: { status: 'open' } }),
      this.ticketsRepo.count({ where: { status: 'in_progress' } }),
      this.ticketsRepo.count({ where: { status: 'resolved' } }),
    ]);
    return { openTickets: open, inProgressTickets: inProgress, resolvedTickets: resolved, total: open + inProgress + resolved };
  }
}
