import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ReportType } from 'src/data';

export class CreateReportDto {
  @IsPositive()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  source: string;
}

export class UpdateReportDto {
  @IsOptional()
  @IsPositive()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  source: string;
}

export class ReportResponseDto {
  id: string;
  source: string;
  amount: number;
  type: ReportType;

  constructor(partial: Partial<ReportResponseDto>) {
    Object.assign(this, partial);
  }

  @Expose({ name: 'createdAt' })
  transformCreatedAt() {
    return this.created_at;
  }

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;
}
