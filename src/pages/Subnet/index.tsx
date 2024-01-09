import { useParams } from "react-router-dom";

export function Subnet(): JSX.Element {
  const { subnet } = useParams<{ subnet: string }>(); // Ref: https://reactrouter.com/en/main/hooks/use-params

  return <>Subnet {subnet}</>;
}
