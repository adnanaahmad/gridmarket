import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';
import lineData from '../visx/data/individual.json';
import Box from '@mui/material/Box';
import { Button, Stack } from '@mui/material';

import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 25,
    label: '.5',
  },
  {
    value: 50,
    label: '.75',
  },
  {
    value: 75,
    label: '1',
  },
  {
    value: 100,
    label: '1.25',
  },
];

function valuetext(value) {
  return `${value}`;
}

function valueLabelFormat(value) {
  return marks.findIndex((mark) => mark.value === value) + 1;
}

export default function LineChartExample() {
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [to, setTo] = useState([]);
  const [zoom, setZoom] = React.useState(1);
  const zoomMap= {
    25: .5,
    50: .75,
    75: 1,
    100: 1.25
  }

  const handleChange = (event, value) => {
    if (typeof value === 'number') {
      setZoom(zoomMap[value])
    }
  };

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
    to.forEach(el => {
      window.clearTimeout(el);
    });
    if (hours === 8760) {
      setData(originalData);
    } else {
      let cdata = originalData.filter(element => element.x <= hours);
      setData(cdata);
    }
  }

  function liveData() {
    var i = 1;
    let next = 24;
    let prev = 0; 
    function myLoop() {
     setTo([...to, 
      setTimeout(function() {
        console.log('hello', i);
        i++;
        if (i < 50) {
          let cdata = originalData.filter(element => element.x <= next && element.x >= prev);;
          prev++;
          next++;
          setData(cdata);
          myLoop();
        }
      }, 1000)])
    }
    myLoop();
  }

  const config = {
    data,
    padding: 'auto',
    xField: 'x',
    yField: 'y',
    seriesField: 'category',
    zoom: {
      position: 'topright',
    },
  };

  return (
    <div style={{direction: 'row', display: 'flex', width: '100%', marginBottom: '100px'}}>
      <div style={{width: '100%'}}>
        <Stack direction={'row'} spacing={3} sx={{mb:10}}>
          <Button onClick={() => liveData()} variant="outlined">Live</Button>
          <Button onClick={() => setChart(1*24)} variant="outlined">1D</Button>
          <Button onClick={() => setChart(7*24)} variant="outlined">7D</Button>
          <Button onClick={() => setChart(30*24)} variant="outlined">1M</Button>
          <Button onClick={() => setChart(180*24)} variant="outlined">6M</Button>
          <Button onClick={() => setChart(365*24)} variant="outlined">Max</Button>
        </Stack>
        <Box sx={{zoom}}>
          <Line {...config} />
        </Box>
        <div style={{marginTop: 2, margin: 'auto', textAlign: 'center'}}>Hour</div>
        <Box sx={{ width: 300 }}>
          <Slider
          aria-label="Restricted values"
          defaultValue={75}
          valueLabelFormat={valueLabelFormat}
          getAriaValueText={valuetext}
          step={null}
          valueLabelDisplay="auto"
          marks={marks}
          onChange={handleChange}
          />
        </Box>
      </div>
    </div>
  )
};