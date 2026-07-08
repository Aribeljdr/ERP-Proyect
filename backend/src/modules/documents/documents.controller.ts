import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { DocumentsService } from './documents.service';

@Controller('documents')
export class DocumentsController {
  constructor(private documentsService: DocumentsService) {}

  @Get()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.documentsService.findAll(page || 1, limit || 10);
  }

  @Get('summary')
  getSummary() {
    return this.documentsService.getSummary();
  }

  @Post()
  create(@Body() dto: any) {
    return this.documentsService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.documentsService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.documentsService.delete(id);
  }
}
