import { Controller, Post, Body } from '@nestjs/common';
import { MailerService } from './mailer.service';

interface Product {
  name: string;
  quantity: number;
}

@Controller('mail/send')
export class MailerController {
  constructor(private readonly mailService: MailerService) {}

  @Post('contact')
  async sendContact(@Body() body: { name: string; surname: string; email: string; number: string; message: string }) {
    const { name, surname, email, number, message } = body;

    const htmlMessage = `
      <h1>Новое сообщение с сайта</h1>
      <p><strong>Имя:</strong> ${name}</p>
      <p><strong>Фамилия:</strong> ${surname}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Номер:</strong> ${number}</p>
      <p><strong>Сообщение:</strong></p>
      <p>${message}</p>
    `;
// 'sbut1@rfz.ru'
    return this.mailService.sendMail('pavelzavalnyuk11@gmail.com', 'Новое сообщение с сайта', htmlMessage);
  }

  @Post('order')
  async sendOrder(@Body() orderData: { name: string, surname: string, email: string, phone: string, products: Product[], total: string }) {
    const { name, surname, email, phone, products, total} = orderData;

    const htmlMessage = ` 
        <style>
        body {color: #000000}
        </style>
        <h1>Информация о заказе</h1>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Фамилия:</strong> ${surname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Номер телефона:</strong> ${phone}</p>
        <h2>Продукты:</h2>
        <ul style="font-size: 16px">
            ${products.map(product => `<li>${product.name}:<br> Количество: ${product.quantity}</li>`).join('')}
        </ul>
        <h2><strong>Всего:</strong> цену уточняйте у менеджера</h2>`;

    await this.mailService.sendMail(email, 'Ваш заказ на rfz.ru принят!', htmlMessage);
    // 'sbut1@rfz.ru'
    return this.mailService.sendMail('pavelzavalnyuk11@gmail.com', 'Новый Заказ', htmlMessage);
  }
}