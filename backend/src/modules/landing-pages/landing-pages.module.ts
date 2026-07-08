import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LandingPage } from '../../database/entities/landing-page.entity';
import { LandingPagesController } from './landing-pages.controller';
import { LandingPagesService } from './landing-pages.service';

@Module({
  imports: [TypeOrmModule.forFeature([LandingPage])],
  controllers: [LandingPagesController],
  providers: [LandingPagesService],
})
export class LandingPagesModule {}
