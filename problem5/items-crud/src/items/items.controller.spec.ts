import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

describe('ItemsController', () => {
  let controller: ItemsController;
  let service: ItemsService;

  const mockItemsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [
        {
          provide: ItemsService,
          useValue: mockItemsService,
        },
      ],
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
    service = module.get<ItemsService>(ItemsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call ItemsService.create and return the result', async () => {
      const dto: CreateItemDto = { name: 'Test Item', completed: false };
      const createdItem = { id: 1, ...dto };

      mockItemsService.create.mockResolvedValue(createdItem);

      const result = await controller.create(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(createdItem);
    });
  });

  describe('findAll', () => {
    it('should return an array of items', async () => {
      const items = [{ id: 1, name: 'Item 1', completed: false }];
      mockItemsService.findAll.mockResolvedValue(items);

      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(items);
    });
  });

  describe('findOne', () => {
    it('should return a single item', async () => {
      const item = { id: 1, name: 'Item 1', completed: false };
      mockItemsService.findOne.mockResolvedValue(item);

      const result = await controller.findOne('1');
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(item);
    });
  });

  describe('update', () => {
    it('should update and return the updated item', async () => {
      const updateDto: UpdateItemDto = { name: 'Updated', completed: true };
      const updatedItem = { id: 1, ...updateDto };

      mockItemsService.update.mockResolvedValue(updatedItem);

      const result = await controller.update('1', updateDto);
      expect(service.update).toHaveBeenCalledWith(1, updateDto);
      expect(result).toEqual(updatedItem);
    });
  });

  describe('remove', () => {
    it('should delete the item and return void', async () => {
      mockItemsService.remove.mockResolvedValue(undefined);

      const result = await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toBeUndefined();
    });
  });
});
