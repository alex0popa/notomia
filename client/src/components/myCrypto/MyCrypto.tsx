import { useEffect, useState } from 'react';
import { Logout } from '../auth/Logout';
import { Container } from '../customElements';
import { Add } from './Add';
import { Chart } from './Chart';

import { Coin, SelectedCoin } from './types';

const getList = () => fetch('/api/crypto/list').then(r => r.json());

export const MyCrypto = () => {
  const [showList, setShowList] = useState(false);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [coin, setCoin] = useState<SelectedCoin | undefined>();

  useEffect(() => {
    getList().then(setCoins).catch(console.error);
  }, []);

  const list = coins.map(({ id, name }) => (
    <h4
      key={id}
      onClick={() => setCoin({ id, name })}
      style={{ cursor: 'pointer' }}
    >
      {name}
    </h4>
  ));

  return(
    <Container>
      {!coin ? (
        <div>
          <button
            onClick={() => setShowList(!showList)}
            style={{ height: '20px', width: '100px' }}
          >
            {`${!showList ? 'Show' : 'Hide'} coins`}
          </button>
          <Logout />
          {showList ? list : <Chart />}
        </div>
      ) : (
        <Add coin={coin} setCoin={setCoin}/>
      )}
    </Container>
  );
};