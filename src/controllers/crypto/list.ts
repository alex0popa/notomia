import { NextFunction, Request, Response } from 'express';

import axios from 'axios';
import { Coin } from './types';

export const list = (req: Request, res: Response, next: NextFunction) => {
  const url = process.env.KRYPTO_URI as string;
  
  const sendResponse = ({ data }: { data: Coin[] }) => res.json(data);

  axios.get(`${url}/coins/list`).then(sendResponse);
};
