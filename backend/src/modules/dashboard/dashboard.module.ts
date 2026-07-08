import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kpi } from '../../database/entities/kpi.entity';
import { Activity } from '../../database/entities/activity.entity';
import { Meeting } from '../../database/entities/meeting.entity';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [TypeOrmModule.forFeature([Kpi, Activity, Meeting])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
