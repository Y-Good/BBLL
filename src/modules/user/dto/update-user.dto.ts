import { OmitType } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';

export class UpdateUserDto extends OmitType(User, ["number", "password","type"] as const) {


}
