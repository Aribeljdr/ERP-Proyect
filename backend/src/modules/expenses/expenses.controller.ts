import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
export class ExpensesController {
  constructor(private expensesService: ExpensesService) {}

  @Get()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.expensesService.findAll(page || 1, limit || 10);
  }

  @Get('summary')
  getSummary() {
    return this.expensesService.getSummary();
  }

  @Post()
  create(@Body() dto: any) {
    return this.expensesService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.expensesService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.expensesService.delete(id);
  }
}
