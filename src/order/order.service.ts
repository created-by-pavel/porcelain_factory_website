import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {Prisma, Order} from "@prisma/client";
import {NewOrderDto} from "./dto/new-order.dto";

@Injectable()
export class OrderService {
    constructor(private readonly prisma: PrismaService) {
    }

    async create(newOrder: NewOrderDto): Promise<Order> {
        const {products, ...orderData} = newOrder;
        const productIds = products.map((productId) => ({id: productId}));
        return this.prisma.order.create({
            data: {
                ...orderData,
                products: {
                    connect: productIds,
                },
            },
        });
    }

    async connect(userId: string, orderId: number): Promise<Order> {
        console.log(typeof orderId);
        const order = await this.prisma.order.findUnique({
            where: {id: orderId},
        });

        if (!order) {
            throw new Error(`Order with ID ${orderId} not found`);
        }

        return this.prisma.order.update({
            where: {id: orderId},
            data: {userId},
        });
    }

    async getAll(userId: string): Promise<Order[]> {
        return this.prisma.order.findMany({
            where: {
                userId: userId,
            },
            include: {
                products: {}
            },
        });
    }
}
