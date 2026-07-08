import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { InvoicingService } from './invoicing.service';

@Controller('invoices')
export class InvoicingController {
  constructor(private invoicingService: InvoicingService) {}

  @Get()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.invoicingService.findAll(page || 1, limit || 10);
  }

  @Get('summary')
  getSummary() {
    return this.invoicingService.getSummary();
  }

  @Post()
  create(@Body() dto: any) {
    return this.invoicingService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.invoicingService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.invoicingService.delete(id);
  }
}
