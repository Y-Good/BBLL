import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BarrageService } from './barrage.service';
import { CreateBarrageDto } from './dto/create-barrage.dto';
import { UpdateBarrageDto } from './dto/update-barrage.dto';

@Controller('barrage')
export class BarrageController {
  constructor(private readonly barrageService: BarrageService) {}

  @Post()
  create(@Body() createBarrageDto: CreateBarrageDto) {
    return this.barrageService.create(createBarrageDto);
  }

  @Get()
  findAll() {
    return this.barrageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.barrageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBarrageDto: UpdateBarrageDto) {
    return this.barrageService.update(+id, updateBarrageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.barrageService.remove(+id);
  }
}
