import React, { useState, useEffect } from 'react';
import { Box } from '@ant-design/plots';
import data from '../visx/data/boxplot.json';

export default function BoxplotExample() {

  const config = {
    width: 400,
    //height: 500,
    data: data,
    xField: 'x',
    yField: ['low', 'q1', 'median', 'q3', 'high'],
    yAxis: {
      //minLimit: 0,
      min: -2000000
    },
    boxStyle: {
      stroke: '#545454',
      fill: '#1890FF',
      fillOpacity: 0.3,
    },
    animation: false,
  };

  return (
    <div>
      <Box {...config} />
    </div>
  )
};
