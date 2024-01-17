import { useMantineColorScheme } from "@mantine/core";
import { useEffect, useRef, memo } from "react";

function TradingViewWidget(): JSX.Element {
  const container = useRef<HTMLDivElement | null>(null);
  const { colorScheme } = useMantineColorScheme();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "autosize": true,
          "symbol": "MEXC:TAOUSDT",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": ${colorScheme === "auto" ? "dark" : colorScheme},
          "style": "2",
          "locale": "in",
          "enable_publishing": false,
          "allow_symbol_change": true,
          "support_host": "https://www.tradingview.com"
        }`;
    container.current?.appendChild(script);
  }, [colorScheme]);

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{ height: "100%", width: "100%" }}
    >
      <div
        className="tradingview-widget-container__widget"
        style={{ height: "calc(100% - 32px)", width: "100%" }}
      />
      <div className="tradingview-widget-copyright">
        <a href="https://in.tradingview.com/" rel="noopener nofollow noreferrer" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
}

export const MemoizedTradingViewWidget = memo(TradingViewWidget);
