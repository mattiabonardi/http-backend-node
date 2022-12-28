import { Request, Response, NextFunction, Router } from "express";
import { Controller } from "../types/general.js";
import { validationMiddleware } from "../middleware/validation.js";
import { LoginResponseDto, TokenData } from "../types/authentication.js";
import { LoginDto, RefreshTokenDto } from "../types/validation.js";
import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../managers/token.js";
import { v4 as uuidv4 } from "uuid";
import { authorizationMiddleware } from "../middleware/authorization.js";

class AuthenticationController implements Controller {
  public path = "/authentication";
  public router = Router();

  constructor() {
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(LoginDto),
      this.login
    );
    this.router.post(
      `${this.path}/logout`,
      authorizationMiddleware,
      this.logout
    );
    this.router.post(
      `${this.path}/refreshToken`,
      validationMiddleware(RefreshTokenDto),
      this.refreshToken
    );
  }

  private login = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const payload: LoginDto = request.body;
    const tokenData: TokenData = {
      sessionId: uuidv4(),
      username: payload.username,
    };
    try {
      const loginResponseDto: LoginResponseDto = {
        accessToken: createAccessToken(tokenData),
        refreshToken: createRefreshToken(tokenData),
        message: "Login successfully",
      };
      response.statusCode = 200;
      response.json(loginResponseDto);
    } catch (error) {
      next(error);
    }
  };

  private logout = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    response.statusCode = 200;
      response.json({
        message: "Logout successfull"
      });
  }

  private refreshToken = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const payload: RefreshTokenDto = request.body;
    try {
      const tokenData: TokenData = verifyRefreshToken(payload.refreshToken);
      const loginResponseDto: LoginResponseDto = {
        accessToken: createAccessToken(tokenData),
        refreshToken: payload.refreshToken,
        message: "Token refreshed successfully",
      };
      response.statusCode = 200;
      response.json(loginResponseDto);
    } catch (error) {
      next(error);
    }
  };
}

export default AuthenticationController;
