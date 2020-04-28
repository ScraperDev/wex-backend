import { IsString, IsBoolean, IsDate, IsNumber } from 'class-validator';

export class CreateListingDto {
  @IsString()
  public waterType: string;

  @IsDate()
  public waterAvailable: Date;

  @IsNumber()
  public price: number;

  @IsNumber()
  public volume: number;

  @IsBoolean()
  public partialOk: boolean;

  @IsNumber()
  public minVolume: number;
}
