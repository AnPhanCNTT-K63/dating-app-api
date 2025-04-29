import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './apis/auth/auth.module';
import { UsersModule } from './apis/user/user.module';
import { appSettings } from './configs/app-settings';
import { ProfileModule } from './apis/profile/profile.module';
import { AccountModule } from './apis/account/account.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
