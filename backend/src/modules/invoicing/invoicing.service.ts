import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from '../../database/entities/invoice.entity';

@Injectable()
export class InvoicingService {
  constructor(
    @InjectRepository(Invoice)
    private invoicesRepo: Repository<Invoice>,
  ) {}

  async findAll(page = 1, limit = 10) {
    const [data, total] = await this.invoicesRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total, page, limit };
  }

  async findOne(id: string) {
    const invoice = await this.invoicesRepo.findOne({ where: { id } });
    if (!invoice) throw new NotFoundException('Invoice not found');
    return invoice;
  }

  async create(dto: any) {
    const invoice = this.invoicesRepo.create(dto);
    return this.invoicesRepo.save(invoice);
  }

  async update(id: string, dto: any) {
    await this.findOne(id);
    await this.invoicesRepo.update(id, dto);
    return this.findOne(id);
  }

  async delete(id: string) {
    const invoice = await this.findOne(id);
    await this.invoicesRepo.remove(invoice);
    return { deleted: true };
  }

  async getSummary() {
    const [totalInvoices, paid, overdue] = await Promise.all([
      this.invoicesRepo.count(),
      this.invoicesRepo.count({ where: { status: 'paid' } }),
      this.invoicesRepo.count({ where: { status: 'overdue' } }),
    ]);
    const totalAmount = await this.invoicesRepo
      .createQueryBuilder('inv')
      .select('SUM(inv.total)', 'total')
      .where('inv.status != :status', { status: 'cancelled' })
      .getRawOne();
    return {
      totalInvoices,
      paidInvoices: paid,
      overdueInvoices: overdue,
      totalAmount: Number(totalAmount?.total || 0),
    };
  }
}
