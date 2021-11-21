import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LiveService } from './live.service';
import { CreateLiveDto } from './dto/create-live.dto';
import { UpdateLiveDto } from './dto/update-live.dto';

@Controller('live')
export class LiveController {
  constructor(private readonly liveService: LiveService) {}

  @Post()
  create(@Body() createLiveDto: CreateLiveDto) {
    return this.liveService.create(createLiveDto);
  }

  @Get()
  findAll() {
    return this.liveService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.liveService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLiveDto: UpdateLiveDto) {
    return this.liveService.update(+id, updateLiveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.liveService.remove(+id);
  }
}
