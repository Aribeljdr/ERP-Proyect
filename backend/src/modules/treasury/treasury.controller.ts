import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { TreasuryService } from './treasury.service';

@Controller('treasury')
export class TreasuryController {
  constructor(private treasuryService: TreasuryService) {}

  @Get()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.treasuryService.findAll(page || 1, limit || 10);
  }

  @Get('summary')
  getSummary() {
    return this.treasuryService.getSummary();
  }

  @Post()
  create(@Body() dto: any) {
    return this.treasuryService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.treasuryService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.treasuryService.delete(id);
  }
}
