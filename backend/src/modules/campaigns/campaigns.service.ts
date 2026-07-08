import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from '../../database/entities/campaign.entity';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(Campaign)
    private campaignsRepo: Repository<Campaign>,
  ) {}

  async findAll(page = 1, limit = 10) {
    const [data, total] = await this.campaignsRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total, page, limit };
  }

  async findOne(id: string) {
    const campaign = await this.campaignsRepo.findOne({ where: { id } });
    if (!campaign) throw new NotFoundException('Campaign not found');
    return campaign;
  }

  async create(dto: any) {
    const campaign = this.campaignsRepo.create(dto);
    return this.campaignsRepo.save(campaign);
  }

  async update(id: string, dto: any) {
    await this.findOne(id);
    await this.campaignsRepo.update(id, dto);
    return this.findOne(id);
  }

  async delete(id: string) {
    const campaign = await this.findOne(id);
    await this.campaignsRepo.remove(campaign);
    return { deleted: true };
  }

  async getSummary() {
    const [total, active, draft, completed] = await Promise.all([
      this.campaignsRepo.count(),
      this.campaignsRepo.count({ where: { status: 'active' } }),
      this.campaignsRepo.count({ where: { status: 'draft' } }),
      this.campaignsRepo.count({ where: { status: 'completed' } }),
    ]);
    const totalSent = await this.campaignsRepo
      .createQueryBuilder('c')
      .select('SUM(c.sentCount)', 'total')
      .getRawOne();
    return { total, activeCampaigns: active, draftCampaigns: draft, completedCampaigns: completed, totalSent: Number(totalSent?.total || 0) };
  }
}
