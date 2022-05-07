import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

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
