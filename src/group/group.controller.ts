import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { AdvanceLevel } from './enum/advance-level.enum';
import { DanceType } from './enum/dance-type.enum';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(id);
  }

  @Get('advanceLevels:advanceLevel')
  findAllByAdvanceLevel(@Param('advanceLevel') advanceLevel: AdvanceLevel) {
    return this.groupService.findAllByAdvanceLevel(advanceLevel);
  }

  @Get('daceTypes:danceType')
  findAllByDanceType(@Param('danceType') danceType: DanceType) {
    return this.groupService.findAllByDanceType(danceType);
  }

  @Get('teachers/:teacherId')
  findAllByTeacherId(@Param('teacherId') teachers: string) {
    return this.groupService.findAllByTeacherId(teachers);
  }

  @Get('students/:studentId')
  findAllByStudentId(@Param('studentId') students: string) {
    return this.groupService.findAllByStudentId(students);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(id);
  }
}
