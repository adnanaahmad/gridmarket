import React, { useState, useEffect } from 'react';
import { Scatter } from '@ant-design/plots';
import sdata from '../visx/data/portfolio.json';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ScatterPlot() {
  const [data, setData] = useState([]);
  const [size, setSize] = React.useState(2);

  const handleChangeSize = (event) => {
    setSize(event.target.value);
  };

  useEffect(() => {
    let scatterplotData = [];
    sdata.forEach(x => {
      if (!isNaN(x.IRR) && !isNaN(x.Capex_Payback)){
        scatterplotData.push({
            x: Number(x.IRR),
            y: Number(x.Capex_Payback)
          });
      }
    });
    setData(scatterplotData);
    // let spdata = [...scatterplotData];
    // setData(spdata.slice(1, spdata.length/2));
    
    // setTimeout(()=> {
    //   setData(scatterplotData);
    // }, 5000);
  }, []);

  const config = {
    appendPadding: 10,
    data,
    xField: 'x',
    yField: 'y',
    shape: 'circle',
    size,
    yAxis: {
      nice: true,
      line: {
        style: {
          stroke: '#aaa',
        },
      },
    },
    xAxis: {
      //min: -200,
      grid: {
        line: {
          style: {
            stroke: '#eee',
          },
        },
      },
      line: {
        style: {
          stroke: '#aaa',
        },
      },
    },
  };

  return (
  <Box>
    <Box sx={{ maxWidth: 400 }}>
      <FormControl variant="standard" fullWidth>
        <InputLabel id="label-size">Life time capital expenditure size</InputLabel>
        <Select
          labelId="label-size"
          id="select-size"
          value={size}
          onChange={handleChangeSize}
        >
          <MenuItem value={2}>1</MenuItem>
          <MenuItem value={4}>2</MenuItem>
          <MenuItem value={8}>3</MenuItem>
          <MenuItem value={12}>4</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <Scatter {...config} />
  </Box>
  );
};
