import { Skeleton } from "@mantine/core";
import { useRef } from "react";
import type { CSSProperties } from "react";

export interface CandleStickChartProps {
  style?: CSSProperties;
  loading?: boolean;
}

export function CandleStickChart({ style, loading }: CandleStickChartProps): JSX.Element {
  const chartRef = useRef<HTMLDivElement>(null);
  return (
    <Skeleton visible={loading ?? false}>
      <div ref={chartRef} style={{ height: "100%", width: "100%", ...style }} />
    </Skeleton>
  );
}
