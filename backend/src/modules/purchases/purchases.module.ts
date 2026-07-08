import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrder } from '../../database/entities/purchase-order.entity';
import { PurchasesController } from './purchases.controller';
import { PurchasesService } from './purchases.service';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseOrder])],
  controllers: [PurchasesController],
  providers: [PurchasesService],
})
export class PurchasesModule {}
