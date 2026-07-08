import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { PayrollService } from './payroll.service';

@Controller('payroll')
export class PayrollController {
  constructor(private payrollService: PayrollService) {}

  @Get()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.payrollService.findAll(page || 1, limit || 10);
  }

  @Get('summary')
  getSummary() {
    return this.payrollService.getSummary();
  }

  @Post()
  create(@Body() dto: any) {
    return this.payrollService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.payrollService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.payrollService.delete(id);
  }
}
