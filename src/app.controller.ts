import { Controller, Get, Render, UseGuards } from "@nestjs/common";
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  @Render('index')
  root() {
    return;
  }

  @Get('/about')
  @Render(`about`)
  getAboutPage() {
    return;
  }

  @Get('/profile')
  @Render(`profile`)
  getLoginPage() {
    return;
  }

  @Get('/register')
  @Render(`register`)
  getRegisterPage() {
    return;
  }

  @Get('/cart')
  @Render(`cart`)
  getCartPage() {
    return;
  }

  @Get('/contacts')
  @Render(`contacts`)
  getContactPage() {
    return;
  }

  @Get('/documents')
  @Render(`documents`)
  getDocumentsPage() {
    return;
  }
}