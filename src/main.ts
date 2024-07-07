import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'hbs';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as swaggerUi from 'swagger-ui-express';
import * as express from 'express';
import * as path from 'path';
import { PrismaService } from './prisma/prisma.service';
import supertokens from 'supertokens-node';
import {SupertokensExceptionFilter} from "./auth/auth.filter";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: ['http://localhost:81'],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });
  app.useGlobalFilters(new SupertokensExceptionFilter());
  const prismaService = app.get(PrismaService);
  app.enableShutdownHooks();

  const config = new DocumentBuilder()
      .setTitle('Porcelian factory website API')
      .setDescription('This is API for Porcelian factory website backend')
      .setVersion('1.0')
      .build();

  const apiJsonPath = '/api-json';
  app.use(apiJsonPath, express.static(path.join(__dirname, 'swagger-json')));

  const document = SwaggerModule.createDocument(app, config);
  const apiDocsPath = '/api-docs';
  app.use(apiDocsPath, swaggerUi.serve, swaggerUi.setup(document));
  SwaggerModule.setup('api', app, document);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', '/views/partials'));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();