import { Router } from "express";

/**
 * Controller interface for API
 */
export interface Controller {
  path: string;
  router: Router;
}
