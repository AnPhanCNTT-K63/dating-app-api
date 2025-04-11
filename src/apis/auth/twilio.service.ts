// twilio.service.ts
import { Injectable } from '@nestjs/common';
import { appSettings } from 'src/configs/app-settings';
import * as Twilio from 'twilio';

@Injectable()
export class OTPService {
  private twilioClient = Twilio(
    appSettings.twilio.accountSID,
    appSettings.twilio.authToken,
  );

  async sendOTP(to: string, otp: string) {
    return this.twilioClient.messages.create({
      body: `Mã phóng bom hạt nhân của bạn là: ${otp}`,
      from: appSettings.twilio.phoneNumber,
      to: `+84${to.slice(1)}`,
    });
  }
}
