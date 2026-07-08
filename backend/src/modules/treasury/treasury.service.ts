import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Treasury } from '../../database/entities/treasury.entity';

@Injectable()
export class TreasuryService {
  constructor(
    @InjectRepository(Treasury)
    private treasuryRepo: Repository<Treasury>,
  ) {}

  async findAll(page = 1, limit = 10) {
    const [data, total] = await this.treasuryRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { date: 'DESC' },
    });
    return { data, total, page, limit };
  }

  async findOne(id: string) {
    const movement = await this.treasuryRepo.findOne({ where: { id } });
    if (!movement) throw new NotFoundException('Treasury movement not found');
    return movement;
  }

  async create(dto: any) {
    const movement = this.treasuryRepo.create(dto);
    return this.treasuryRepo.save(movement);
  }

  async update(id: string, dto: any) {
    await this.findOne(id);
    await this.treasuryRepo.update(id, dto);
    return this.findOne(id);
  }

  async delete(id: string) {
    const movement = await this.findOne(id);
    await this.treasuryRepo.remove(movement);
    return { deleted: true };
  }

  async getSummary() {
    const [total, income, expenses] = await Promise.all([
      this.treasuryRepo.count(),
      this.treasuryRepo.find({ where: { type: 'income' } }),
      this.treasuryRepo.find({ where: { type: 'expense' } }),
    ]);
    const totalIncome = income.reduce((s, m) => s + Number(m.amount), 0);
    const totalExpenses = expenses.reduce((s, m) => s + Number(m.amount), 0);
    return { total, totalIncome, totalExpenses, balance: totalIncome - totalExpenses };
  }
}
