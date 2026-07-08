import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../database/entities/product.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Product)
    private productsRepo: Repository<Product>,
  ) {}

  async findAll(page = 1, limit = 20) {
    const [data, total] = await this.productsRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { name: 'ASC' },
    });
    return { data, total, page, limit };
  }

  async findOne(id: string) {
    const product = await this.productsRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async create(dto: any) {
    const product = this.productsRepo.create(dto);
    return this.productsRepo.save(product);
  }

  async update(id: string, dto: any) {
    await this.findOne(id);
    await this.productsRepo.update(id, dto);
    return this.findOne(id);
  }

  async delete(id: string) {
    const product = await this.findOne(id);
    await this.productsRepo.remove(product);
    return { deleted: true };
  }

  async getSummary() {
    const [totalProducts, lowStock] = await Promise.all([
      this.productsRepo.count(),
      this.productsRepo.createQueryBuilder('p')
        .where('p.stock <= p.minStock')
        .getCount(),
    ]);
    const totalValue = await this.productsRepo
      .createQueryBuilder('p')
      .select('SUM(p.stock * p.price)', 'total')
      .getRawOne();
    return { totalProducts, lowStockItems: lowStock, totalValue: Number(totalValue?.total || 0) };
  }
}
