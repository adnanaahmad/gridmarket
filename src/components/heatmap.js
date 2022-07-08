import React, { useState, useEffect } from 'react';
import { Heatmap } from '@ant-design/plots';
import hdata from '../visx/data/individual.json';

export default function HeatmapExample() {
  const [data, setData] = useState([]);

  useEffect(() => {

    let heatmapData = hdata.map((node) => {
      return {
          'hour': node.hour, 
          'day': node.day,
          'solar_gen': Number(node['solar_gen'])
      }
    });
    // let h = [...heatmapData];
    // setData(h.slice(1,274));

    // setTimeout(()=> {
    //   setData(heatmapData);
    // }, 5000);
    setData(heatmapData);

  }, []);

  const config = {
    width: 650,
    height: 500,
    autoFit: true,
    data,
    xField: 'day',
    yField: 'hour',
    colorField: 'solar_gen',
    color: ['#174c83', '#7eb6d4', '#efefeb', '#efa759', '#9b4d16'],
    legend: {
      layout: 'vertical',
      position: 'right',
      title: {
        text: 'solar_gen'
      }
    },
    meta: {
      'day': {
        type: 'cat',
      },
      'hour': {
        type: 'cat',
      },
    },
  };

  return (
    <div>
      <div style={{ fontWeight: 500, fontSize: 'large', textAlign: 'center', marginBottom: 10}}>Solar Generation(kWh)</div>
      <Heatmap {...config} />
    </div>
  );
};
