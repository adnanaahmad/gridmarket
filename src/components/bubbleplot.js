import React, { useState, useEffect } from 'react';
import { Scatter } from '@ant-design/plots';
import sdata from '../visx/data/portfolio.json';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Stack } from '@mui/material';

export default function Bubbleplot () {
  const [data, setData] = useState([]);
  const [size, setSize] = React.useState('IRR');
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
            y: Number(el[y]),
            size: Number(el[size])
          });
      }
    });
    setData(scatterplotData);
  }, [x, y, size]);

  const config = {
    appendPadding: 30,
    data,
    xField: 'x',
    yField: 'y',
    sizeField: 'size',
    size: [4, 30],
    shape: 'circle',
    pointStyle: {
      fillOpacity: 0.8,
      stroke: '#bbb',
    },
    xAxis: {
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
      label: {
        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    yAxis: {
      line: {
        style: {
          stroke: '#aaa',
        },
      },
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
              {
                Object.keys(data).map(node => (
                  <Stack direction={'row'} spacing={1} alignItems='center'>
                    <div style={{background: color, height: 10, width: 10, borderRadius: 10}}></div>
                    <div>{node}: </div>
                    <div>{data[node] ? data[node].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : data[node]}</div>
                  </Stack>
                ))
              }
            </Stack>
          </Box>
          )
      }
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
              <MenuItem value={'IRR'}>IRR</MenuItem>
              <MenuItem value={'Capex_Payback'}>Capex_Payback</MenuItem>
              <MenuItem value={'Capex_Asset'}>Capex_Asset</MenuItem>
              <MenuItem value={'NPV_estimated_capex'}>NPV_estimated_capex</MenuItem>
              <MenuItem value={'NPV_estimated_PPA'}>NPV_estimated_PPA</MenuItem>
              <MenuItem value={'PPA'}>PPA</MenuItem>
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