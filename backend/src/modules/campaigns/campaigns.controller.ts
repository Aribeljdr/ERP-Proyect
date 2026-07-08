import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';

@Controller('campaigns')
export class CampaignsController {
  constructor(private campaignsService: CampaignsService) {}

  @Get()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.campaignsService.findAll(page || 1, limit || 10);
  }

  @Get('summary')
  getSummary() {
    return this.campaignsService.getSummary();
  }

  @Post()
  create(@Body() dto: any) {
    return this.campaignsService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.campaignsService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.campaignsService.delete(id);
  }
}
