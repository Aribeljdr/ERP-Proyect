import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailTemplate } from '../../database/entities/email-template.entity';

@Injectable()
export class EmailTemplatesService {
  constructor(
    @InjectRepository(EmailTemplate)
    private templatesRepo: Repository<EmailTemplate>,
  ) {}

  async findAll(page = 1, limit = 10) {
    const [data, total] = await this.templatesRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total, page, limit };
  }

  async findOne(id: string) {
    const template = await this.templatesRepo.findOne({ where: { id } });
    if (!template) throw new NotFoundException('EmailTemplate not found');
    return template;
  }

  async create(dto: any) {
    const template = this.templatesRepo.create(dto);
    return this.templatesRepo.save(template);
  }

  async update(id: string, dto: any) {
    await this.findOne(id);
    await this.templatesRepo.update(id, dto);
    return this.findOne(id);
  }

  async delete(id: string) {
    const template = await this.findOne(id);
    await this.templatesRepo.remove(template);
    return { deleted: true };
  }

  async getSummary() {
    const [total, active, draft] = await Promise.all([
      this.templatesRepo.count(),
      this.templatesRepo.count({ where: { status: 'active' } }),
      this.templatesRepo.count({ where: { status: 'draft' } }),
    ]);
    const totalOpens = await this.templatesRepo
      .createQueryBuilder('t')
      .select('SUM(t.opensCount)', 'total')
      .getRawOne();
    return { total, activeTemplates: active, draftTemplates: draft, totalOpens: Number(totalOpens?.total || 0) };
  }
}
