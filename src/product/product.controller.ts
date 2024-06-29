import {
  Get,
  Param,
  Controller,
  Render,
} from "@nestjs/common";
import { ProductService } from './product.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Page rendered' })
  @Get('category/:categoryId')
  @Render('products.hbs')
  async getProducts(@Param('categoryId') categoryId: string) {
    const viewData = await this.productService.getAll(categoryId);
    return { viewData };
  }

  @ApiOperation({ summary: 'Get Product by Id and render' })
  @ApiResponse({ status: 200, description: 'Page rendered' })
  @Get('item/:id')
  @Render('item.hbs')
  async getProduct(@Param('id') id: string) {
    return this.productService.getById({
      id: Number(id),
    });
  }

  // @ApiOperation({ summary: 'Get Product by Id' })
  // @ApiResponse({ status: 200, description: 'get json data' })
  // @Get('/:id')
  // async getProductById(@Param('id') id: string) {
  //   return await this.productService.getById({
  //     id: Number(id),
  //   });
  // }
}
