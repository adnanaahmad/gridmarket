import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';
import lineData from '../visx/data/individual.json';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, Stack } from '@mui/material';


export default function LiveChartExample() {
  const [data, setData] = useState([]);
  const y = 'battery_output';
  const [to, setTo] = useState([]);

  function setChart(days, range=false) {
    to.forEach(el => {
      window.clearTimeout(el);
    });

    //setData([]);
    let cdata = [];
    let BreakException = {};

    try {
        lineData.some(x => {
            if (x.day === (days+1)) throw BreakException;
            if (range){
              if(x.day === days){
                cdata.push({
                  x: x.hour,
                  y: Number(x[y])
                });
              }
            }else{
              cdata.push({
                x: x.hour,
                y: Number(x[y])
              });
            }

        });
        //cdata = cdata.sort((a, b) => (a.hour > b.hour ? 1 : -1));
        
    } catch (error) {
        console.log(error);   
    }
    setData(cdata);
    console.log('hello', cdata);
  }

  function liveData() {
    var i = 1;       
    function myLoop() {
     setTo([...to, 
      setTimeout(function() {
        console.log('hello', i);
        i++;
        if (i < 50) {
          setChart(i, true);
          myLoop();
        }
      }, 1000)])
    }
    myLoop();
  }

  useEffect(() => {
    // let cdata = [];
    // let BreakException = {};

    // try {
    //     lineData.some(x => {
    //         if (x.day === 2) throw BreakException;
    //         setTimeout(() => {
    //             cdata.push({
    //                 x: x.hour,
    //                 y: Number(x[y])
    //             });
    //         }, 500)
    //     });
    //     //cdata = cdata.sort((a, b) => (a.x > b.x ? 1 : -1));
    //     setData(cdata);
        
    // } catch (error) {
    //     console.log(error);   
    // }
    // console.log(cdata);
    //setData(cdata);
  }, []);

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
        <Stack direction={'row'} spacing={3} sx={{mb:10}}>
          <Button onClick={() => liveData()} variant="outlined">Live</Button>
          <Button onClick={() => setChart(1)} variant="outlined">1D</Button>
          <Button onClick={() => setChart(7)} variant="outlined">7D</Button>
          <Button onClick={() => setChart(30)} variant="outlined">1M</Button>
          <Button onClick={() => setChart(180)} variant="outlined">6M</Button>
          <Button onClick={() => setChart(365)} variant="outlined">Max</Button>
        </Stack>
        <Line {...config} />
      </Box>
  )
};