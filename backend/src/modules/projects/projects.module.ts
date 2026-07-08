import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KanbanCard } from '../../database/entities/kanban-card.entity';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([KanbanCard])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
