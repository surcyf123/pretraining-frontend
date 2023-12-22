import { Code, Group, Skeleton, Stack, Text } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { fetchTaoStatistics } from "../../api";

export function TaoStats(): JSX.Element {
  const { data, isLoading } = useQuery({
    queryKey: ["taoStatistics"],
    queryFn: () => fetchTaoStatistics(),
    refetchInterval: 5 * 60 * 1000,
  });

  const price = Number.parseFloat(data?.price ?? "");
  const priceChangeIn24H = Number.parseFloat(data?.["24h_change"] ?? "");
  const marketCap = Number.parseFloat(data?.market_cap ?? "");
  const volumeIn24H = Number.parseFloat(data?.["24h_volume"] ?? "");
  const circulatingSupply = Number.parseFloat(data?.current_supply ?? "");
  const totalSupply = Number.parseFloat(data?.total_supply ?? "");
  const validatingAPR = Number.parseFloat(data?.validating_apy ?? "");
  const stakingAPR = Number.parseFloat(data?.staking_apy ?? "");

  return (
    <Skeleton visible={isLoading}>
      <Group wrap="nowrap" justify="space-between">
        <Stack align="center">
          <Text size="sm">
            Bittensor price <Code>TAO</Code>
          </Text>
          <Group>
            <Text size="lg">
              {price.toLocaleString(undefined, {
                style: "currency",
                currency: "usd",
              })}
            </Text>
            {priceChangeIn24H > 0 ? (
              <IconChevronUp color="green" />
            ) : (
              <IconChevronDown color="red" />
            )}
            <Text component="span" c={priceChangeIn24H > 0 ? "green" : "red"} size="sm">
              {(priceChangeIn24H / 100).toLocaleString(undefined, {
                style: "percent",
                maximumFractionDigits: 2,
              })}
            </Text>
          </Group>
        </Stack>
        <Stack align="center">
          <Text size="sm">Market Cap</Text>
          <Text size="lg">
            {marketCap.toLocaleString(undefined, {
              currency: "usd",
              style: "currency",
              maximumFractionDigits: 2,
            })}
          </Text>
        </Stack>
        <Stack align="center">
          <Text size="sm">24h Volume</Text>
          <Text size="lg">
            {volumeIn24H.toLocaleString(undefined, {
              currency: "usd",
              style: "currency",
              maximumFractionDigits: 2,
            })}
          </Text>
        </Stack>
        <Stack align="center">
          <Text size="sm">Circulating Supply</Text>
          <Text size="lg">
            {circulatingSupply.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
            𝞃
          </Text>
        </Stack>
        <Stack align="center">
          <Text size="sm">Total Supply</Text>
          <Text size="lg">
            {totalSupply.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
            𝞃
          </Text>
        </Stack>
        <Stack align="center">
          <Text size="sm">Validating APR</Text>
          <Text size="lg">
            {(validatingAPR / 100).toLocaleString(undefined, {
              style: "percent",
              maximumFractionDigits: 2,
            })}
          </Text>
        </Stack>
        <Stack align="center">
          <Text size="sm">Staking APR</Text>
          <Text size="lg">
            {(stakingAPR / 100).toLocaleString(undefined, {
              style: "percent",
              maximumFractionDigits: 2,
            })}
          </Text>
        </Stack>
      </Group>
    </Skeleton>
  );
}
