import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ReportType } from './data';

@Controller('/report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  getAllReports(@Param('type') type: string) {
    const reportType =
      type === 'expense' ? ReportType.EXPENSE : ReportType.INCOME;
    return this.appService.getAllReports(reportType);
  }

  @Get('/:id')
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    const reportType =
      type === 'expense' ? ReportType.EXPENSE : ReportType.INCOME;
    return this.appService.getReportById(reportType, id);
  }

  @Post('')
  createReport(
    @Param('type') type: string,
    @Body() { source, amount }: { source: string; amount: number },
  ) {
    const reportType =
      type === 'expense' ? ReportType.EXPENSE : ReportType.INCOME;
    return this.appService.createReport(reportType, { amount, source });
  }

  @Put(':id')
  updateReport(
    @Param('id') id: string,
    @Param('type') type: string,
    @Body() body: { source: string; amount: number },
  ) {
    const reportType =
      type === 'expense' ? ReportType.EXPENSE : ReportType.INCOME;
    return this.appService.updateReport(reportType, id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteReport(@Param('id') id: string) {
    return this.appService.deleteReport(id);
  }
}
