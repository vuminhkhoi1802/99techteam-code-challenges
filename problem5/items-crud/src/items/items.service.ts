import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  private readonly logger = new Logger(ItemsService.name);
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
  ) { }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    this.logger.log(
      `Creating item with data: ${JSON.stringify(createItemDto)}`,
    );
    const newItem = this.itemsRepository.create(createItemDto);
    return await this.itemsRepository.save(newItem);
  }

  async findAll(): Promise<Item[]> {
    this.logger.log(`Fetching all items...`);
    return await this.itemsRepository.find();
  }

  async findOne(id: number): Promise<Item> {
    this.logger.log(`Fetching item #${id}`);
    return await this.itemsRepository.findOne({ where: { id } });
  }

  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    this.logger.log(
      `Updating item #${id} with data: ${JSON.stringify(updateItemDto)}`,
    );
    const item = await this.findOne(id);
    if (!item) {
      this.logger.error(`Item #${id} not found!`);
      throw new Error('Item not found');
    }
    Object.assign(item, updateItemDto);
    return await this.itemsRepository.save(item);
  }

  async remove(id: number): Promise<void> {
    this.logger.warn(`Deleting item #${id}`);
    await this.itemsRepository.delete(id);
  }
}
