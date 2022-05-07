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
  ParseUUIDPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ReportType } from './data';
import {
  CreateReportDto,
  ReportResponseDto,
  UpdateReportDto,
} from './dtos/report.dto';

@Controller('/report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponseDto[] {
    const reportType =
      type === 'expense' ? ReportType.EXPENSE : ReportType.INCOME;
    return this.appService.getAllReports(reportType);
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDto {
    const reportType =
      type === 'expense' ? ReportType.EXPENSE : ReportType.INCOME;
    return this.appService.getReportById(reportType, id);
  }

  @Post('')
  createReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Body() { source, amount }: CreateReportDto,
  ): ReportResponseDto {
    const reportType =
      type === 'expense' ? ReportType.EXPENSE : ReportType.INCOME;
    return this.appService.createReport(reportType, { amount, source });
  }

  @Put(':id')
  updateReport(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Body() body: UpdateReportDto,
  ): ReportResponseDto {
    const reportType =
      type === 'expense' ? ReportType.EXPENSE : ReportType.INCOME;
    return this.appService.updateReport(reportType, id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.appService.deleteReport(id);
  }
}
