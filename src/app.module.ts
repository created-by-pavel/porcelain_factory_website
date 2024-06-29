import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MailerModule} from "./mailer/mailer.module";
import {ConfigModule} from "@nestjs/config";
import {ProductModule} from "./product/product.module";

// import { PrismaModule } from "./prisma/prisma.module";

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
    }),
        MailerModule,
        ProductModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
