import { IsString } from 'class-validator';
export class CreateUserDto {
  @IsString()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public name: string;
}
