import React from 'react';
import { Group } from '@visx/group';
import { scaleLinear } from '@visx/scale';
import { HeatmapRect } from '@visx/heatmap';
import data from '../data/individual.json';

const cool1 = '#122549';
const cool2 = '#b4fbde';
export const background = '#28272c';

function getHeatmapData(data) {
    let binDataSet = [];
    let colorMax = 0;
    data.some((x,index) => {
        if (binDataSet[x.day]) {
            binDataSet[x.day].bins.push({
                bin: x.hour,
                count: x.original_load
            });
        } else {
            binDataSet[x.day] = {
                bin: x.day,
                bins: [{
                    bin: x.hour,
                    count: x.original_load
                }]
            }
        }
        if (colorMax < x.original_load){
            colorMax = x.original_load;
        }
        return data[index+1].day === 24;
    });
    return {binData: binDataSet, colorMax};
}

let binData = getHeatmapData(data).binData;

const colorMax = getHeatmapData(data).colorMax;
const bucketSizeMax = binData[1].bins.length;

// scales
const xScale = scaleLinear({
  domain: [0, binData.length],
});
const yScale = scaleLinear({
  domain: [0, bucketSizeMax],
});
const rectColorScale = scaleLinear({
  range: ['red', 'yellow',],
  domain: [0, colorMax],
});
const opacityScale = scaleLinear({
  range: [0.1, 1],
  domain: [0, colorMax],
});


const defaultMargin = { top: 10, left: 20, right: 20, bottom: 110 };


const HeatMapVisx = ({
  width,
  height,
  margin = defaultMargin,
  separation = 20,
}) => {
    console.log(colorMax, bucketSizeMax);
    //binData = getHeatmapData(data);
    // bounds
    const size =
    width > margin.left + margin.right ? width - margin.left - margin.right - separation : width;
    const xMax = size/2;
    const yMax = height - margin.bottom - margin.top;

    const binWidth = xMax / binData.length;

    xScale.range([0, xMax]);
    yScale.range([yMax, 0]);

    console.log(binData);

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} rx={14} fill={background} />
      <Group top={margin.top} left={margin.left}>
        <HeatmapRect
          data={binData}
          xScale={(d) => xScale(d) ?? 0}
          yScale={(d) => yScale(d) ?? 0}
          colorScale={rectColorScale}
          opacityScale={opacityScale}
          binWidth={binWidth}
          binHeight={binWidth}
          gap={2}
        >
          {(heatmap) =>
            heatmap.map((heatmapBins) =>
              heatmapBins.map((bin) => (
                <rect
                  key={`heatmap-rect-${bin.row}-${bin.column}`}
                  className="visx-heatmap-rect"
                  width={bin.width}
                  height={bin.height}
                  x={bin.x}
                  y={bin.y}
                  fill={bin.color}
                  fillOpacity={bin.opacity}
                  onClick={() => {
                    //if (!events) return;
                    const { row, column } = bin;
                    alert(JSON.stringify({ row, column, bin: bin.bin }));
                  }}
                />
              )),
            )
          }
        </HeatmapRect>
      </Group>
    </svg>
  );
};

export default HeatMapVisx;
