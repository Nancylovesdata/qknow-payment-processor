import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Param,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentDto } from './dtos/payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private service: PaymentsService) {}

  // POST endpoint to initiate a payment
  @Post()
  initiatePayment(@Body() body: PaymentDto) {
    return this.service.createPayment(body);
  }

  // GET endpoint to retrieve a payment by ID using query parameter
  @Get('details')
  getPayment(@Query('id') id: string) {
    return this.service.getPayment(id);
  }

  // PATCH endpoint to update the status of a payment
  @Patch(':id/status')
  async updatePaymentStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.service.updatePaymentStatus(id, status);
  }
}
