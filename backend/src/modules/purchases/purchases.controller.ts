import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { PurchasesService } from './purchases.service';

@Controller('purchases')
export class PurchasesController {
  constructor(private purchasesService: PurchasesService) {}

  @Get()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.purchasesService.findAll(page || 1, limit || 10);
  }

  @Get('summary')
  getSummary() {
    return this.purchasesService.getSummary();
  }

  @Post()
  create(@Body() dto: any) {
    return this.purchasesService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.purchasesService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.purchasesService.delete(id);
  }
}
