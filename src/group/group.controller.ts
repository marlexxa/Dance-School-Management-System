import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Controller('group')
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
  findAllByAdvanceLevel(@Param('advanceLevel') advanceLevel: string) {
    return this.groupService.findAllByAdvanceLevel(advanceLevel);
  }

  @Get(':danceType')
  findAllByDanceType(@Param('danceType') danceType: string) {
    return this.groupService.findAllByDanceType(danceType);
  }

  @Get(':teacherId')
  findAllByTeacherId(@Param('teacherId') teachers: string) {
    return this.groupService.findAllByTeacherId(teachers);
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
