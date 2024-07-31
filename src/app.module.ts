import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MailerModule} from "./mailer/mailer.module";
import {ConfigModule} from "@nestjs/config";
import {ProductModule} from "./product/product.module";
import {AuthModule} from './auth/auth.module';
import {PrismaModule} from "./prisma/prisma.module";
import * as SuperTokensConfig from './config';
import {UserModule} from "./user/user.module";
import {OrderModule} from "./order/order.module";

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
    }),
        AuthModule.forRoot({
            connectionURI: SuperTokensConfig.connectionUri,
            apiKey: SuperTokensConfig.apiKey,
            appInfo: SuperTokensConfig.appInfo,
        }),
        PrismaModule,
        MailerModule,
        ProductModule,
        UserModule,
        OrderModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}