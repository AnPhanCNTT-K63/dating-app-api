import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './apis/auth/auth.module';
import { UsersModule } from './apis/user/user.module';
import { appSettings } from './configs/app-settings';
import { ProfileModule } from './apis/profile/profile.module';
import { AccountModule } from './apis/account/account.module';
import { MessageModule } from './apis/message/message.module';
import { ConversationModule } from './apis/conversation/conversation.module';
import { NotificationModule } from './apis/notification/notification.module';
import { PaymentModule } from './apis/payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: appSettings.mongoose.uri,
      }),
    }),
    AuthModule,
    UsersModule,
    ProfileModule,
    AccountModule,
    MessageModule,
    ConversationModule,
    NotificationModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
