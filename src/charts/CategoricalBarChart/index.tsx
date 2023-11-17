import { BarChart as BarGraph } from "echarts/charts";
import {
  GridComponent,
  TitleComponent,
  DatasetComponent,
  TransformComponent,
  DataZoomComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import { getInstanceByDom, init, use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { useRef, useEffect } from "react";
import type { UIDDetails } from "../../sample-data/interfaces";
import type { BarSeriesOption } from "echarts/charts";
import type {
  TitleComponentOption,
  GridComponentOption,
  DatasetComponentOption,
  DataZoomComponentOption,
  TooltipComponentOption,
} from "echarts/components";
import type { ComposeOption, ECharts } from "echarts/core";
import type { CSSProperties } from "react";

export type CategoricalBarChartOptions = ComposeOption<
  | TitleComponentOption
  | GridComponentOption
  | BarSeriesOption
  | DatasetComponentOption
  | DataZoomComponentOption
  | TooltipComponentOption
>;

use([
  GridComponent,
  TitleComponent,
  BarGraph,
  DatasetComponent,
  TransformComponent,
  DataZoomComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer, // If you only need to use the canvas rendering mode, the bundle will not include the SVGRenderer module, which is not needed.
]);

export interface CategoricalBarChartProps {
  theme?: "light" | "dark";
  data: UIDDetails[];
  xAxis: string;
  yAxis: string;
  xAxisTitle: string;
  yAxisTitle: string;
  isLoading?: boolean;
  title?: string;
  style?: CSSProperties;
}

export function CategoricalBarChart({
  theme,
  data,
  xAxis,
  yAxis,
  xAxisTitle,
  yAxisTitle,
  isLoading,
  title,
  style,
}: CategoricalBarChartProps): JSX.Element {
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
      const option: CategoricalBarChartOptions = {
        title: {
          text: title,
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: (params) => {
            let output: string | undefined;
            if (Array.isArray(params)) {
              output = "";
            } else {
              const { uid, average_loss: averageLoss } = params.data as UIDDetails;
              output = `<div>
              <span>${xAxisTitle}: ${uid}</span></br>
              <span>${yAxisTitle}: ${averageLoss.toFixed(4)}</span></br>
              </div>`;
            }
            return output;
          },
        },
        grid: { bottom: "20%", top: "15%", right: "15%", left: "15%" },
        xAxis: {
          type: "category",
          name: xAxisTitle ?? xAxis,
          position: "bottom",
          nameLocation: "middle",
          nameGap: 30,
          axisLine: { show: true },
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
        dataset: [
          {
            dimensions: [xAxis, yAxis],
            // @ts-expect-error bad types
            source: data,
          },
          {
            transform: {
              type: "sort",
              config: { dimension: yAxis, order: "asc" },
            },
          },
        ],
        series: [
          {
            type: "bar",
            encode: {
              x: xAxis,
              y: yAxis,
            },
            datasetIndex: 1,
          },
        ],
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

  return (
    <div
      ref={chartRef}
      style={{ height: "100%", width: "100%", borderWidth: "1px", borderStyle: "solid", ...style }}
    />
  );
}
