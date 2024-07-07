import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    example: 'Ivan',
    description: 'User name',
  })
  name: string;
  @ApiProperty({
    example: '',
    description: 'User surname',
  })
  surname: string;
  @ApiProperty({
    example: '+79143457766',
    description: 'User phone number',
  })
  phone: string;
  @ApiProperty({
    example: 'yoda144@mail.ru',
    description: 'User email address',
  })
  email: string;
}