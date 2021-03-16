import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { AdvanceLevel } from './enum/advance-level.enum';
import { DanceType } from './enum/dance-type.enum';
import { Schedule } from 'src/schedule/entities/schedule.entity';

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

  @Get(':advanceLevel')
  findAllByAdvanceLevel(@Param('advanceLevel') advanceLevel: AdvanceLevel) {
    return this.groupService.findAllByAdvanceLevel(advanceLevel);
  }

  @Get(':danceType')
  findAllByDanceType(@Param('danceType') danceType: DanceType) {
    return this.groupService.findAllByDanceType(danceType);
  }

  @Get('teachers/:teacherId')
  findAllByTeacherId(@Param('teacherId') teachers: string) {
    return this.groupService.findAllByTeacherId(teachers);
  }

  @Get(':scheduleId')
  findOneByScheduleId(@Param('scheduleId') schedule: Schedule) {
    return this.groupService.findOneByScheduleId(schedule);
  }

  // @Get(':studentId')
  // findAllByStudentId(@Param('studentId') students: string) {
  //   return this.groupService.findAllByStudentId(students);
  // }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(id);
  }
}
// a reszta endpointów - > wyszukiwanie po teacherze, userze , po type tańca i levelu
