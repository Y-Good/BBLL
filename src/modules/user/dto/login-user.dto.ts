import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
    @ApiProperty()
    number:string;

    @ApiProperty()
    password:string;
}