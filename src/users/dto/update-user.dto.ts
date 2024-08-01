import { PartialType } from '@nestjs/mapped-types';
import { RtcRequest } from './create-user.dto';

export class UpdateUserDto extends PartialType(RtcRequest) {
  id: number;
}
