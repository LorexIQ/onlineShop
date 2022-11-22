import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongodbModule } from './mongodb/mongodb.module';
import { MailerModule } from './mailer/mailer.module';
import {SellerModule} from "./seller/seller.module";
import {TestModule} from "./test/test.module";
import {PaginationModule} from "./pagination/pagination.module";

@Module({
  imports: [
    AuthModule,
    UserModule,
    SellerModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MailerModule,
    MongooseModule.forRoot('mongodb://localhost/db-study'),
    MongodbModule,
    MailerModule,
    PaginationModule,
    TestModule
  ],
})
export class AppModule {}
