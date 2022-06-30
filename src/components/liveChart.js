import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';
import lineData from '../visx/data/individual.json';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function LiveChartExample() {
  const [data, setData] = useState([]);
  const [y, setY] = React.useState('battery_output');
  const handleChangeY = (event) => {
    setY(event.target.value);
  };

  useEffect(() => {
    let cdata = [];
    let BreakException = {};

    try {
        lineData.some(x => {
            if (x.day === 2) throw BreakException;
            setTimeout(() => {
                cdata.push({
                    x: x.hour,
                    y: Number(x[y])
                });
                setData(cdata);
            }, 500)
        });
        //cdata = cdata.sort((a, b) => (a.x > b.x ? 1 : -1));
        
    } catch (error) {
        console.log(error);   
    }
    console.log(cdata);
    //setData(cdata);
  }, [y]);

  const config = {
    data,
    padding: 'auto',
    xField: 'x',
    yField: 'y',
    scrollbar: {
        type: 'horizontal',
    },
  };

  return (
      <Box>
        <Line {...config} />
      </Box>
  )
};