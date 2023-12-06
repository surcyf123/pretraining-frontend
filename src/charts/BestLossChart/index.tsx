import { LineChart as LineGraph } from "echarts/charts";
import {
  GridComponent,
  TitleComponent,
  DatasetComponent,
  DataZoomComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import { getInstanceByDom, init, use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { useRef, useEffect } from "react";
import type { RunDetails } from "../../sample-data/interfaces";
import type { LineSeriesOption } from "echarts/charts";
import type {
  TitleComponentOption,
  GridComponentOption,
  DatasetComponentOption,
  DataZoomComponentOption,
  TooltipComponentOption,
} from "echarts/components";
import type { ComposeOption, ECharts } from "echarts/core";
import type { CSSProperties } from "react";

export type LineChartOptions = ComposeOption<
  | TitleComponentOption
  | GridComponentOption
  | LineSeriesOption
  | DatasetComponentOption
  | DataZoomComponentOption
  | TooltipComponentOption
>;

use([
  GridComponent,
  TitleComponent,
  LineGraph,
  DatasetComponent,
  DataZoomComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer, // If you only need to use the canvas rendering mode, the bundle will not include the SVGRenderer module, which is not needed.
]);

export interface BestLossChartProps {
  theme?: "light" | "dark";
  data: Record<string, RunDetails[]>;
  xAxis: string;
  yAxis: string;
  xAxisTitle: string;
  yAxisTitle: string;
  isLoading?: boolean;
  title?: string;
  style?: CSSProperties;
}

export function BestLossChart({
  theme,
  data,
  xAxis,
  yAxis,
  xAxisTitle,
  yAxisTitle,
  isLoading,
  title,
  style,
}: BestLossChartProps): JSX.Element {
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
      const option: LineChartOptions = {
        title: {
          text: title,
          left: "center",
        },
        textStyle: {
          fontFamily: "Space Mono, Courier, monospace",
        },
        grid: { bottom: "25%", top: "15%", right: "5%", left: "5%" },
        xAxis: {
          type: "time",
          name: xAxisTitle ?? xAxis,
          position: "bottom",
          nameLocation: "middle",
          nameGap: 30,
          axisLine: { show: true },
          axisLabel: {
            formatter: (value: unknown) => {
              let output = "";
              if (typeof value === "number") {
                const date = new Date(value).toLocaleDateString(undefined, { dateStyle: "short" });
                const time = new Date(value).toLocaleTimeString(undefined, {
                  timeStyle: "short",
                  hour12: true,
                });
                output = `${time}\n${date}`;
              }
              return output;
            },
          },
        },
        yAxis: {
          type: "value",
          name: yAxisTitle ?? yAxis,
          position: "left",
          nameLocation: "middle",
          nameGap: 50,
          axisLine: { show: true },
          scale: true,
        },
        tooltip: {
          trigger: "axis",
          formatter: (params) => {
            let output = "";
            if (Array.isArray(params) && params.length > 0) {
              const { timestamp, best_average_loss: bestAverageLoss } = params[0]
                .data as RunDetails;
              output = `
              <div>
                <span>${xAxisTitle}: ${new Date(timestamp).toLocaleString(undefined, {
                  dateStyle: "short",
                  timeStyle: "short",
                  hour12: true,
                })}</span>
                <br/>
                <span>${yAxisTitle}: ${(bestAverageLoss ?? NaN).toFixed(4)}</span>
              </div>
              `;
            }
            return output;
          },
        },
        // @ts-expect-error bad types
        dataset: Object.entries(data).map(([key, value]) => ({
          dimensions: [xAxis, yAxis],
          source: value,
          id: key,
        })),
        series: Object.keys(data).map((ele) => ({
          type: "line",
          symbolSize: 5,
          encode: {
            x: xAxis,
            y: yAxis,
          },
          datasetId: ele,
          name: ele,
          showSymbol: false,
        })),
        legend: {
          align: "auto",
          bottom: "1%",
          type: "scroll",
          orient: "horizontal",
        },
        dataZoom: [
          {
            type: "inside",
            filterMode: "none", // Ref: https://stackoverflow.com/questions/53187396/echarts-line-dissapear-when-zooming-in
            xAxisIndex: 0,
          },
        ],
      };
      chart?.setOption(option, true);
    }
  }, [data, theme, xAxis, xAxisTitle, yAxis, yAxisTitle, title]);

  useEffect(() => {
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      isLoading === true ? chart?.showLoading() : chart?.hideLoading();
    }
  }, [theme, isLoading]);

  return <div ref={chartRef} style={{ height: "100%", width: "100%", ...style }} />;
}
