import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({
    example: 'My first task',
    description: 'The name of the item/task',
  })
  name: string;

  @ApiProperty({
    example: false,
    description: 'Has the task been completed?',
    required: false,
  })
  completed?: boolean;
}
