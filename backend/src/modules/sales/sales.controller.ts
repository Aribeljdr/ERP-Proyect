import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private salesService: SalesService) {}

  @Get()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.salesService.findAll(page || 1, limit || 10);
  }

  @Get('summary')
  getSummary() {
    return this.salesService.getSummary();
  }

  @Post()
  create(@Body() dto: any) {
    return this.salesService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.salesService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.salesService.delete(id);
  }
}
