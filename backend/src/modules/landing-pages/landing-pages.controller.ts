import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { LandingPagesService } from './landing-pages.service';

@Controller('landing-pages')
export class LandingPagesController {
  constructor(private landingPagesService: LandingPagesService) {}

  @Get()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.landingPagesService.findAll(page || 1, limit || 10);
  }

  @Get('summary')
  getSummary() {
    return this.landingPagesService.getSummary();
  }

  @Post()
  create(@Body() dto: any) {
    return this.landingPagesService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.landingPagesService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.landingPagesService.delete(id);
  }
}
