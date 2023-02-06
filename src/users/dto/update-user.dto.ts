import { IsInt, IsNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsInt()
  readonly user_idx: number;

  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}
