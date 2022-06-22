import React, { useState, useEffect } from 'react';
import { Heatmap } from '@ant-design/plots';
import { data as realData } from '../data/testData';
import hdata from '../visx/data/individual.json';

export default function HeatmapExample() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // let heatmapData = realData['Analyses'].map((node) => {
    //     return {
    //         Longitude: Number(node.Longitude), 
    //         Country: node.Country,
    //         'Capex: Payback Period': Number(node['Capex: Payback Period'])
    //     }
    // });
    let heatmapData = hdata.map((node) => {
      return {
          'hour': node.hour, 
          'day': node.day,
          'original_load': Number(node['original_load'])
      }
    });
    setData(heatmapData);

    // setTimeout(()=> {
    //   setData(heatmapData.slice(0,100));
    // }, 5000);

  }, []);

  const config = {
    width: 650,
    height: 500,
    autoFit: true,
    data,
    xField: 'day',
    yField: 'hour',
    colorField: 'original_load',
    color: ['#174c83', '#7eb6d4', '#efefeb', '#efa759', '#9b4d16'],
    meta: {
      'day': {
        type: 'cat',
      },
      'hour': {
        type: 'cat',
      },
    },
  };

  return <Heatmap {...config} />;
};
