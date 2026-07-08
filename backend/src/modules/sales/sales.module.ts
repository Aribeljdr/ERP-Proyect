import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesOrder } from '../../database/entities/sales-order.entity';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';

@Module({
  imports: [TypeOrmModule.forFeature([SalesOrder])],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
