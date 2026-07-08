import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get('board')
  getBoard() {
    return this.projectsService.getBoard();
  }

  @Post('cards')
  createCard(@Body() data: any) {
    return this.projectsService.createCard(data);
  }

  @Put('cards/:id/move')
  moveCard(@Param('id') id: string, @Body() body: { toColumn: string }) {
    return this.projectsService.moveCard(id, body.toColumn);
  }

  @Put('cards/:id')
  updateCard(@Param('id') id: string, @Body() data: any) {
    return this.projectsService.updateCard(id, data);
  }

  @Delete('cards/:id')
  deleteCard(@Param('id') id: string) {
    return this.projectsService.deleteCard(id);
  }
}
