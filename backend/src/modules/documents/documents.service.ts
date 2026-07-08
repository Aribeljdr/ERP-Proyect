import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from '../../database/entities/document.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private docsRepo: Repository<Document>,
  ) {}

  async findAll(page = 1, limit = 10) {
    const [data, total] = await this.docsRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total, page, limit };
  }

  async findOne(id: string) {
    const doc = await this.docsRepo.findOne({ where: { id } });
    if (!doc) throw new NotFoundException('Document not found');
    return doc;
  }

  async create(dto: any) {
    const doc = this.docsRepo.create(dto);
    return this.docsRepo.save(doc);
  }

  async update(id: string, dto: any) {
    await this.findOne(id);
    await this.docsRepo.update(id, dto);
    return this.findOne(id);
  }

  async delete(id: string) {
    const doc = await this.findOne(id);
    await this.docsRepo.remove(doc);
    return { deleted: true };
  }

  async getSummary() {
    const total = await this.docsRepo.count();
    const byType = await this.docsRepo
      .createQueryBuilder('d')
      .select('d.type', 'type')
      .addSelect('COUNT(*)', 'count')
      .groupBy('d.type')
      .getRawMany();
    return { total, byType };
  }
}
