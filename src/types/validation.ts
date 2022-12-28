import { IsString } from "class-validator";

/**
 * LoginDto validator
 */
export class LoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

/**
 * RefreshToken validator
 */
export class RefreshTokenDto {
  @IsString()
  refreshToken: string;
}
