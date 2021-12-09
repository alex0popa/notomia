import { model, Schema } from 'mongoose';

import { Crypto } from './types';

const CryptoSchema = new Schema<Crypto>({
  alias: {
    type: String,
    required: [true, 'Please provide an alias...']
  },
  cryptoId: {
    type: String,
    required: [true, 'Please provide a crypto id...']
  },
  name: {
    type: String,
    required: [true, 'Please provide a crypto id...']
  },
  tags: {
    type: [String],
  },
  targetPrice: {
    type: Number,
    required: [true, 'Please provide an target price...']
  },
  userId: {
    type: String,
    required: [true, 'Please provide an user id...']
  }
});

export const CryptoModel = model('Crypto', CryptoSchema);