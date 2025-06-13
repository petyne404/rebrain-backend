import express, { Router, Request, Response, NextFunction } from "express";
import {
  createTimeCounter,
  findTimeCounterById,
  findTimeCounterByUserId,
} from "../controllers/timeCounter.controller";

const router: Router = express.Router();

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  createTimeCounter(req, res, next);
});

router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  findTimeCounterById(req, res, next);
});

router.get(
  "/timecounters/:userId",
  (req: Request, res: Response, next: NextFunction) => {
    findTimeCounterByUserId(req, res, next);
  }
);

export default router;
