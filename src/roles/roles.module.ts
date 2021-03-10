import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSchema } from './entities/role.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Role',
        schema: RoleSchema,
      },
    ]),
  ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
