import { Request, Response, NextFunction, Router } from "express";
import { Controller } from "../types/general.js";

export class MonitoringController implements Controller {
  public path = "/";
  public router = Router();

  constructor() {
    this.router.get(`${this.path}livez`, this.status);
    this.router.get(`${this.path}readyz`, this.status);
  }

  private status = async (_request: Request, response: Response) => {
    response.statusCode = 200;
    response.send({
      status: "ok",
    });
  };
}
