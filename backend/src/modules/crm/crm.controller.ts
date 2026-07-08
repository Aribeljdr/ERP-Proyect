import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { CrmService } from './crm.service';

@Controller('crm')
export class CrmController {
  constructor(private crmService: CrmService) {}

  @Get()
  findAll(
    @Query('q') query?: string,
    @Query('status') status?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.crmService.findAll(query, status, page || 1, limit || 20);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crmService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.crmService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.crmService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crmService.remove(id);
  }
}
