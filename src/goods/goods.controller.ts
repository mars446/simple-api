import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { CreateGoodDto } from './dto/create-good.dto';
import { UpdateGoodDto } from './dto/update-good.dto';
import { ApiTags } from '@nestjs/swagger';
import { Good } from './interfaces/goods.interface';


@ApiTags('goods')
@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Post()
  create(@Body() createGoodDto: CreateGoodDto):Good {
    return this.goodsService.create(createGoodDto);
  }

  @Get()
  findAll() {
    return this.goodsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.goodsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGoodDto: UpdateGoodDto):Good {
    return this.goodsService.update(+id, updateGoodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goodsService.remove(+id);
  }
}
