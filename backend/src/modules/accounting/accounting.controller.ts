import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { AccountingService } from './accounting.service';

@Controller('accounting')
export class AccountingController {
  constructor(private accountingService: AccountingService) {}

  @Get()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.accountingService.findAll(page || 1, limit || 10);
  }

  @Get('summary')
  getSummary() {
    return this.accountingService.getSummary();
  }

  @Post()
  create(@Body() dto: any) {
    return this.accountingService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.accountingService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.accountingService.delete(id);
  }
}
