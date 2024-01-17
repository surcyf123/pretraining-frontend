import { IconArrowDown, IconArrowUp } from "@tabler/icons-react";
import { rankItem } from "@tanstack/match-sorter-utils";
import type { FilterFn, SortDirection } from "@tanstack/react-table";

export function getSortingIcon(input: false | SortDirection): JSX.Element | undefined {
  let output: JSX.Element | undefined;
  switch (input) {
    case "asc":
      output = <IconArrowUp />;
      break;
    case "desc":
      output = <IconArrowDown />;
      break;
    default:
      break;
  }
  return output;
}

export const globalFilter: FilterFn<unknown> = (row, columnId, value: string, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({
    itemRank,
  });
  return itemRank.passed;
};
