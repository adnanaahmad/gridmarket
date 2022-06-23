import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/plots';
import barchartData from '../visx/data/stacked_chart.json';

export default function StackedBar () {
  const [data, setData] = useState([]);

  useEffect(() => {
    let bdata =[];

    barchartData.forEach(x => {
      bdata.push({
        'Type': x.Type,
        'pct': Number(x.pct),
        'Group': x.Group
      })
    });
    let b = [...bdata];
    setData(b.slice(1, bdata.length/2));

    setTimeout(()=> {
      setData(bdata);
    }, 5000);

  }, []);

  const config = {
    data,
    isStack: true,
    xField: 'Type',
    yField: 'pct',
    seriesField: 'Group',
    label: {
      position: 'middle',
      // 'top', 'bottom', 'middle'
      layout: [
        {
          type: 'interval-adjust-position',
        },
        {
          type: 'interval-hide-overlap',
        },
        {
          type: 'adjust-color',
        },
      ],
    },
  };

  return <Column {...config} />;
};