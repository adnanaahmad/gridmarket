import React, { useState, useEffect } from 'react';
import { Violin } from '@ant-design/plots';
import dataOne from '../visx/data/group_one.json';
import dataTwo from '../visx/data/group_two.json';

export default function Violinplot() {
  const [data, setData] = useState([]);

  const [w, setW] = useState(false);

  useEffect(() => {
    let vdata = [];
    dataOne.forEach((el, index) => {
      vdata.push({
        x: el.Technology,
        y: el.usage
      })
    })
    setData(vdata);
    setTimeout(() => {
      setW(true);
    },1000)
    //asyncFetch();
  }, []);

  const config = {
    //height: 500,
    data: data,
    xField: 'x',
    yField: 'y',
  };

  return(
    <div style={{width: w ?'100%' : '90%'}}>
      <Violin {...config} />
    </div>
  )
};