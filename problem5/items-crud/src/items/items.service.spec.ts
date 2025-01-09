// items.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

describe('ItemsService', () => {
  let service: ItemsService;
  let repository: Repository<Item>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: getRepositoryToken(Item),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
    repository = module.get<Repository<Item>>(getRepositoryToken(Item));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a new Item', async () => {
      const dto: CreateItemDto = { name: 'Test Item', completed: false };
      const entity = { id: 1, ...dto };

      mockRepository.create.mockReturnValue(entity);
      mockRepository.save.mockResolvedValue(entity);

      const result = await service.create(dto);

      expect(mockRepository.create).toHaveBeenCalledWith(dto);
      expect(mockRepository.save).toHaveBeenCalledWith(entity);
      expect(result).toEqual(entity);
    });
  });

  describe('findAll', () => {
    it('should return an array of items', async () => {
      const items = [{ id: 1, name: 'Item 1', completed: false }];
      mockRepository.find.mockResolvedValue(items);

      const result = await service.findAll();
      expect(mockRepository.find).toHaveBeenCalled();
      expect(result).toEqual(items);
    });
  });

  describe('findOne', () => {
    it('should return a single item', async () => {
      const item = { id: 1, name: 'Item 1', completed: false };
      mockRepository.findOne.mockResolvedValue(item);

      const result = await service.findOne(1);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(item);
    });
  });

  describe('update', () => {
    it('should update and return the updated item', async () => {
      const existingItem = { id: 1, name: 'Old Name', completed: false };
      const updateDto: UpdateItemDto = { name: 'New Name', completed: true };
      const updatedItem = { ...existingItem, ...updateDto };

      // findOne must return an existing item
      mockRepository.findOne.mockResolvedValue(existingItem);
      mockRepository.save.mockResolvedValue(updatedItem);

      const result = await service.update(1, updateDto);
      expect(result).toEqual(updatedItem);
      expect(mockRepository.save).toHaveBeenCalledWith(updatedItem);
    });

    it('should throw error if item not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.update(999, { name: 'Any' })).rejects.toThrow(
        'Item not found',
      );
    });
  });

  describe('remove', () => {
    it('should delete an item', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(1);
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
