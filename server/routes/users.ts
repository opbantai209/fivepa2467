import { Router, Request, Response } from 'express';
import { mockUsersData, mockTransactionsData } from '../data';

const router = Router();

// GET all users
router.get('/', (req: Request, res: Response) => {
  res.json(mockUsersData);
});

// GET transactions
router.get('/transactions', (req: Request, res: Response) => {
  res.json(mockTransactionsData);
});

export const userRouter = router;
