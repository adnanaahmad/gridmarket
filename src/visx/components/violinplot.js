import React from 'react';
import { Group } from '@visx/group';
import { ViolinPlot } from '@visx/stats';
import { LinearGradient } from '@visx/gradient';
import { scaleBand, scaleLinear } from '@visx/scale';
import genStats, { Stats } from '@visx/mock-data/lib/generators/genStats';
import { getSeededRandom, getRandomNormal } from '@visx/mock-data';
import { Tooltip, defaultStyles as defaultTooltipStyles } from '@visx/tooltip';
import { PatternLines } from '@visx/pattern';
import leftData from '../data/group_one.json';
import rightData from '../data/group_two.json';

// seeded randomness
const seededRandom = getSeededRandom(0.1);
const randomNormal = getRandomNormal.source(getSeededRandom(0.789))(4, 3);
//const data = genStats(5, randomNormal, () => 10 * seededRandom());

// accessors
const x = (d: Stats) => d.boxPlot.x;

function getData() {
    let data = [];
    leftData.forEach((x, index) => {
        if (!isNaN(rightData[index].weighted_sum) && !isNaN(x.usage)) {
            if (data[x['Technology']]) {
                data[x['Technology']].binData.push({
                    value: Number(rightData[index].weighted_sum),
                    count: x.usage
                });
                data[x['Technology']].boxPlot.min = Math.min(data[x['Technology']].boxPlot.min, Number(rightData[index].weighted_sum), x.usage);
                data[x['Technology']].boxPlot.max = Math.max(data[x['Technology']].boxPlot.max, Number(rightData[index].weighted_sum), x.usage);
            } else {
                data[x['Technology']] = {
                    name: x['Technology'],
                    binData: [{
                        value: Number(rightData[index].weighted_sum),
                        count: x.usage
                    }],
                    boxPlot: {
                        x:  x['Technology'],
                        min: Math.min(Number(rightData[index].weighted_sum), x.usage),
                        max: Math.max(Number(rightData[index].weighted_sum), x.usage)
                    }
                };
            }
        }
    });
    data = Object.values(data);
    return data
}


export default function ViolinplotVisx
  ({
    width,
    height,
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
  }) {
    let data = getData();
    // bounds
    const xMax = width;
    const yMax = height - 120;

    // scales
    const xScale = scaleBand({
      range: [0, xMax],
      round: true,
      domain: data.map(x),
      padding: 0.4,
    });

    const values = data.reduce((allValues, { boxPlot }) => {
      allValues.push(boxPlot.min, boxPlot.max);
      return allValues;
    }, []);
    const minYValue = Math.min(...values);
    const maxYValue = Math.max(...values);

    const yScale = scaleLinear({
      range: [yMax, 0],
      round: true,
      domain: [minYValue, maxYValue],
    });

    const boxWidth = xScale.bandwidth();
    const constrainedWidth = Math.min(40, boxWidth);

    console.log(data);

    return width < 10 ? null : (
      <div style={{ position: 'relative' }}>
        <svg width={width} height={height}>
          <LinearGradient id="statsplot" to="#8b6ce7" from="#87f2d4" />
          <rect x={0} y={0} width={width} height={height} fill="url(#statsplot)" rx={14} />
          <PatternLines
            id="hViolinLines"
            height={3}
            width={3}
            stroke="#ced4da"
            strokeWidth={1}
            // fill="rgba(0,0,0,0.3)"
            orientation={['horizontal']}
          />
          <Group top={40}>
            {data.map((d: Stats, i) => (
              <g key={i}>
                <ViolinPlot
                  data={d.binData}
                  stroke="#dee2e6"
                  left={xScale(x(d)) ? xScale(x(d)) : 0}
                  width={constrainedWidth}
                  valueScale={yScale}
                  fill="url(#hViolinLines)"
                />
              </g>
            ))}
          </Group>
        </svg>

        {tooltipOpen && tooltipData && (
          <Tooltip
            top={tooltipTop}
            left={tooltipLeft}
            style={{ ...defaultTooltipStyles, backgroundColor: '#283238', color: 'white' }}
          >
            <div>
              <strong>{tooltipData.name}</strong>
            </div>
            <div style={{ marginTop: '5px', fontSize: '12px' }}>
              {tooltipData.max && <div>max: {tooltipData.max}</div>}
              {tooltipData.thirdQuartile && <div>third quartile: {tooltipData.thirdQuartile}</div>}
              {tooltipData.median && <div>median: {tooltipData.median}</div>}
              {tooltipData.firstQuartile && <div>first quartile: {tooltipData.firstQuartile}</div>}
              {tooltipData.min && <div>min: {tooltipData.min}</div>}
            </div>
          </Tooltip>
        )}
      </div>
    );
};
