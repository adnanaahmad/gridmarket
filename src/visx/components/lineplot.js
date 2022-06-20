import React, { useState } from 'react';
import { extent, max } from 'd3-array';
import * as allCurves from '@visx/curve';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import { scaleTime, scaleLinear } from '@visx/scale';
import { MarkerArrow, MarkerCross, MarkerX, MarkerCircle, MarkerLine } from '@visx/marker';
import lineData from '../data/individual.json';

const curveTypes = Object.keys(allCurves);
const lineCount = 5;
// const series = new Array(lineCount).fill(null).map((_, i) =>
//   // vary each series value deterministically
//   generateDateValue(25, /* seed= */ i / 72).sort(
//     (a, b) => a.date.getTime() - b.date.getTime(),
//   ),
// );
function getData() {
    let data = [];
    let set = {};
    lineData.forEach(x => {
        if(!set[x.hour]) {
            set[x.hour] = 1;
            data.push({
                x: x.hour,
                y: Number(x.solar_gen)
            });
        }

    });
    data = data.sort((a, b) => (a.x > b.x ? 1 : -1));
    return data;
}
let series = [getData()];
const allData = series.reduce((rec, d) => rec.concat(d), []);

// data accessors
const getX = (d) => d.x;
const getY = (d) => d.y;

// scales
const xScale = scaleTime({
  domain: extent(allData, getX),
});
const yScale = scaleLinear({
  domain: [0, max(allData, getY)],
});

export default function LineplotVisx({ width, height, showControls = true }) {
  const [curveType, setCurveType] = useState('curveNatural');
  const [showPoints, setShowPoints] = useState(true);
  const svgHeight = height;
  const lineHeight = svgHeight / lineCount;

  // update scale output ranges
  xScale.range([0, width - 50]);
  yScale.range([lineHeight - 2, 0]);

  console.log(series)

  return (
    <div className="visx-curves-demo">
      {showControls && (
        <>
          <label>
            Curve type &nbsp;
            <select onChange={(e) => setCurveType(e.target.value)} value={curveType}>
              {curveTypes.map((curve) => (
                <option key={curve} value={curve}>
                  {curve}
                </option>
              ))}
            </select>
          </label>
          &nbsp;
          <label>
            Show points&nbsp;
            <input
              type="checkbox"
              checked={showPoints}
              onChange={() => setShowPoints(!showPoints)}
            />
          </label>
          <br />
        </>
      )}
      <svg width={width} height={svgHeight}>
        <MarkerX
          id="marker-x"
          stroke="#333"
          size={22}
          strokeWidth={4}
          markerUnits="userSpaceOnUse"
        />
        <MarkerCross
          id="marker-cross"
          stroke="#333"
          size={22}
          strokeWidth={4}
          strokeOpacity={0.6}
          markerUnits="userSpaceOnUse"
        />
        <MarkerCircle id="marker-circle" fill="#333" size={2} refX={2} />
        <MarkerArrow id="marker-arrow-odd" stroke="#333" size={8} strokeWidth={1} />
        <MarkerLine id="marker-line" fill="#333" size={16} strokeWidth={1} />
        <MarkerArrow id="marker-arrow" fill="#333" refX={2} size={6} />
        <rect width={width} height={svgHeight} fill="#efefef" rx={14} ry={14} />
        {width > 8 &&
          series.map((lineData, i) => {
            const even = i % 2 === 0;
            let markerStart = even ? 'url(#marker-cross)' : 'url(#marker-x)';
            if (i === 1) markerStart = 'url(#marker-line)';
            const markerEnd = even ? 'url(#marker-arrow)' : 'url(#marker-arrow-odd)';
            return (
              <Group key={`lines-${i}`} top={100} left={13}>
                {showPoints &&
                  lineData.map((d, j) => (
                    <circle
                      key={i + j}
                      r={3}
                      cx={xScale(getX(d))}
                      cy={yScale(getY(d))}
                      stroke="rgba(33,33,33,0.5)"
                      fill="transparent"
                    />
                  ))}
                <LinePath
                  curve={allCurves[curveType]}
                  data={lineData}
                  x={(d) => xScale(getX(d)) ?? 0}
                  y={(d) => yScale(getY(d)) ?? 0}
                  stroke="#333"
                  strokeWidth={even ? 2 : 1}
                  strokeOpacity={even ? 0.6 : 1}
                  shapeRendering="geometricPrecision"
                  markerMid="url(#marker-circle)"
                  markerStart={markerStart}
                  markerEnd={markerEnd}
                />
              </Group>
            );
          })}
      </svg>
      <style jsx>{`
        .visx-curves-demo label {
          font-size: 12px;
        }
      `}</style>
    </div>
  );
}
