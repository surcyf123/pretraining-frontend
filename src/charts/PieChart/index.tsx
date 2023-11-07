import { PieChart as PieGraph } from "echarts/charts";
import {
  GridComponent,
  TitleComponent,
  DatasetComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import { getInstanceByDom, init, use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { useRef, useEffect } from "react";
import type { PieSeriesOption } from "echarts/charts";
import type {
  TitleComponentOption,
  GridComponentOption,
  DatasetComponentOption,
  TooltipComponentOption,
} from "echarts/components";
import type { ComposeOption, ECharts } from "echarts/core";
import type { CSSProperties } from "react";

export type PieChartOptions = ComposeOption<
  | TitleComponentOption
  | GridComponentOption
  | PieSeriesOption
  | DatasetComponentOption
  | TooltipComponentOption
>;

use([
  GridComponent,
  TitleComponent,
  PieGraph,
  DatasetComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer, // If you only need to use the canvas rendering mode, the bundle will not include the SVGRenderer module, which is not needed.
]);

export interface PieChartProps {
  theme?: "light" | "dark";
  data: { value: number; name: string }[];
  isLoading?: boolean;
  title?: string;
  style?: CSSProperties;
}

export function PieChart({ theme, data, isLoading, title, style }: PieChartProps): JSX.Element {
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
      const option: PieChartOptions = {
        title: {
          text: title,
          left: "center",
        },
        grid: { bottom: "20%", top: "15%", right: "15%", left: "15%" },
        series: [
          {
            type: "pie",
            radius: "70%",
            data,
            name: "Pie",
          },
        ],
        legend: {
          align: "auto",
          bottom: "1%",
          type: "scroll",
          orient: "horizontal",
        },
      };
      chart?.setOption(option, true);
    }
  }, [data, theme, title]);

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
