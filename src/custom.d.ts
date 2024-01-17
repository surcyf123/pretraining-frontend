import type { RankingInfo } from "@tanstack/match-sorter-utils";

interface ResponsiveImageOutput {
  src: string;
  srcSet: string;
  placeholder: string;
  images: { path: string; width: number; height: number }[];
  width: number;
  height: number;
  toString: () => string;
}

declare module "*.jpg" {
  const value: ResponsiveImageOutput;
  export default value;
}

declare module "*.png" {
  const value: ResponsiveImageOutput;
  export default value;
}

declare module "@tanstack/table-core" {
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}
