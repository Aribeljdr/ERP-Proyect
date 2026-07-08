import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from '../../database/entities/expense.entity';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private expensesRepo: Repository<Expense>,
  ) {}

  async findAll(page = 1, limit = 10) {
    const [data, total] = await this.expensesRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { date: 'DESC' },
    });
    return { data, total, page, limit };
  }

  async findOne(id: string) {
    const expense = await this.expensesRepo.findOne({ where: { id } });
    if (!expense) throw new NotFoundException('Expense not found');
    return expense;
  }

  async create(dto: any) {
    const expense = this.expensesRepo.create(dto);
    return this.expensesRepo.save(expense);
  }

  async update(id: string, dto: any) {
    await this.findOne(id);
    await this.expensesRepo.update(id, dto);
    return this.findOne(id);
  }

  async delete(id: string) {
    const expense = await this.findOne(id);
    await this.expensesRepo.remove(expense);
    return { deleted: true };
  }

  async getSummary() {
    const [total, paid, pending] = await Promise.all([
      this.expensesRepo.count(),
      this.expensesRepo.count({ where: { status: 'paid' } }),
      this.expensesRepo.count({ where: { status: 'pending' } }),
    ]);
    const totalAmount = await this.expensesRepo
      .createQueryBuilder('e')
      .select('SUM(e.amount)', 'total')
      .getRawOne();
    return { total, paid, pending, totalAmount: Number(totalAmount?.total || 0) };
  }
}
