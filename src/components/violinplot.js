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
    let v = [...vdata];
    setData(v.slice(1, vdata.length/2));
    setTimeout(() => {
      setW(true);
    },1000)
    setTimeout(() => {
      setW(false);
      setData([...vdata]);
    },5000)
   
    //asyncFetch();
  }, []);

  const config = {
    //height: 500,
    data: data,
    xField: 'x',
    yField: 'y',
  };

  return(
    <div style={{width: w ?'100%' : '99%'}}>
      <Violin {...config} />
    </div>
  )
};