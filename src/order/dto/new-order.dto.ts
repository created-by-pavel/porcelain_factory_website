import { ApiProperty } from '@nestjs/swagger';

export class NewOrderDto {
  @ApiProperty({
    example: 'John',
    description: 'Order name',
  })
  name: string;
  @ApiProperty({
    example: 'Smith',
    description: 'Order second name',
  })
  surname: string;
  @ApiProperty({
    example: 'helloworld@mail.ru',
    description: 'Order email',
  })
  email: string;
  @ApiProperty({
    example: '89146639501',
    description: 'Order phone number',
  })
  phone: string;
  @ApiProperty({
    example: '[ 1,2,3 ]',
    description: 'Order products ids',
  })
  products: number[];
}