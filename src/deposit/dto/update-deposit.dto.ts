import { PartialType } from '@nestjs/mapped-types';
import { CreateDepositDto } from './create-deposit.dto';

export class UpdateDepositDto extends PartialType(CreateDepositDto) {
  id: string;
  idUser: string;
  amount: number;
  isPaid: boolean;
}
