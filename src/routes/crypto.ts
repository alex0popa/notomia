import { Router } from 'express';

import { add } from '../controllers/crypto/add';
import { getByUserId } from '../controllers/crypto/getByUserId';
import { list } from '../controllers/crypto/list';
import { remove } from '../controllers/crypto/remove';

export const cryptoRouter = Router();

cryptoRouter.route('/add').post(add);

cryptoRouter.route('/list').get(list);

cryptoRouter.route('/remove').post(remove);

cryptoRouter.route('/user-list').get(getByUserId);
