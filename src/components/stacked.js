import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/plots';
import barchartData from '../visx/data/stacked_chart.json';
import { each, groupBy } from '@antv/util';

export default function StackedBar () {
  const [data, setData] = useState([]);
  const [annotations, setAnnotations] = useState([]); 

  useEffect(() => {
    let bdata =[];
    let units = {
      'CapEx': '($)',
      'Savings': '($)',
      'Generation': '(kW)',
      'Demand Reduction': '(kW-month)',
      'CO2': '(kg)'
    }

    barchartData.forEach(x => {

      bdata.push({
        'Type': x.Type+units[x.Type],
        'pct': Number(x.pct),
        'Group': x.Group,
        'Spending': x.Spending,
      })
    });
    setData(bdata);

  }, []);

  const config = {
    data,
    isStack: true,
    isPercent: true,
    xField: 'Type',
    yField: 'pct',
    seriesField: 'Group',
    label: {
      position: 'middle',
      content: (item) => {
        return item.Spending;
      },
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
    annotations,

  };

  return <Column {...config} />;
};