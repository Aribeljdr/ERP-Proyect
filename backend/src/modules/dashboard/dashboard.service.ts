import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Kpi } from '../../database/entities/kpi.entity';
import { Activity } from '../../database/entities/activity.entity';
import { Meeting } from '../../database/entities/meeting.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Kpi)
    private kpisRepo: Repository<Kpi>,
    @InjectRepository(Activity)
    private activitiesRepo: Repository<Activity>,
    @InjectRepository(Meeting)
    private meetingsRepo: Repository<Meeting>,
  ) {}

  async getDashboard() {
    const [kpis, activities, meetings] = await Promise.all([
      this.kpisRepo.find(),
      this.activitiesRepo.find({ order: { createdAt: 'DESC' }, take: 5 }),
      this.meetingsRepo.find({ order: { createdAt: 'DESC' }, take: 4 }),
    ]);
    return { kpis, activities, meetings };
  }
}
