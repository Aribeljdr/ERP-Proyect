import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  @Get()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.attendanceService.findAll(page || 1, limit || 10);
  }

  @Get('summary')
  getSummary() {
    return this.attendanceService.getSummary();
  }

  @Post()
  create(@Body() dto: any) {
    return this.attendanceService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.attendanceService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.attendanceService.delete(id);
  }
}
