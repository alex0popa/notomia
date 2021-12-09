import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useUserContext } from '../UserContext';
import { Chart as TChart, TMouseEvent } from './types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const getUserList = (userId: string) => (
  fetch(`/api/crypto/user-list?userId=${userId}`).then(r => r.json())
);

export const Chart = () => {
  const { userId } = useUserContext();
  const [data, setData] = useState<TChart[]>([]);

  const remove = (e: TMouseEvent) => {
    const { id } = e.target as HTMLButtonElement;

    fetch(`/api/crypto/remove`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id })
    })
    .then(() => getUserList(userId!).then(setData));
  }

  useEffect(() => {
    getUserList(userId || '').then(setData);
    // eslint-disable-next-line 
  }, []);

  const charts = data.map((el, i) => {
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const
        },
        title: {
          display: false,
          text: data[i].name,
        },
      }
    };

    const data24H = {
      labels: data[i]?.last24H.map(([t]) => new Date(t).getHours()),
      datasets: [
        {
          label: '24 H',
          data: data[i].last24H.map(([, price]) => price),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Target price',
          data: new Array(24).fill(+data[i].targetPrice),
          backgroundColor: 'rgba(0, 230, 64, 1)',
        }
      ]
    }

    const data7days = {
      labels: data[i].last7days.map(([t]) => new Date(t).getDate()),
      datasets: [
        {
          label: '7 days',
          data: data[i].last7days.map(([, price]) => price),
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          label: 'Target price',
          data: new Array(7 * 4).fill(+data[i].targetPrice),
          backgroundColor: 'rgba(0, 230, 64, 1)',
        }
      ]
    }

    const dataMonth  = {
      labels: data[i].lastMonth.map(([t]) => new Date(t).getDate()),
      datasets: [      
        {
          label: '30 days',
          data: data[i].lastMonth.map(([, price]) => price),
          backgroundColor: 'rgba(53, 62, 235, 0.5)',
        },
        {
          label: 'Target price',
          data: new Array(30).fill(+data[i].targetPrice),
          backgroundColor: 'rgba(0, 230, 64, 1)',
        }
      ]
    }

    return (
      <div key={data[i].id}  style={{ display: 'grid'}}>
        <h2 style={{ textAlign: 'center' }}>
          <button
            id={data[i].id}
            style={{
              float:'right',
              width: '20px',
              height:'20px',
              margin: 0,
              padding: 0,
              backgroundColor: 'orangered',
              borderRadius: '50%'
            }}
            onClick={remove}
          >
            X
          </button>
          {`${data[i].name} as: ${data[i].alias}`}
        </h2>
        <Line
          style={{ height: '200px', margin: 0, padding: 0 }}
          options={options}
          data={data24H}
        />
        <Line
          style={{ height: '200px', margin: 0, padding: 0 }}
          options={options}
          data={data7days}
        />
         <Line
          style={{ height: '200px', margin: 0, padding: 0 }}
          options={options}
          data={dataMonth}
        />
      </div>
    );
  });

  return <div>{charts}</div>

}