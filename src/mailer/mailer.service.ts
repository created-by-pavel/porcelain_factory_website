import {Injectable} from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class MailerService {
    private transporter: nodemailer.Transporter;

    constructor(private configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.mail.ru',
            port: 465,
            secure: true,
            auth: {
                user: this.configService.get<string>('EMAIL_USER'),
                pass: this.configService.get<string>('EMAIL_PASS'),
            },
        });
    }

    async sendMail(to: string, subject: string, html: string) {
        const mailOptions = {
            from: this.configService.get<string>('EMAIL_USER'),
            to,
            subject,
            html,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            return {message: 'Email sent successfully'};
        } catch (error) {
            throw new Error('Failed to send email: ' + error.message);
        }
    }
}