import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {Prisma, User} from "@prisma/client";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {
  }

  async getById(
      where: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({where});
  }

  async create(id: string, userDto: UpdateUserDto): Promise<User | null> {
    return this.prisma.user.create({
      data: {
        id: id,
        name: userDto.name,
        surname: userDto.surname,
        phone: userDto.phone,
        email: userDto.email,
      },
    });
  }

//   async update(id: string, userDto: UpdateUserDto): Promise<User | null> {
//     return this.prisma.user.update({
//       where: { id },
//       data: userDto,
//     });
//   }


}

