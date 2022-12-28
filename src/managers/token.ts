import jwt from "jsonwebtoken";
import { WrongAuthenticationTokenException } from "../exceptions/authorization.js";
import { JwtPayload, TokenData } from "../types/authentication.js";

const JWT_SECRET = "my_jwt_secret";
const JWT_ACCESS_TOKEN_DURATION = 30 * 60000;
const JWT_REFRESH_TOKEN_DURATION = 120 * 60000;

/**
 * Create JWT access token
 * @param userId
 * @returns
 */
export function createAccessToken(tokenData: TokenData) {
  const jwtPayload: JwtPayload = {
    ...tokenData,
    tokenType: "accessToken",
  };
  return signToken(jwtPayload, JWT_ACCESS_TOKEN_DURATION);
}

/**
 * Create JWT refresh token
 * @param userId
 * @returns
 */
export function createRefreshToken(tokenData: TokenData) {
  const jwtPayload: JwtPayload = {
    ...tokenData,
    tokenType: "refreshToken",
  };
  return signToken(jwtPayload, JWT_REFRESH_TOKEN_DURATION);
}

/**
 * Sign generic token
 * @param dataStoredInToken
 * @param expiresIn
 * @returns
 */
function signToken(jwtPayload: JwtPayload, expiresIn: number) {
  return jwt.sign(jwtPayload, JWT_SECRET, {
    expiresIn,
  });
}

/**
 * Verfiy access token
 * @param token
 * @returns
 */
export function verifyAccessToken(token: string): TokenData {
  return verifyToken(token, "accessToken");
}

/**
 * Verfiy refresh token
 * @param token
 * @returns
 */
export function verifyRefreshToken(token: string): TokenData {
  return verifyToken(token, "refreshToken");
}

/**
 * Verify generic token
 * @param token
 * @returns
 */
const verifyToken = (
  token: string,
  tokenType: "accessToken" | "refreshToken"
): TokenData => {
  try {
    const jwtPayload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (jwtPayload.tokenType == tokenType) {
      return {
        sessionId: jwtPayload.sessionId,
        username: jwtPayload.username,
      };
    } else {
      throw new WrongAuthenticationTokenException();
    }
  } catch (error) {
    throw new WrongAuthenticationTokenException();
  }
};
