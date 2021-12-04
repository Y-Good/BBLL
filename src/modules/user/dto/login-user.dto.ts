import { ApiProperty, PickType } from "@nestjs/swagger";
import { User } from "src/entities/user.entity";

export class LoginUserDto extends PickType(User,["number","password"] as const) {}