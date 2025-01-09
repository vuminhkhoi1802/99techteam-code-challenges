import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Item } from '../items/entities/item.entity';

dotenv.config();

const dataSource = new DataSource({
  type: process.env.DB_TYPE as any,
  database: process.env.DB_DATABASE,
  entities: [Item],
  synchronize: true,
});

export default dataSource;
