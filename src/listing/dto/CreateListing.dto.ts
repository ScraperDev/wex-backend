import { IsString, IsBoolean, IsDateString, IsPositive, IsInt } from 'class-validator';

export class CreateListingDto {
  @IsString()
  public waterType: string;

  @IsDateString()
  public waterAvailable: Date;

  @IsInt()
  @IsPositive()
  public price: number;

  @IsInt()
  @IsPositive()
  public volume: number;

  @IsBoolean()
  public partialOk: boolean;

  @IsInt()
  @IsPositive()
  public minVolume: number;
}
