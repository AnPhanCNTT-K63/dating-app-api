import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from '../auth.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CheckPasswordDto } from '../dto/check-password.dto';
import { UserLoginDto } from '../dto/user-login.dto';
import { UserPayload } from 'src/base/models/user-payload.model';
import { UserRegisterDto } from '../dto/user-register.dto';
import { Me } from 'src/decorators/me.decorator';
import { GoogleLogin } from '../dto/google-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  login(@Body() userLogin: UserLoginDto) {
    return this.authService.login(userLogin);
  }

  @Post('signup')
  register(@Body() userRegister: UserRegisterDto) {
    return this.authService.register(userRegister);
  }

  @Post('google-login')
  async googleLogin(@Body() body: GoogleLogin) {
    return this.authService.handleGoogleLogin(body.token);
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
