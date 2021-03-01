import { PartialType } from '@nestjs/mapped-types';
import { CreatePassDto } from './create-pass.dto';

export class UpdatePassDto extends PartialType(CreatePassDto) {}
