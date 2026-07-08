import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JournalEntry } from '../../database/entities/journal-entry.entity';

@Injectable()
export class AccountingService {
  constructor(
    @InjectRepository(JournalEntry)
    private journalRepo: Repository<JournalEntry>,
  ) {}

  async findAll(page = 1, limit = 10) {
    const [data, total] = await this.journalRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { date: 'DESC' },
    });
    return { data, total, page, limit };
  }

  async findOne(id: string) {
    const entry = await this.journalRepo.findOne({ where: { id } });
    if (!entry) throw new NotFoundException('JournalEntry not found');
    return entry;
  }

  async create(dto: any) {
    const entry = this.journalRepo.create(dto);
    return this.journalRepo.save(entry);
  }

  async update(id: string, dto: any) {
    await this.findOne(id);
    await this.journalRepo.update(id, dto);
    return this.findOne(id);
  }

  async delete(id: string) {
    const entry = await this.findOne(id);
    await this.journalRepo.remove(entry);
    return { deleted: true };
  }

  async getSummary() {
    const [total, debits, credits] = await Promise.all([
      this.journalRepo.count(),
      this.journalRepo.find({ where: { entryType: 'debit' } }),
      this.journalRepo.find({ where: { entryType: 'credit' } }),
    ]);
    const totalDebits = debits.reduce((s, e) => s + Number(e.amount), 0);
    const totalCredits = credits.reduce((s, e) => s + Number(e.amount), 0);
    return { total, totalDebits, totalCredits };
  }
}
