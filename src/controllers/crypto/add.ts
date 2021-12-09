import { Request, Response } from 'express';

import { CryptoModel as Crypto } from './../../db/models/Crypto';

type Body = {
  alias: string,
  cryptoId: string,
  tags: string,
  targetPrice: number,
  userId: string
};

export const add = (req: Request, res: Response) => {
  const { alias, cryptoId, tags, targetPrice, userId } = req.body as Body;
  const newCrypto = {
    alias,
    cryptoId,
    name: cryptoId,
    tags: tags.split(' '),
    targetPrice: +targetPrice,
    userId
  };

  Crypto
    .create(newCrypto)
    .then(crypto => res.json(crypto))
    .catch(e => console.log(e.message))
}
