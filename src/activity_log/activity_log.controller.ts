import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActivityLogService } from './activity_log.service';
import { CreateActivityLogDto } from './dto/create-activity_log.dto';
import { UpdateActivityLogDto } from './dto/update-activity_log.dto';

@ApiTags('Activity Logs')
@Controller('activity-logs')
export class ActivityLogController {
  constructor(private readonly activityLogService: ActivityLogService) {}

  @Post()
  create(@Body() createActivityLogDto: CreateActivityLogDto) {
    return this.activityLogService.create(createActivityLogDto);
  }

  @Get()
  findAll() {
    return this.activityLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.activityLogService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateActivityLogDto: UpdateActivityLogDto,
  ) {
    return this.activityLogService.update(id, updateActivityLogDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.activityLogService.remove(id);
  }
}

