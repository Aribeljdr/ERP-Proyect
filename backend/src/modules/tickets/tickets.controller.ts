import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private ticketsService: TicketsService) {}

  @Get()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.ticketsService.findAll(page || 1, limit || 10);
  }

  @Get('summary')
  getSummary() {
    return this.ticketsService.getSummary();
  }

  @Post()
  create(@Body() dto: any) {
    return this.ticketsService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.ticketsService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.ticketsService.delete(id);
  }
}
