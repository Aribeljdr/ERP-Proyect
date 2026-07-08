import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { EmailTemplatesService } from './email-templates.service';

@Controller('email-templates')
export class EmailTemplatesController {
  constructor(private emailTemplatesService: EmailTemplatesService) {}

  @Get()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.emailTemplatesService.findAll(page || 1, limit || 10);
  }

  @Get('summary')
  getSummary() {
    return this.emailTemplatesService.getSummary();
  }

  @Post()
  create(@Body() dto: any) {
    return this.emailTemplatesService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.emailTemplatesService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.emailTemplatesService.delete(id);
  }
}
