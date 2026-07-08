import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Treasury } from '../../database/entities/treasury.entity';
import { TreasuryController } from './treasury.controller';
import { TreasuryService } from './treasury.service';

@Module({
  imports: [TypeOrmModule.forFeature([Treasury])],
  controllers: [TreasuryController],
  providers: [TreasuryService],
})
export class TreasuryModule {}
