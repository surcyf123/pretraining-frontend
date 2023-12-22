import { Code, Group, Skeleton, Stack, Text } from "@mantine/core";
import { IconChevronDown, IconChevronUp, IconCurrencyDollar } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { fetchTaoStatistics } from "../../api";

export function TaoStats(): JSX.Element {
  const { data, isRefetching, isLoading } = useQuery({
    queryKey: ["taoStatistics"],
    queryFn: () => fetchTaoStatistics(),
    refetchInterval: 5 * 60 * 1000,
  });

  const priceChangeIn24H = Number.parseFloat(data?.["24h_change"] ?? "");
  const marketCap = Number.parseFloat(data?.market_cap ?? "");
  const volumeIn24H = Number.parseFloat(data?.["24h_volume"] ?? "");
  const circulatingSupply = Number.parseFloat(data?.current_supply ?? "");
  const totalSupply = Number.parseFloat(data?.total_supply ?? "");
  const validatingAPR = Number.parseFloat(data?.validating_apy ?? "");
  const stakingAPR = Number.parseFloat(data?.staking_apy ?? "");

  return (
    <Skeleton visible={(isLoading || isRefetching) ?? false}>
      <Group wrap="nowrap" justify="space-between">
        <Stack align="center">
          <Text size="sm">
            Bittensor price <Code>TAO</Code>
          </Text>
          <Group>
            <IconCurrencyDollar />
            <Text size="lg">{`${data?.price}`}</Text>
            {priceChangeIn24H > 0 ? (
              <IconChevronUp color="green" />
            ) : (
              <IconChevronDown color="red" />
            )}
            <Text component="span" c={priceChangeIn24H > 0 ? "green" : "red"} size="sm">
              {`${priceChangeIn24H}%`}
            </Text>
          </Group>
        </Stack>
        <Stack align="center">
          <Text size="sm">Market Cap</Text>
          <Group>
            <IconCurrencyDollar />
            <Text size="sm">
              {marketCap.toLocaleString(undefined, {
                currency: "usd",
                maximumFractionDigits: 2,
              })}
            </Text>
          </Group>
        </Stack>
        <Stack align="center">
          <Text size="sm">24h Volume</Text>
          <Group gap="xs">
            <IconCurrencyDollar />
            <Text size="sm">
              {volumeIn24H.toLocaleString(undefined, {
                currency: "usd",
                maximumFractionDigits: 2,
              })}
            </Text>
          </Group>
        </Stack>
        <Stack align="center">
          <Text size="sm">Circulating Supply</Text>
          <Group gap="xs">
            <Text size="sm">
              {circulatingSupply.toLocaleString(undefined, {
                currency: "usd",
                maximumFractionDigits: 2,
              })}
              𝞃
            </Text>
          </Group>
        </Stack>
        <Stack align="center">
          <Text size="sm">Total Supply</Text>
          <Group gap="xs">
            <Text size="sm">
              {totalSupply.toLocaleString(undefined, {
                currency: "usd",
                maximumFractionDigits: 2,
              })}
              𝞃
            </Text>
          </Group>
        </Stack>
        <Stack align="center">
          <Text size="sm">Validating APR</Text>
          <Group gap="xs">
            <Text size="sm">{validatingAPR}%</Text>
          </Group>
        </Stack>
        <Stack align="center">
          <Text size="sm">Staking APR</Text>
          <Group gap="xs">
            <Text size="sm">{stakingAPR}%</Text>
          </Group>
        </Stack>
      </Group>
    </Skeleton>
  );
}
