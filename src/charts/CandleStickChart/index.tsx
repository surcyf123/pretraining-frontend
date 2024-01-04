import { Skeleton } from "@mantine/core";
import { init } from "echarts/core";
import { useEffect, useRef } from "react";
import type { ECharts } from "echarts/core";
import type { CSSProperties } from "react";

export interface CandleStickChartProps {
  style?: CSSProperties;
  loading?: boolean;
  theme?: "light" | "dark";
}

export function CandleStickChart({ style, loading, theme }: CandleStickChartProps): JSX.Element {
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

  return (
    <Skeleton visible={loading ?? false}>
      <div ref={chartRef} style={{ height: "100%", width: "100%", ...style }} />
    </Skeleton>
  );
}
