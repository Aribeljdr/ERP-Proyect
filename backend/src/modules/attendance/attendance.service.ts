import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttendanceRecord } from '../../database/entities/attendance-record.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceRecord)
    private attendanceRepo: Repository<AttendanceRecord>,
  ) {}

  async findAll(page = 1, limit = 10) {
    const [data, total] = await this.attendanceRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { date: 'DESC' },
    });
    return { data, total, page, limit };
  }

  async findOne(id: string) {
    const record = await this.attendanceRepo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Attendance record not found');
    return record;
  }

  async create(dto: any) {
    const record = this.attendanceRepo.create(dto);
    return this.attendanceRepo.save(record);
  }

  async update(id: string, dto: any) {
    await this.findOne(id);
    await this.attendanceRepo.update(id, dto);
    return this.findOne(id);
  }

  async delete(id: string) {
    const record = await this.findOne(id);
    await this.attendanceRepo.remove(record);
    return { deleted: true };
  }

  async getSummary() {
    const [total, present, absent, late] = await Promise.all([
      this.attendanceRepo.count(),
      this.attendanceRepo.count({ where: { status: 'present' } }),
      this.attendanceRepo.count({ where: { status: 'absent' } }),
      this.attendanceRepo.count({ where: { status: 'late' } }),
    ]);
    return { total, present, absent, late };
  }
}
