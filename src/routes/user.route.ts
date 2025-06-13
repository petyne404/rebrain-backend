import express, { Router, Request, Response, NextFunction } from 'express';
import { createUser, login } from '../controllers/user.controller';

const router: Router = express.Router();

router.post('/register', (req: Request, res: Response, next: NextFunction) => {
    createUser(req, res, next);
});

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    login(req, res, next);
});

export default router;
