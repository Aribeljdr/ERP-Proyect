import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesOrder } from '../../database/entities/sales-order.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(SalesOrder)
    private salesRepo: Repository<SalesOrder>,
  ) {}

  async findAll(page = 1, limit = 10) {
    const [data, total] = await this.salesRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total, page, limit };
  }

  async findOne(id: string) {
    const order = await this.salesRepo.findOne({ where: { id } });
    if (!order) throw new NotFoundException('SalesOrder not found');
    return order;
  }

  async create(dto: any) {
    const order = this.salesRepo.create(dto);
    return this.salesRepo.save(order);
  }

  async update(id: string, dto: any) {
    await this.findOne(id);
    await this.salesRepo.update(id, dto);
    return this.findOne(id);
  }

  async delete(id: string) {
    const order = await this.findOne(id);
    await this.salesRepo.remove(order);
    return { deleted: true };
  }

  async getSummary() {
    const [totalOrders, pending, completed] = await Promise.all([
      this.salesRepo.count(),
      this.salesRepo.count({ where: { status: 'pending' } }),
      this.salesRepo.count({ where: { status: 'completed' } }),
    ]);
    const totalRevenue = await this.salesRepo
      .createQueryBuilder('so')
      .select('SUM(so.total)', 'total')
      .where('so.status = :status', { status: 'completed' })
      .getRawOne();
    return {
      totalOrders,
      pendingOrders: pending,
      completedOrders: completed,
      totalRevenue: Number(totalRevenue?.total || 0),
    };
  }
}
