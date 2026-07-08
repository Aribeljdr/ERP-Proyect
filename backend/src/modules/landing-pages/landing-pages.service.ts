import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LandingPage } from '../../database/entities/landing-page.entity';

@Injectable()
export class LandingPagesService {
  constructor(
    @InjectRepository(LandingPage)
    private pagesRepo: Repository<LandingPage>,
  ) {}

  async findAll(page = 1, limit = 10) {
    const [data, total] = await this.pagesRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total, page, limit };
  }

  async findOne(id: string) {
    const page = await this.pagesRepo.findOne({ where: { id } });
    if (!page) throw new NotFoundException('LandingPage not found');
    return page;
  }

  async create(dto: any) {
    const landing = this.pagesRepo.create(dto);
    return this.pagesRepo.save(landing);
  }

  async update(id: string, dto: any) {
    await this.findOne(id);
    await this.pagesRepo.update(id, dto);
    return this.findOne(id);
  }

  async delete(id: string) {
    const landing = await this.findOne(id);
    await this.pagesRepo.remove(landing);
    return { deleted: true };
  }

  async getSummary() {
    const [total, published, draft] = await Promise.all([
      this.pagesRepo.count(),
      this.pagesRepo.count({ where: { status: 'published' } }),
      this.pagesRepo.count({ where: { status: 'draft' } }),
    ]);
    const totalViews = await this.pagesRepo
      .createQueryBuilder('p')
      .select('SUM(p.viewsCount)', 'total')
      .getRawOne();
    return { total, publishedPages: published, draftPages: draft, totalViews: Number(totalViews?.total || 0) };
  }
}
