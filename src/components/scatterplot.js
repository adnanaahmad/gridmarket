import React, { useState, useEffect } from 'react';
import { Scatter } from '@ant-design/plots';
import { data as realData } from '../data/testData';
import sdata from '../visx/data/portfolio.json';

export default function ScatterPlot() {
  const [data, setData] = useState([]);

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
    let spdata = [...scatterplotData];
    setData(spdata.slice(1, spdata.length/2));
    
    setTimeout(()=> {
      setData(scatterplotData);
    }, 5000);
  }, []);

  const config = {
    appendPadding: 10,
    data,
    xField: 'x',
    yField: 'y',
    shape: 'circle',
    size: 4,
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

  return <Scatter {...config} />;
};
