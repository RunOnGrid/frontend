import React from 'react';
import BarChart from './BarChart';
import { useState } from 'react';
import { UserData } from '../../Data';
import { UserData2 } from '../../Data2';
import { UserData3 } from '../../Data3';

const Charts = () => {
  const [selected, setSelected] = useState(0);
  const toggle = (i) => {
    return setSelected(i);
  };

  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: 'COST/YEAR',
        data: UserData.map((data) => data.btcGain),
        backgroundColor: [
          'rgba(0, 0, 0, 0.7)',
          'rgba(0, 0, 0, 0.7)',
          'rgba(0, 0, 0, 0.7)',
          'rgba(0, 0, 0, 0.7)',
        ],
        borderColor: 'white',
        barThickness: 50,
        borderWidth: 0.5,
        borderRadius: 5,
      },
    ],
  });

  const handleData1 = () => {
    setUserData({
      labels: UserData.map((data) => data.year),
      datasets: [
        {
          label: 'COST/YEAR',
          data: UserData.map((data) => data.btcGain),
          backgroundColor: [
            'rgba(0, 0, 0, 0.7)',
            'rgba(0, 0, 0, 0.7)',
            'rgba(0, 0, 0, 0.7)',
            'rgba(0, 0, 0, 0.7)',
          ],
          borderColor: 'white',
          borderWidth: 0.5,
          borderRadius: 5,
        },
      ],
    });
    toggle(1);
  };

  const handleData2 = () => {
    setUserData({
      labels: UserData2.map((data) => data.year),
      datasets: [
        {
          label: 'COST/YEAR',
          data: UserData2.map((data) => data.btcGain),
          backgroundColor: [
            'rgba(0, 0, 0, 0.7)',
            'rgba(0, 0, 0, 0.7)',
            'rgba(0, 0, 0, 0.7)',
            'rgba(0, 0, 0, 0.7)',
          ],
          borderColor: 'white',
          borderWidth: 0.5,
          borderRadius: 5,
        },
      ],
    });
    toggle(2);
  };

  const handleData3 = () => {
    setUserData({
      labels: UserData3.map((data) => data.year),
      datasets: [
        {
          label: 'COST/YEAR',
          data: UserData3.map((data) => data.btcGain),
          backgroundColor: [
            'rgba(0, 0, 0, 0.7)',
            'rgba(0, 0, 0, 0.7)',
            'rgba(0, 0, 0, 0.7)',
            'rgba(0, 0, 0, 0.7)',
          ],
          borderColor: 'white',
          borderWidth: 0.5,
          borderRadius: 5,
        },
      ],
    });
    toggle(3);
  };
  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: 'white', // Color de la leyenda
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
          font: {
            size: 12,
          },
        },
      },
      y: {
        ticks: {
          color: 'white',
          font: {
            size: 16,
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.8)',
        },
      },
    },
  };

  return (
    <>
      <div className="solution-texts2">
        <div className="titulo-asic3">
          {' '}
          A fraction of the cost for real privacy
        </div>
        <div className="subtituloBanner4">
          Experience the Future of PaaS: 16x Cheaper, 100% Reliable, and data
          ownership
        </div>
      </div>
      <div className="botones-charts">
        <button
          className={`${selected === 1 ? 'selectedButton' : ''}`}
          onClick={handleData1}>
          2 vCPU
        </button>
        <button
          className={`${selected === 2 ? 'selectedButton' : ''}`}
          onClick={handleData2}>
          4 vCPU
        </button>
        <button
          className={`${selected === 3 ? 'selectedButton' : ''}`}
          onClick={handleData3}>
          8 vCPU
        </button>
      </div>

      <div>
        <div className="chart-asic-hosting">
          <BarChart options={options} chartData={userData} />
        </div>
      </div>
    </>
  );
};

export default Charts;
