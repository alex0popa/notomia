import { Request, Response } from 'express';

import { CryptoModel as Crypto } from './../../db/models/Crypto';

export const remove = (req: Request, res: Response) => {
  const { id: _id } = req.body;
  
  Crypto.deleteOne({ _id }).then(() => res.status(200).send())
};
