import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';
import lineData from '../visx/data/individual.json';
import Box from '@mui/material/Box';
import { Button, Stack } from '@mui/material';


export default function LineChartExample() {
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const type = ['battery_output', 'original_load', 'solar_gen', 'net_load'];
    let cdata = [];
    lineData.forEach((element, index) => {
        type.forEach(graph => {
          cdata.push({
            x: index,
            y: Number(element[graph]),
            category: graph
          });
        })
    });
    setOriginalData(cdata);
    setData(cdata);
  }, []);

  function setChart(hours) {
    if (hours === 8760) {
      setData(originalData);
    } else {
      let cdata = originalData.filter(element => element.x <= hours);
      setData(cdata);
    }
  }

  const config = {
    data,
    padding: 'auto',
    xField: 'x',
    yField: 'y',
    seriesField: 'category',
  };

  return (
    <div style={{direction: 'row', display: 'flex', width: '100%', marginBottom: '100px'}}>
      <div style={{width: '100%'}}>
        <Stack direction={'row'} spacing={3} sx={{mb:10}}>
          {/* <Button onClick={() => liveData()} variant="outlined">Live</Button> */}
          <Button onClick={() => setChart(1*24)} variant="outlined">1D</Button>
          <Button onClick={() => setChart(7*24)} variant="outlined">7D</Button>
          <Button onClick={() => setChart(30*24)} variant="outlined">1M</Button>
          <Button onClick={() => setChart(180*24)} variant="outlined">6M</Button>
          <Button onClick={() => setChart(365*24)} variant="outlined">Max</Button>
        </Stack>
        <Box>
          <Line {...config} />
        </Box>
        <div style={{marginTop: 2, margin: 'auto', textAlign: 'center'}}>Hour</div>
      </div>
    </div>
  )
};