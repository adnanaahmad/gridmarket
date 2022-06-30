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
  const [x, setX] = React.useState('IRR');
  const [y, setY] = React.useState('Capex_Payback');

  const handleChangeSize = (event) => {
    setSize(event.target.value);
  };

  const handleChangeX = (event) => {
    setX(event.target.value);
  };
  const handleChangeY = (event) => {
    setY(event.target.value);
  };

  // RR, Capex_Payback, Capex_Asset, NPV_estimated_capex, NPV_estimated_PPA, PPA



  useEffect(() => {
    let scatterplotData = [];
    sdata.forEach(el => {
      if (!isNaN(el[x]) && !isNaN(el[y])){
        scatterplotData.push({
            x: Number(el[x]),
            y: Number(el[y])
          });
      }
    });
    setData(scatterplotData);
  }, [x, y]);

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
    <div style={{direction: 'row', display: 'flex', width: '100%', marginBottom: '100px'}}>
      <div style={{margin: 'auto'}}>{y}</div>
      <div style={{width: '100%'}}>
      <Box>
        <Box sx={{ maxWidth: 400 }}>
        <FormControl variant="standard" fullWidth>
            <InputLabel id="label-y">Y-axis</InputLabel>
            <Select
              labelId="label-y"
              id="select-y"
              value={y}
              onChange={handleChangeY}
            >
              <MenuItem value={'IRR'}>IRR</MenuItem>
              <MenuItem value={'Capex_Payback'}>Capex_Payback</MenuItem>
              <MenuItem value={'Capex_Asset'}>Capex_Asset</MenuItem>
              <MenuItem value={'NPV_estimated_capex'}>NPV_estimated_capex</MenuItem>
              <MenuItem value={'NPV_estimated_PPA'}>NPV_estimated_PPA</MenuItem>
              <MenuItem value={'PPA'}>PPA</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="label-x">X-axis</InputLabel>
            <Select
              labelId="label-x"
              id="select-x"
              value={x}
              onChange={handleChangeX}
            >
              <MenuItem value={'IRR'}>IRR</MenuItem>
              <MenuItem value={'Capex_Payback'}>Capex_Payback</MenuItem>
              <MenuItem value={'Capex_Asset'}>Capex_Asset</MenuItem>
              <MenuItem value={'NPV_estimated_capex'}>NPV_estimated_capex</MenuItem>
              <MenuItem value={'NPV_estimated_PPA'}>NPV_estimated_PPA</MenuItem>
              <MenuItem value={'PPA'}>PPA</MenuItem>
            </Select>
          </FormControl>
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
        <div style={{marginTop: 2, margin: 'auto', textAlign: 'center'}}>{x}</div>
      </div>
    </div>
  );
};
