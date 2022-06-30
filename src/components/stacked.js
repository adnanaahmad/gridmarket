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
    // const an = [];
    // each(groupBy(bdata, 'Type'), (values, k) => {
    //   const value = values.reduce((a, b) => a + b.Spending, 0);
    //   an.push({
    //     type: 'text',
    //     position: [k, value],
    //     content: `${value}`,
    //     style: { textAlign: 'center', fontSize: 14, fill: 'rgba(0,0,0,0.85)' },
    //     offsetY: -10,
    //   });
    // });
    // setAnnotations(an);
    // let b = [...bdata];
    // setData(b.slice(1, bdata.length/2));

    // setTimeout(()=> {
    //   setData(bdata);
    // }, 5000);

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
    annotations
  };

  return <Column {...config} />;
};