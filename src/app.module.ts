import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './apis/auth/auth.module';
import { UsersModule } from './apis/user/user.module';
import { appSettings } from './configs/app-settings';
<<<<<<< HEAD
import { ProfileModule } from './apis/profile/profile.module';
import { AccountModule } from './apis/account/account.module';
=======
>>>>>>> b0aaa98696d35ce6a80ebb23c0c4806a1c24af82

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
<<<<<<< HEAD
    ProfileModule,
    AccountModule,
=======
>>>>>>> b0aaa98696d35ce6a80ebb23c0c4806a1c24af82
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
