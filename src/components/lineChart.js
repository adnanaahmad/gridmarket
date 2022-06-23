import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';
import lineData from '../visx/data/individual.json';

function getData() {
  let data = [];
  let set = {};
  lineData.forEach(x => {
      if(!set[x.hour]) {
          set[x.hour] = 1;
          data.push({
              x: x.hour,
              y: Number(x.solar_gen)
          });
      }

  });
  data = data.sort((a, b) => (a.x > b.x ? 1 : -1));
  return data;
}

export default function LineChartExample() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let chartData = getData();

    setData(chartData.slice(1,(chartData.length/2)-1));

    console.log(data);

    setTimeout(()=> {
      let cdata = getData();
      setData(cdata);
    }, 5000);
    
  }, []);

  const config = {
    data,
    padding: 'auto',
    xField: 'x',
    yField: 'y',
  };

  return <Line {...config} />;
};