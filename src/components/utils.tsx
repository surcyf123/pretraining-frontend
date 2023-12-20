import { IconArrowDown, IconArrowUp } from "@tabler/icons-react";
import type { SortDirection } from "@tanstack/react-table";

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
