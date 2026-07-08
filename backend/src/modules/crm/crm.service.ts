import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Client } from '../../database/entities/client.entity';

@Injectable()
export class CrmService {
  constructor(
    @InjectRepository(Client)
    private clientsRepo: Repository<Client>,
  ) {}

  async findAll(query?: string, status?: string, page = 1, limit = 10) {
    const where: any = {};
    if (status && status !== 'all') where.status = status;
    if (query) {
      where.name = Like(`%${query}%`);
    }
    const [data, total] = await this.clientsRepo.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total, page, limit };
  }

  async findOne(id: string) {
    const client = await this.clientsRepo.findOne({ where: { id } });
    if (!client) throw new NotFoundException('Cliente no encontrado');
    return client;
  }

  async create(data: Partial<Client>) {
    const client = this.clientsRepo.create(data);
    return this.clientsRepo.save(client);
  }

  async update(id: string, data: Partial<Client>) {
    await this.findOne(id);
    await this.clientsRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.clientsRepo.delete(id);
    return { deleted: true };
  }
}
