import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { VnpayService } from '../vnpay.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Me } from 'src/decorators/me.decorator';
import { UserPayload } from 'src/base/models/user-payload.model';
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('payment')
export class PaymentController {
  constructor(private readonly vnpayService: VnpayService) {}

  @Get('create-vnpay-url') createVnpayUrl(
    @Query('amount') amount: number,
    @Req() req: Request,
    @Me() user: UserPayload,
  ) {
    const ipAddr =
      (Array.isArray(req.headers['x-forwarded-for'])
        ? req.headers['x-forwarded-for'][0]
        : req.headers['x-forwarded-for']) ||
      req.socket?.remoteAddress ||
      req.connection?.remoteAddress ||
      '127.0.0.1';
    const url = this.vnpayService.createPaymentUrl(amount, ipAddr, user);
    return { url };
  }

  @Get('vnpay-return')
  async getPayment(@Query() query: Record<string, any>, @Res() res: Response) {
    const orderInfo = decodeURIComponent(query.vnp_OrderInfo);
    const userIdMatch = orderInfo.match(/cho user:\s*([a-f0-9]{24})/i);
    const createdBy = userIdMatch ? userIdMatch[1] : null;

    const transaction = {
      txnRef: query.vnp_TxnRef,
      amount: parseInt(query.vnp_Amount),
      bankCode: query.vnp_BankCode,
      bankTranNo: query.vnp_BankTranNo,
      cardType: query.vnp_CardType,
      orderInfo: decodeURIComponent(query.vnp_OrderInfo),
      payDate: query.vnp_PayDate,
      responseCode: query.vnp_ResponseCode,
      transactionNo: query.vnp_TransactionNo,
      transactionStatus: query.vnp_TransactionStatus,
      secureHash: query.vnp_SecureHash,
      status:
        query.vnp_ResponseCode === '00' && query.vnp_TransactionStatus === '00'
          ? 'success'
          : 'failed',
      createdBy: createdBy ? new Types.ObjectId(createdBy) : undefined,
    };

    // await this.transactionService.model.create(transaction);

    return res.redirect(`http://localhost:5173/payment-success`);
  }
}
