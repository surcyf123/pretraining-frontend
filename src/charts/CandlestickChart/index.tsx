import { Skeleton } from "@mantine/core";
import { getInstanceByDom, init } from "echarts/core";
import { useEffect, useRef } from "react";
import type {
  TitleComponentOption,
  GridComponentOption,
  DataZoomComponentOption,
} from "echarts/components";
import type { ECharts, ComposeOption } from "echarts/core";
import type { CSSProperties } from "react";

use([
  CanvasRenderer, // If you only need to use the canvas rendering mode, the bundle will not include the SVGRenderer module, which is not needed.
]);

export interface CandleStickChartProps {
  style?: CSSProperties;
  loading?: boolean;
  theme?: "light" | "dark";
  title?: string;
  xAxisTitle?: string;
  xAxis: string;
  yAxisTitle?: string;
  yAxis: string;
}

type CandleStickChartOptions = ComposeOption<
  TitleComponentOption | GridComponentOption | DataZoomComponentOption
>;

export function CandleStickChart({
  style,
  loading,
  theme,
  title,
  xAxis,
  xAxisTitle,
  yAxis,
  yAxisTitle,
}: CandleStickChartProps): JSX.Element {
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
      const option: CandleStickChartOptions = {
        title: {
          text: title,
          left: "center",
        },
        textStyle: {
          fontFamily: "Space Mono, Courier, monospace",
        },
        grid: { bottom: "25%", top: "15%", right: "5%", left: "5%" },
        dataZoom: [
          {
            type: "inside",
            filterMode: "none", // Ref: https://stackoverflow.com/questions/53187396/echarts-line-dissapear-when-zooming-in
            xAxisIndex: 0,
          },
        ],
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
        // TODO: add series and dataset
      };
      chart?.setOption(option, true);
    }
  }, [title, theme, xAxisTitle, xAxis, yAxisTitle, yAxis]);

  return (
    <Skeleton visible={loading ?? false}>
      <div ref={chartRef} style={{ height: "100%", width: "100%", ...style }} />
    </Skeleton>
  );
}
