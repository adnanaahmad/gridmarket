import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';
import { data as realData } from '../data/testData';

export default function LineChartExample() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let chartData = realData['Analyses'].map((node) => {
        return {
            Longitude: Number(node.Longitude), 
            Latitude: Number(node.Latitude)
        }
    });

    setData(chartData);

    setTimeout(()=> {
      setData(chartData.slice(0,100));
    }, 5000);
    
  }, []);

  const config = {
    data,
    padding: 'auto',
    xField: 'Longitude',
    yField: 'Latitude',
  };

  return <Line {...config} />;
};