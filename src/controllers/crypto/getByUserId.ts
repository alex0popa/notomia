import axios from 'axios';
import { Request, Response } from 'express';

import { CryptoModel } from './../../db/models/Crypto';
import { Crypto } from '../../db/models/types'

const norm = ([data, price]: number[]) => [data, +price.toFixed(4)]

export const getByUserId = async (req: Request, res: Response) => {
  const { userId } = req.query;
  const BASE_URL = 'https://api.coingecko.com/api/v3/coins';

  const getCoin = ({ cryptoId }: Crypto) => (
    axios.get(`${BASE_URL}/${cryptoId}/market_chart?vs_currency=eur&days=30`)
  );

  CryptoModel
    .find({ userId: `${userId}` })
    .then(coins => {
      Promise
        .all(coins.map(getCoin))
        .then((response: any[]) => {
          const plots = coins.map((coin, i) => {
            const { name, _id: id, tags, targetPrice, alias, cryptoId } = coin;
            const last24H = response[i].data.prices.slice(-24).map(norm);
            const last7days = response[i].data.prices
              .slice(-24 * 7)
              .filter((_: number[], i: number) => i % 6 === 0 )
              .map(norm);
            const lastMonth = response[i].data.prices
              .filter((_: number[], i: number) => i % 24 === 0 )
              .map(norm);

            return ({
              name,
              id,
              tags,
              targetPrice,
              alias,
              cryptoId,
              last24H,
              last7days,
              lastMonth
            });
          })

          res.json(plots);
        })
        .catch(console.error)
    });
};
