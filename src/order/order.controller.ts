import {
  Get,
  Controller, UseGuards, Body, Post, Render, Param,
} from "@nestjs/common";
import { OrderService } from './order.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {AuthGuard} from "../auth/auth.guard";
import {SessionContainer} from "supertokens-node/recipe/session";
import {Session} from "../auth/session.decorator";
import {NewOrderDto} from "./dto/new-order.dto";

@ApiTags('Order')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Get order info by id' })
  @ApiResponse({ status: 200, description: 'Page rendered' })
  @Get('all')
  @Render('orders.hbs')
  @UseGuards(new AuthGuard())
  async getOrders(@Session() session: SessionContainer) {
    let userId = session.getUserId();
    const viewData = await this.orderService.getAll(userId);
    console.log('ViewData:', viewData);
    const length = viewData.length
    return { viewData, length };
  }

  @ApiOperation({ summary: 'Create order' })
  @ApiResponse({ status: 200, description: 'order created' })
  @Post('create')
  async createOrder(@Body() orderDto: NewOrderDto) {
    return this.orderService.create(orderDto);
  }

  @ApiOperation({ summary: 'set order to user' })
  @ApiResponse({ status: 200, description: 'user and order are connected' })
  @Post('connect/:orderId')
  @UseGuards(new AuthGuard())
  async connectOrder(@Session() session: SessionContainer, @Param('orderId') id: string) {
    let userId = session.getUserId();
    const orderId = parseInt(id, 10);
    return this.orderService.connect(userId, orderId);
  }
}
