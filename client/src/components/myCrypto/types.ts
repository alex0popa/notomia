export type AddFormValues = {
  alias: string,
  cryptoId: string,
  tags: string,
  targetPrice: number,
};

export type Chart = Pick<AddFormValues, 'alias' | 'cryptoId' | 'targetPrice'> & {
  id: string,
  name: string,
  last24H: number[][],
  last7days: number[][],
  lastMonth: number[][],
  tags: string[]
};


export type Coin = { id: string, symbol: string, name: string };

export type SelectedCoin = Pick<Coin, 'id' | 'name'>;

export type TMouseEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;