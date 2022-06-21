import React, { useMemo, useRef } from 'react';
import { Group } from '@visx/group';
import { Circle } from '@visx/shape';
import { GradientPinkRed } from '@visx/gradient';
import { scaleLinear } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import data from '../data/portfolio.json';

//const points = genRandomNormalPoints(600, /* seed= */ 0.5).filter((_, i) => i < 600);

function getPoints (){
    let d = [];
    let xmax = 0;
    let ymax = 0;
    let xmin = Number(data[0].IRR);
    let ymin = Number(data[0].Capex_Payback);
    data.forEach(x => {
        if (!isNaN(x.IRR) && !isNaN(x.Capex_Payback)){
            d.push([Number(x.IRR), Number(x.Capex_Payback)]);
            xmax = Math.max(xmax, Number(x.IRR));
            ymax = Math.max(ymax, Number(x.Capex_Payback));

            xmin = Math.min(xmin, Number(x.IRR));
            ymin = Math.min(ymin, Number(x.Capex_Payback));
        }
    });
    //console.log(xmin, ymin);
    //console.log(xmax, ymax);
    return d
}
const points = getPoints();
const x = (d) => d[0];
const y = (d) => d[1];


export default function ScatterPlotVisx
  ({
    width,
    height=600,
    tooltipData,
  }) {
    //if (width < 10) return null;
    const svgRef = useRef(null);
    const xScale = useMemo(
      () =>
        scaleLinear({
          domain: [-.2, 3],
          range: [0, width],
        }),
      [width],
    );
    const yScale = useMemo(
      () =>
        scaleLinear({
          domain: [-5, 35],
          range: [height, 0],
        }),
      [height],
    );

   // console.log(points)

    return (
      <div>
        <svg width={width} height={height-10} ref={svgRef}>
          <GradientPinkRed id="dots-pink" />
          <rect
            width={width}
            height={height+10}
            rx={14}
            fill="url(#dots-pink)"
          />
          <Group pointerEvents="none">
            <AxisLeft
                numTicks={4}
                scale={yScale}
                top={0}
                left={87}
            />
            <AxisBottom
                top={height-63}
                scale={xScale}
            />
            {points.map((point, i) => (
              <Circle
                key={`point-${point[0]}-${i}`}
                className="dot"
                cx={xScale(x(point))}
                cy={yScale(y(point))}
                r={i % 3 === 0 ? 2 : 3}
                fill='#f6c431'
              />
            ))}
          </Group>
        </svg>
      </div>
    );
  };
