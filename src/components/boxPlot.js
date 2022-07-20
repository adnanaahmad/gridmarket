import React, { useState, useEffect } from 'react';
import { Box as Boxplot } from '@ant-design/plots';
import data from '../visx/data/boxplot.json';
import { Stack, Box } from '@mui/material';

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
    tooltip: {
      customContent: (title, items) => {
        const data = items[0]?.data || {};
        const color = items[0]?.color || '#174c83';
        //let val = data.solar_gen ?  data.solar_gen.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : data.solar_gen
        console.log(data, items);
        return (
          <Box sx={{paddingX: 1, paddingY: 1.5}}>
            <Stack spacing={2}>
              <div>{data.x}</div>
              {
                ['low', 'q1', 'median', 'q3', 'high'].map(node => (
                  <Stack direction={'row'} spacing={1} alignItems='center'>
                    <div style={{background: color, height: 10, width: 10, borderRadius: 10}}></div>
                    <div>{node}: </div>
                    <div>{data[node] ? (data[node].toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : data[node]}</div>
                  </Stack>
                ))
              }
            </Stack>
          </Box>
          )
      }
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
      <Boxplot {...config1} />
      <Boxplot {...config2} />
      <Boxplot {...config3} />
      <Boxplot {...config4} />
    </Stack>
  )
};
