import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Get()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.inventoryService.findAll(page || 1, limit || 20);
  }

  @Get('summary')
  getSummary() {
    return this.inventoryService.getSummary();
  }

  @Post()
  create(@Body() dto: any) {
    return this.inventoryService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.inventoryService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.inventoryService.delete(id);
  }
}
