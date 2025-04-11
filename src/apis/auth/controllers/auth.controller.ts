import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from '../auth.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CheckPasswordDto } from '../dto/check-password.dto';
import { UserLoginDto } from '../dto/user-login.dto';
import { UserPayload } from 'src/base/models/user-payload.model';
import { UserRegisterDto } from '../dto/user-register.dto';
import { Me } from 'src/decorators/me.decorator';
import { OTPService } from '../twilio.service';
import { PhoneLoginDto } from '../dto/phone-login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private otpService: OTPService,
  ) {}

  @Post('signin')
  login(@Body() userLogin: UserLoginDto) {
    return this.authService.login(userLogin);
  }

  @Post('signup')
  register(@Body() userRegister: UserRegisterDto) {
    return this.authService.register(userRegister);
  }

  @Post('send-otp')
  async sendOtp(@Body() body: PhoneLoginDto) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await this.otpService.sendOTP(body.phone, otp);
    return { message: 'OTP sent successfully' };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('check-password')
  checkPassword(
    @Me() userPayload: UserPayload,
    @Body() checkDto: CheckPasswordDto,
  ) {
    return this.authService.checkPassword(userPayload, checkDto);
  }
}
