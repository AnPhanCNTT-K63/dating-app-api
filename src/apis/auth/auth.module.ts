import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { appSettings } from 'src/configs/app-settings';
import { UsersModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from 'src/strategies/jwt-strategy';
import { OTPService } from './twilio.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: appSettings.jwt.secret,
      signOptions: {
        expiresIn: appSettings.jwt.expireIn,
        issuer: appSettings.jwt.issuer,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, OTPService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
