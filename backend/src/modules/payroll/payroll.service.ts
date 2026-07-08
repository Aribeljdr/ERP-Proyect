import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payroll } from '../../database/entities/payroll.entity';

@Injectable()
export class PayrollService {
  constructor(
    @InjectRepository(Payroll)
    private payrollRepo: Repository<Payroll>,
  ) {}

  async findAll(page = 1, limit = 10) {
    const [data, total] = await this.payrollRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total, page, limit };
  }

  async findOne(id: string) {
    const record = await this.payrollRepo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Payroll record not found');
    return record;
  }

  async create(dto: any) {
    const record = this.payrollRepo.create(dto);
    return this.payrollRepo.save(record);
  }

  async update(id: string, dto: any) {
    await this.findOne(id);
    await this.payrollRepo.update(id, dto);
    return this.findOne(id);
  }

  async delete(id: string) {
    const record = await this.findOne(id);
    await this.payrollRepo.remove(record);
    return { deleted: true };
  }

  async getSummary() {
    const [total, paid, pending] = await Promise.all([
      this.payrollRepo.count(),
      this.payrollRepo.count({ where: { status: 'paid' } }),
      this.payrollRepo.count({ where: { status: 'pending' } }),
    ]);
    const totalPaid = await this.payrollRepo
      .createQueryBuilder('p')
      .select('SUM(p.netPay)', 'total')
      .where('p.status = :status', { status: 'paid' })
      .getRawOne();
    return { total, paidRecords: paid, pendingRecords: pending, totalPaid: Number(totalPaid?.total || 0) };
  }
}
