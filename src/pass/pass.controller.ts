import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PassService } from './pass.service';
import { CreatePassDto } from './dto/create-pass.dto';
import { UpdatePassDto } from './dto/update-pass.dto';

@Controller('passes')
export class PassController {
  constructor(private readonly passService: PassService) {}

  @Get()
  findAll() {
    return this.passService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.passService.findByID(id);
  }

  @Get('users/:userID')
  findAllByUser(@Param('userID') id: string) {
    return this.passService.findAllByUserID(id);
  }

  /*@Get('groups/:groupID')
  findAllByGroup(@Param('groupID') id: string) {
    return this.passService.findAllByGroupID(id);
  }*/

  @Post()
  create(@Body() createPassDto: CreatePassDto) {
    return this.passService.create(createPassDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePassDto: UpdatePassDto) {
    return this.passService.update(id, updatePassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.passService.remove(id);
  }
}
