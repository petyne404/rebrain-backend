import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { IUser } from "../models/user.model";

interface JwtPayload {
  id: string;
  username: string;
}

const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { name, username, password } = req.body;

    if (!username || !password || !name) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username,
      password: hashedPassword,
    });

    return res.status(201).json({ username: user.username });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const accessToken = generateAccessToken(user);

    return res.status(200).json({
      message: "Login successful",
      accessToken,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const generateAccessToken = (user: IUser): string => {
  const payload: JwtPayload = {
    id: user._id.toString(),
    username: user.username,
  };

  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) throw new Error("ACCESS_TOKEN_SECRET not defined");

  const accessToken = jwt.sign(payload, secret, {
    expiresIn: "10m",
  });

  return accessToken;
};

export { createUser, login };
