import { Skeleton } from "@mantine/core";
import { schemeBrBG } from "d3-scale-chromatic";
import { HeatmapChart } from "echarts/charts";
import {
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  DataZoomComponent,
  DatasetComponent,
} from "echarts/components";
import { getInstanceByDom, init, use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { useRef, type CSSProperties, useEffect } from "react";
import type { HeatmapSeriesOption } from "echarts/charts";
import type {
  TooltipComponentOption,
  GridComponentOption,
  VisualMapComponentOption,
  DataZoomComponentOption,
  DatasetComponentOption,
} from "echarts/components";
import type { ComposeOption, ECharts } from "echarts/core";

use([
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  HeatmapChart,
  CanvasRenderer,
  DataZoomComponent,
  DatasetComponent,
]);

type HeatMapOption = ComposeOption<
  | TooltipComponentOption
  | GridComponentOption
  | VisualMapComponentOption
  | HeatmapSeriesOption
  | DataZoomComponentOption
  | DatasetComponentOption
>;

export interface HeatmapProps {
  loading?: boolean;
  style?: CSSProperties;
  theme?: "light" | "dark";
  title?: string;
  xAxis: string;
  xAxisLabel?: string;
  yAxis: string;
  yAxisLabel?: string;
  visualAxis: string;
  visualAxisLabel?: string;
  data: Record<string, string | number | undefined | null>[];
}

export function Heatmap({
  loading,
  style,
  theme,
  title,
  data,
  xAxis,
  yAxis,
  visualAxis,
  visualAxisLabel,
  yAxisLabel,
  xAxisLabel,
}: HeatmapProps): JSX.Element {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let chart: ECharts | undefined;
    let observer: ResizeObserver | undefined;

    if (chartRef.current !== null) {
      chart = init(chartRef.current, theme);
      observer = new ResizeObserver(() => {
        chart?.resize();
      });
      observer.observe(chartRef.current);
    }

    return () => {
      chart?.dispose();
      observer?.disconnect();
    };
  }, [theme]); // Whenever theme changes we need to dispose the chart to render a fresh one with appropriate styling

  useEffect(() => {
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      const max =
        data.length > 0
          ? Math.max(
              ...data.map((ele) => {
                const value = ele[visualAxis];
                return typeof value === "number" ? value : 0;
              }),
            )
          : 1;
      const option: HeatMapOption = {
        color: schemeBrBG[11], // Ref: https://echarts.apache.org/en/option.html#color
        title: {
          text: title,
          left: "center",
        },
        textStyle: {
          fontFamily: "Space Mono, Courier, monospace",
        },
        grid: { bottom: "15%", top: "15%", right: "5%", left: "5%" },
        xAxis: {
          type: "category",
          name: xAxisLabel ?? xAxis,
          nameLocation: "middle",
          nameGap: 30,
          axisLine: { show: true },
        },
        yAxis: {
          type: "category",
          name: yAxisLabel ?? yAxis,
          position: "bottom",
          nameLocation: "middle",
          nameGap: 30,
          axisLine: { show: true },
        },
        dataZoom: [
          {
            type: "inside",
            filterMode: "none", // Ref: https://stackoverflow.com/questions/53187396/echarts-line-dissapear-when-zooming-in
            xAxisIndex: 0,
          },
        ],
        visualMap: {
          min: 0,
          max,
          precision: 4,
          calculable: true,
          realtime: true,
          inRange: {
            color: schemeBrBG[11],
          },
          orient: "horizontal",
          left: "center",
          bottom: 0,
          dimension: visualAxis as unknown as number, // Bad types
        },
        dataset: {
          source: data,
        },
        series: [
          {
            type: "heatmap",
            encode: {
              x: xAxis,
              y: yAxis,
            },
          },
        ],
        tooltip: {
          trigger: "item",
          formatter: (params) => {
            let output = "";
            if (Array.isArray(params)) {
              output = "";
            } else {
              const paramsData = params.data as Record<string, string | number | null | undefined>;
              const xAxisData = paramsData[xAxis];
              const yAxisData = paramsData[yAxis];
              const visualAxisData = paramsData[visualAxis];
              output = `
              <div>
                ${
                  typeof xAxisData === "string" || typeof xAxisData === "number"
                    ? `<span>${xAxisLabel}: ${xAxisData}</span>`
                    : ""
                }
                <br/>
                  ${
                    typeof yAxisData === "number" || typeof yAxisData === "string"
                      ? `<span>${yAxisLabel}: ${yAxisData}</span>`
                      : ""
                  }
                  <br/>
                  ${
                    typeof visualAxisData === "number"
                      ? `<span>${visualAxisLabel}: ${visualAxisData.toFixed(4)}</span>`
                      : ""
                  }
              </div>
              `;
            }
            return output;
          },
        },
      };
      chart?.setOption(option, true);
    }
  }, [data, theme, title, xAxis, xAxisLabel, yAxis, yAxisLabel, visualAxis, visualAxisLabel]);
  return (
    <Skeleton visible={loading ?? false}>
      <div ref={chartRef} style={{ height: "100%", width: "100%", ...style }} />
    </Skeleton>
  );
}
