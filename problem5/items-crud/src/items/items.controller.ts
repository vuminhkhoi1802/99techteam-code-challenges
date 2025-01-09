import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@ApiTags('items')
@Controller('items')
export class ItemsController {
  private readonly logger = new Logger(ItemsController.name);

  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new item.' })
  @ApiBody({
    type: CreateItemDto,
    examples: {
      default: {
        summary: 'Typical Example',
        description: 'Create a task with optional "completed" field',
        value: {
          name: 'Buy Groceries',
          completed: false,
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The item has been successfully created.',
    type: Item,
  })
  async create(@Body() createItemDto: CreateItemDto) {
    this.logger.log('Received request to create an item.');
    return this.itemsService.create(createItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all items.' })
  @ApiResponse({
    status: 200,
    description: 'Return an array of items.',
    type: [Item],
  })
  async findAll() {
    this.logger.log('Received request to list items.');
    return this.itemsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single item by its ID.' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Unique identifier of the item',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Return the item with the given ID.',
    type: Item,
  })
  @ApiResponse({
    status: 404,
    description: 'Item not found.',
  })
  async findOne(@Param('id') id: string) {
    this.logger.log(`Received request to get item #${id}.`);
    return this.itemsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing item.' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
  })
  @ApiBody({
    type: UpdateItemDto,
    examples: {
      default: {
        summary: 'Update Example',
        value: {
          name: 'Buy Milk',
          completed: true,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Item updated successfully.',
    type: Item,
  })
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    this.logger.log(`Received request to update item #${id}.`);
    return this.itemsService.update(+id, updateItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an item by its ID.' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Item deleted successfully.',
  })
  async remove(@Param('id') id: string) {
    this.logger.warn(`Received request to delete item #${id}.`);
    return this.itemsService.remove(+id);
  }
}
