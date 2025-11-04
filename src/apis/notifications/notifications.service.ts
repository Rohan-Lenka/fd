import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NestService } from '@nest-extended/core/lib/nest.service';
import {
  Notifications,
  NotificationsDocument,
} from 'src/schemas/notifications.schema';

@Injectable()
export class NotificationsService extends NestService<
  Notifications,
  NotificationsDocument
> {
  constructor(
    @InjectModel(Notifications.name)
    private readonly notificationsModel: Model<Notifications>,
  ) {
    super(notificationsModel);
  }
}
