import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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
  getReportById(@Param('id') id: string) {
    return {};
  }

  @Post('')
  createReport() {
    return 'Report Created';
  }

  @Put(':id')
  updateReport(@Param('id') id: string) {
    return 'Report Updated';
  }

  @Delete(':id')
  deleteReport(@Param('id') id: string) {
    return 'Report Deleted';
  }
}
