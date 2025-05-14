import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccountService } from '../account.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Me } from 'src/decorators/me.decorator';
import { UserPayload } from 'src/base/models/user-payload.model';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';

@ApiTags('Account')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('me')
  getAccountInfo(@Me() userPayload: UserPayload) {
    return this.accountService.getAccountInfo(userPayload._id);
  }

  @Patch('update')
  updateAccount(
    @Me() userPayload: UserPayload,
    @Body() updateDto: UpdateAccountDto,
  ) {
    return this.accountService.updateAccount(userPayload._id, updateDto);
  }

  @Patch('change-password')
  changePassword(
    @Me() userPayload: UserPayload,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.accountService.changePassword(
      userPayload._id,
      changePasswordDto,
    );
  }
}
