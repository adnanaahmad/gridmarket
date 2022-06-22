import React from 'react';
import { Group } from '@visx/group';
import { HeatmapRect } from '@visx/heatmap';
import { Axis, Orientation} from '@visx/axis';
import { scaleLinear, coerceNumber } from '@visx/scale';
import data from '../data/individual.json';

const tickLabelColor = '#fff';

const tickLabelProps = () =>
  ({
    fill: tickLabelColor,
    fontSize: 12,
    fontFamily: 'sans-serif',
    textAnchor: 'middle',
  });
const axisColor = '#fff';
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

const getMinMax = (vals) => {
    const numericVals = vals.map(coerceNumber);
    return [Math.min(...numericVals), Math.max(...numericVals)];
  };  

const HeatMapVisx = ({
  width,
  height,
  margin = defaultMargin,
  separation = 20,
}) => {
    //console.log(colorMax, bucketSizeMax);

    // bounds
    const size =
    width > margin.left + margin.right ? width - margin.left - margin.right - separation : width;
    const xMax = size/2;
    const yMax = height - margin.bottom - margin.top;

    const binWidth = xMax / binData.length;

    xScale.range([0, xMax]);
    yScale.range([yMax, 0]);

   // console.log(binData);

    //axis
    const AxisComponent = Axis;
    let arrayX = [1, 12, 24];
    const axis = {
        scale: scaleLinear({
            domain: getMinMax(arrayX),
            range: [0, xMax],
        }),
        values: arrayX,
        tickFormat: (v, index, ticks) =>
            index === 0 ? 'first' : index === ticks[ticks.length - 1].index ? 'last' : `${v}`,
        label: 'linear',
    }

    const yaxis = {
        scale: scaleLinear({
            domain: getMinMax(arrayX),
            range: [yMax, 0],
        }),
        values: arrayX,
        tickFormat: (v, index, ticks) =>
            index === 0 ? 'first' : index === ticks[ticks.length - 1].index ? 'last' : `${v}`,
        label: 'linear',
    }
    const [state, setState] = React.useState(false);
    React.useEffect(() => {
      setTimeout(() => {
        setState(true);
        //console.log('hello', state);
      }, 5000)
  })

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} rx={14} fill={background} />
      <AxisComponent
        // force remount when this changes to see the animation difference
        //key={`axis-${animationTrajectory}`}
        orientation={Orientation.left}
        top={25}
        left={margin.left}
        scale={yaxis.scale}
        //tickFormat={axis.tickFormat}
        stroke={axisColor}
        tickStroke={axisColor}
        tickLabelProps={tickLabelProps}
        tickValues={yaxis.values}
        numTicks={yaxis.label === 'time' ? 6 : undefined}
        label={yaxis.label}
      />
      <Group top={margin.top} left={margin.left}>
        <HeatmapRect
          data={state ? binData.slice(1,15) : binData}
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
      <AxisComponent
            // force remount when this changes to see the animation difference
            //key={`axis-${animationTrajectory}`}
            orientation={Orientation.bottom}
            top={410}
            left={margin.left + 5}
            scale={axis.scale}
            //tickFormat={axis.tickFormat}
            stroke={axisColor}
            tickStroke={axisColor}
            tickLabelProps={tickLabelProps}
            tickValues={axis.values}
            numTicks={axis.label === 'time' ? 6 : undefined}
            label={axis.label}
            labelProps={{
                x: width + 30,
                y: -10,
                fill: 'yellow',
                fontSize: 18,
                strokeWidth: 0,
                stroke: '#fff',
                paintOrder: 'stroke',
                fontFamily: 'sans-serif',
                textAnchor: 'start',
            }}
        />
    </svg>
  );
};

export default HeatMapVisx;
