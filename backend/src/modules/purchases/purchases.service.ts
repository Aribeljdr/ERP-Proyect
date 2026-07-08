import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseOrder } from '../../database/entities/purchase-order.entity';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(PurchaseOrder)
    private purchasesRepo: Repository<PurchaseOrder>,
  ) {}

  async findAll(page = 1, limit = 10) {
    const [data, total] = await this.purchasesRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total, page, limit };
  }

  async findOne(id: string) {
    const order = await this.purchasesRepo.findOne({ where: { id } });
    if (!order) throw new NotFoundException('PurchaseOrder not found');
    return order;
  }

  async create(dto: any) {
    const order = this.purchasesRepo.create(dto);
    return this.purchasesRepo.save(order);
  }

  async update(id: string, dto: any) {
    await this.findOne(id);
    await this.purchasesRepo.update(id, dto);
    return this.findOne(id);
  }

  async delete(id: string) {
    const order = await this.findOne(id);
    await this.purchasesRepo.remove(order);
    return { deleted: true };
  }

  async getSummary() {
    const [totalOrders, pending, received] = await Promise.all([
      this.purchasesRepo.count(),
      this.purchasesRepo.count({ where: { status: 'pending' } }),
      this.purchasesRepo.count({ where: { status: 'received' } }),
    ]);
    const totalSpent = await this.purchasesRepo
      .createQueryBuilder('po')
      .select('SUM(po.total)', 'total')
      .where('po.status = :status', { status: 'received' })
      .getRawOne();
    return { totalOrders, pendingOrders: pending, receivedOrders: received, totalSpent: Number(totalSpent?.total || 0) };
  }
}
