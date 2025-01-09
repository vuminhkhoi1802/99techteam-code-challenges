import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateItemDto } from './create-item.dto';

export class UpdateItemDto extends PartialType(CreateItemDto) {
  @ApiProperty({
    example: 'Updated task name',
    required: false,
    description: 'Only if you want to change the name',
  })
  name?: string;

  @ApiProperty({
    example: true,
    required: false,
    description: 'Mark true if the item is completed',
  })
  completed?: boolean;
}
