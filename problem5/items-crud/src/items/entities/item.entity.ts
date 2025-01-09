import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Auto-increment primary key' })
  id: number;

  @Column()
  @ApiProperty({ example: 'Do laundry' })
  name: string;

  @Column({ default: false })
  @ApiProperty({ example: false, description: 'Task completion status' })
  completed: boolean;
}
