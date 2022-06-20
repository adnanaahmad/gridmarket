import React, { useMemo, useState, useCallback, useRef } from 'react';
import { Group } from '@visx/group';
import { Circle } from '@visx/shape';
import { GradientPinkRed } from '@visx/gradient';
import { scaleLinear } from '@visx/scale';
import genRandomNormalPoints, {
  PointsRange,
} from '@visx/mock-data/lib/generators/genRandomNormalPoints';
import { Tooltip } from '@visx/tooltip';
import { voronoi, VoronoiPolygon } from '@visx/voronoi';
import { localPoint } from '@visx/event';

const points: PointsRange[] = genRandomNormalPoints(600, /* seed= */ 0.5).filter((_, i) => i < 600);

const x = (d) => d[0];
const y = (d) => d[1];

let tooltipTimeout;

export default function ScatterPlotVisx
  ({
    width,
    height,
    showControls = true,
    hideTooltip,
    showTooltip,
    tooltipOpen,
    tooltipData,
    tooltipLeft,
    tooltipTop,
  }) {
    //if (width < 10) return null;
    const [showVoronoi, setShowVoronoi] = useState(showControls);
    const svgRef = useRef(null);
    const xScale = useMemo(
      () =>
        scaleLinear({
          domain: [1.3, 2.2],
          range: [0, width],
          clamp: true,
        }),
      [width],
    );
    const yScale = useMemo(
      () =>
        scaleLinear({
          domain: [0.75, 1.6],
          range: [height, 0],
          clamp: true,
        }),
      [height],
    );
    const voronoiLayout = useMemo(
      () =>
        voronoi({
          x: (d) => xScale(x(d)) ?? 0,
          y: (d) => yScale(y(d)) ?? 0,
          width,
          height,
        })(points),
      [width, height, xScale, yScale],
    );

    console.log(points)

    return (
      <div>
        <svg width={width} height={height} ref={svgRef}>
          <GradientPinkRed id="dots-pink" />
          {/** capture all mouse events with a rect */}
          <rect
            width={width}
            height={height}
            rx={14}
            fill="url(#dots-pink)"
          />
          <Group pointerEvents="none">
            {points.map((point, i) => (
              <Circle
                key={`point-${point[0]}-${i}`}
                className="dot"
                cx={xScale(x(point))}
                cy={yScale(y(point))}
                r={i % 3 === 0 ? 2 : 3}
                fill={tooltipData === point ? 'white' : '#f6c431'}
              />
            ))}
            {showVoronoi &&
              voronoiLayout
                .polygons()
                .map((polygon, i) => (
                  <VoronoiPolygon
                    key={`polygon-${i}`}
                    polygon={polygon}
                    fill="white"
                    stroke="white"
                    strokeWidth={1}
                    strokeOpacity={0.2}
                    fillOpacity={tooltipData === polygon.data ? 0.5 : 0}
                  />
                ))}
          </Group>
        </svg>
        {showControls && (
          <div>
            <label style={{ fontSize: 12 }}>
              <input
                type="checkbox"
                checked={showVoronoi}
                onChange={() => setShowVoronoi(!showVoronoi)}
              />
              &nbsp;Show voronoi point map
            </label>
          </div>
        )}
      </div>
    );
  };
