import {
  Get,
  Controller,
  Render, UseGuards, Patch, Body, Post,
} from "@nestjs/common";
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {AuthGuard} from "../auth/auth.guard";
import {SessionContainer} from "supertokens-node/recipe/session";
import {Session} from "../auth/session.decorator";
import {UpdateUserDto} from "./dto/update-user.dto";

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get user info by id' })
  @ApiResponse({ status: 200, description: 'Page rendered' })
  @Get('info')
  @UseGuards(new AuthGuard())
  @Render('profile.hbs')
  async getUserInfo(@Session() session: SessionContainer) {
    let userId = session.getUserId();
    return this.userService.getById({ id: userId });
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, description: 'Page rendered' })
  @Post('create')
  @UseGuards(new AuthGuard())
  async createUser(@Session() session: SessionContainer, @Body() userDto: UpdateUserDto) {
    let userId = session.getUserId();
    return this.userService.create(userId, userDto);
  }
}
