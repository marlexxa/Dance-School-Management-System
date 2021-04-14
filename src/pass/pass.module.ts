import { Module } from '@nestjs/common';
import { PassService } from './pass.service';
import { PassController } from './pass.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pass, PassSchema } from './entities/pass.entity';
import { UserSchema } from '../user/entities/user.entity';
import { GroupSchema } from '../group/entities/group.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Pass',
        schema: PassSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'Group',
        schema: GroupSchema,
      },
    ]),
  ],
  controllers: [PassController],
  providers: [PassService],
})
export class PassModule {}
