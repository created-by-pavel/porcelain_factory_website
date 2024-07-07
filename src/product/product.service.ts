import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {Prisma, Product} from "@prisma/client";

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {
  }

  async getById(
    where: Prisma.ProductWhereUniqueInput,
  ): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where,
      include: {
        title: true,
        category: true,
      },
    });
  }

  async getAll(categoryId: string) {
    const products = await this.prisma.product.findMany({
      where: {
        categoryId: Number(categoryId),
      },
      include: {
        title: true,
      },
    });

    const groupedProducts = products.reduce((acc, product) => {
      const title = product.title.name;
      acc[title] = acc[title] || [];
      acc[title].push(product);
      return acc;
    }, {});

    return Object.keys(groupedProducts).map(title => ({
      title,
      products: groupedProducts[title],
    }));
  }
}
