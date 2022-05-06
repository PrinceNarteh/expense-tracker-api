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
import { v4 as uuid } from 'uuid';
import { data, ReportType } from './data';

@Controller('/report/:type')
export class AppController {
  @Get('')
  getAllReports(@Param('type') type: string) {
    const reportType =
      type === 'expense' ? ReportType.EXPENSE : ReportType.INCOME;
    return data.report.filter((report) => report.type === reportType);
  }

  @Get('/:id')
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    const reportType =
      type === 'expense' ? ReportType.EXPENSE : ReportType.INCOME;
    return data.report
      .filter((report) => report.type === reportType)
      .find((report) => report.id === id);
  }

  @Post('')
  createReport(
    @Param('type') type: string,
    @Body() { source, amount }: { source: string; amount: number },
  ) {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === 'expense' ? ReportType.EXPENSE : ReportType.INCOME,
    };
    data.report.push(newReport);
    return newReport;
  }

  @Put(':id')
  updateReport(
    @Param('id') id: string,
    @Param('type') type: string,
    @Body() body: { source?: string; amount?: number },
  ) {
    const reportType =
      type === 'expense' ? ReportType.EXPENSE : ReportType.INCOME;
    const reportToUpdate = data.report
      .filter((report) => report.type === reportType)
      .find((report) => report.id === id);

    if (!reportToUpdate) return 'Report Not Found';
    const reportIndex = data.report.findIndex(
      (report) => report.id === reportToUpdate.id,
    );

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
    };

    return data.report[reportIndex];
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteReport(@Param('id') id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);
    if (reportIndex === -1) return;
    data.report.splice(reportIndex, 1);
    return;
  }
}
