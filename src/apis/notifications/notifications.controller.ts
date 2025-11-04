import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { User } from '@nest-extended/core/common/decorators/User.decorator';
import { Notifications } from 'src/schemas/notifications.schema';
import {
  ModifyBody,
  setCreatedBy,
} from '@nest-extended/core/common/decorators/ModifyBody.decorator';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async find(@Query() query: Record<string, any>) {
    return await this.notificationsService._find(query);
  }

  @Get('/:id?')
  async get(@Query() query: Record<string, any>, @Param('id') id: string) {
    return await this.notificationsService._get(id, query);
  }

  @Post()
  async create(
    @ModifyBody(setCreatedBy()) createNotificationsDto: Notifications,
  ) {
    return await this.notificationsService._create(createNotificationsDto);
  }

  @Patch('/:id?')
  async patch(
    @Query() query,
    @Body() patchNotificationsDto: Partial<Notifications>,
    @Param('id') id,
  ) {
    return await this.notificationsService._patch(
      id,
      patchNotificationsDto,
      query,
    );
  }

  @Delete('/:id?')
  async delete(@Param('id') id, @Query() query, @User() user) {
    return await this.notificationsService._remove(id, query, user);
  }
}
