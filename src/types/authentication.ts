export interface TokenData {
  sessionId: string;
  username: string;
}

export interface JwtPayload extends TokenData {
  tokenType: string;
}

export interface LoginResponseDto {
  message: string;
  accessToken: string;
  refreshToken: string;
}
