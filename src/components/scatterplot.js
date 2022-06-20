import React, { useState, useEffect } from 'react';
import { Scatter } from '@ant-design/plots';
import { data as realData } from '../data/testData';

export default function ScatterPlot() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let scatterplotData = realData['Analyses'].map((node) => {
        return {
            Longitude: Number(node.Longitude),
            Latitude: Number(node.Latitude), 
            State: node.State,
        }
    });
    setData(scatterplotData);
    
    setTimeout(()=> {
      setData(scatterplotData.slice(0,100));
    }, 5000);
  }, []);

  const config = {
    appendPadding: 10,
    data,
    xField: 'Longitude',
    yField: 'Latitude',
    shape: 'circle',
    colorField: 'State',
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
