import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JournalEntry } from '../../database/entities/journal-entry.entity';
import { AccountingController } from './accounting.controller';
import { AccountingService } from './accounting.service';

@Module({
  imports: [TypeOrmModule.forFeature([JournalEntry])],
  controllers: [AccountingController],
  providers: [AccountingService],
})
export class AccountingModule {}
