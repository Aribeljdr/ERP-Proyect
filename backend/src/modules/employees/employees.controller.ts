import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  @Get()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.employeesService.findAll(page || 1, limit || 10);
  }

  @Get('summary')
  getSummary() {
    return this.employeesService.getSummary();
  }

  @Post()
  create(@Body() dto: any) {
    return this.employeesService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.employeesService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.employeesService.delete(id);
  }
}
