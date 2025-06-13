import { NextFunction, Request, response, Response } from "express";
import TimeCounter from "../models/timeCounter.model";
import { dateFormat } from "../utils/dateFormatted";

const createTimeCounter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { name, userId, partnerName, emojis, targetDate } = req.body;

    if (!name || !userId || !targetDate) {
      return res.status(400).json({ message: "Some field are missed." });
    }
    const dateFormatted = dateFormat(targetDate as string);
    const timeCounter = await TimeCounter.create({
      name,
      userId,
      partnerName,
      emojis,
      targetDate: dateFormatted,
    });

    return res.status(201).json({
      message: "Created time counter successfully",
      data: timeCounter,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const findTimeCounterById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { id } = req.params;
    const timeCounter = await TimeCounter.findById(id);

    if (!id) {
      return res.status(400).json({
        message: "Please enter ID",
      });
    }

    if (!timeCounter) {
      return res.status(404).json({
        message: "Time counter was not found.",
      });
    }

    return res.status(200).json({
      message: "Find time counter successfully",
      data: timeCounter,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const findTimeCounterByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        message: "Enter user ID",
      });
    }
    const timeCounter = await TimeCounter.find({ userId: userId });
    if (!timeCounter) {
      return res.status(404).json({
        message: "Time counter was not found.",
      });
    }

    return res.status(200).json({
      message: "Find time counter successfully.",
      data: timeCounter,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export { createTimeCounter, findTimeCounterById, findTimeCounterByUserId };
