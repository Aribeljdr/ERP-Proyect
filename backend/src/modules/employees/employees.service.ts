import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../../database/entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeesRepo: Repository<Employee>,
  ) {}

  async findAll(page = 1, limit = 10) {
    const [data, total] = await this.employeesRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total, page, limit };
  }

  async findOne(id: string) {
    const employee = await this.employeesRepo.findOne({ where: { id } });
    if (!employee) throw new NotFoundException('Employee not found');
    return employee;
  }

  async create(dto: any) {
    const employee = this.employeesRepo.create(dto);
    return this.employeesRepo.save(employee);
  }

  async update(id: string, dto: any) {
    await this.findOne(id);
    await this.employeesRepo.update(id, dto);
    return this.findOne(id);
  }

  async delete(id: string) {
    const employee = await this.findOne(id);
    await this.employeesRepo.remove(employee);
    return { deleted: true };
  }

  async getSummary() {
    const [total, active, onLeave] = await Promise.all([
      this.employeesRepo.count(),
      this.employeesRepo.count({ where: { status: 'active' } }),
      this.employeesRepo.count({ where: { status: 'on_leave' } }),
    ]);
    const payrollTotal = await this.employeesRepo
      .createQueryBuilder('e')
      .select('SUM(e.salary)', 'total')
      .where('e.status = :status', { status: 'active' })
      .getRawOne();
    return { total, activeEmployees: active, onLeave, payrollTotal: Number(payrollTotal?.total || 0) };
  }
}
