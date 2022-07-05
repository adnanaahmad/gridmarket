import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';
import lineData from '../visx/data/individual.json';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function LineChartExample() {
  const [data, setData] = useState([]);
  const [y, setY] = React.useState('battery_output');
  const handleChangeY = (event) => {
    setY(event.target.value);
  };

  useEffect(() => {
    let cdata = [];
    //let set = {};
    lineData.forEach((x, index) => {
        cdata.push({
          x: index,
          y: Number(x[y])
      });
  
    });
    //cdata = cdata.sort((a, b) => (a.x > b.x ? 1 : -1));
    setData(cdata);
  }, [y]);

  const config = {
    data,
    padding: 'auto',
    xField: 'x',
    yField: 'y',
  };

  return (
    <div style={{direction: 'row', display: 'flex', width: '100%', marginBottom: '100px'}}>
      <div style={{margin: 'auto'}}>{y}</div>
      <div style={{width: '100%'}}>
        <Box>
          <Box sx={{ maxWidth: 400, mb: 10 }}>
            <FormControl variant="standard" fullWidth>
              <InputLabel id="label-y">Y-axis</InputLabel>
              <Select
                labelId="label-y"
                id="select-y"
                value={y}
                onChange={handleChangeY}
              >
                <MenuItem value={'battery_output'}>battery_output</MenuItem>
                <MenuItem value={'original_load'}>original_load</MenuItem>
                <MenuItem value={'solar_gen'}>solar_gen</MenuItem>
                <MenuItem value={'net_load'}>net_load</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Line {...config} />
        </Box>
        <div style={{marginTop: 2, margin: 'auto', textAlign: 'center'}}>Hour</div>
      </div>
    </div>
  )
};