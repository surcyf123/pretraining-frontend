import { useParams } from "react-router-dom";

export function Subnet(): JSX.Element {
  const { netuid } = useParams<{ netuid: string }>();
  return <>subnet {netuid}</>;
}
