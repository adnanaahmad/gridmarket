import React, { useState, useEffect } from 'react';
import { Box } from '@ant-design/plots';
import data from '../visx/data/boxplot.json';
import { Stack } from '@mui/material';

export default function BoxplotExample() {

  const config = {
    width: 400,
    //height: 500,
    //data: data,
    xField: 'x',
    yField: ['low', 'q1', 'median', 'q3', 'high'],
    boxStyle: {
      stroke: '#545454',
      fill: '#1890FF',
      fillOpacity: 0.3,
    },
    animation: false,
    yAxis: {
      label: {
        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
  };
  const config1= {
    ...config,
    data: [data[0]],
    yAxis: {
      //minLimit: 0,
      min: -.5,
      label: {
        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
  }
  const config2= {
    ...config,
    data: [data[1]],
    yAxis: {
      min: -2000000,
      label: {
        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
  }
  const config3= {
    ...config,
    data: [data[2]]
  }
  const config4= {
    ...config,
    data: [data[3]]
  }

  return (
    <Stack direction={'row'} spacing={1}>
      <Box {...config1} />
      <Box {...config2} />
      <Box {...config3} />
      <Box {...config4} />
    </Stack>
  )
};
