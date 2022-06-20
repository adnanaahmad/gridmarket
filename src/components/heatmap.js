import React, { useState, useEffect } from 'react';
import { Heatmap } from '@ant-design/plots';
import { data as realData } from '../data/testData';

export default function HeatmapExample() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let heatmapData = realData['Analyses'].map((node) => {
        return {
            Longitude: Number(node.Longitude), 
            Country: node.Country,
            'Capex: Payback Period': Number(node['Capex: Payback Period'])
        }
    });

    setData(heatmapData);

    setTimeout(()=> {
      setData(heatmapData.slice(0,100));
    }, 5000);

  }, []);

  const config = {
    width: 650,
    height: 500,
    autoFit: false,
    data,
    xField: 'Longitude',
    yField: 'Country',
    colorField: 'Capex: Payback Period',
    color: ['#174c83', '#7eb6d4', '#efefeb', '#efa759', '#9b4d16'],
    meta: {
      'Longitude': {
        type: 'cat',
      },
    },
  };

  return <Heatmap {...config} />;
};
