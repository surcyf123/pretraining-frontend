import { Code, Group, Skeleton, Stack, Text } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { fetchTaoPriceChangeStatistics } from "../../api";

export function TaoStats(): JSX.Element {
  const { data, isLoading } = useQuery({
    queryKey: ["taoPriceChangeStatistics"],
    queryFn: () => fetchTaoPriceChangeStatistics(),
    refetchInterval: 5 * 60 * 1000,
  });

  const priceChangePercent = data?.priceChange ?? 0;

  return (
    <Skeleton visible={isLoading}>
      <Group wrap="nowrap" justify="space-between">
        <Stack align="center">
          <Text size="sm">
            Bittensor price <Code>TAO</Code>
          </Text>
          <Group>
            <Text size="lg">
              {data?.askPrice.toLocaleString(undefined, {
                style: "currency",
                currency: "usd",
              })}
            </Text>
            {priceChangePercent > 0 ? (
              <IconChevronUp color="green" />
            ) : (
              <IconChevronDown color="red" />
            )}
            <Text component="span" c={priceChangePercent > 0 ? "green" : "red"} size="sm">
              {priceChangePercent.toLocaleString(undefined, {
                style: "percent",
                maximumFractionDigits: 2,
              })}
            </Text>
          </Group>
        </Stack>
        <Stack align="center">
          <Text size="sm">Volume</Text>
          <Text size="lg">
            {data?.volume.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </Text>
        </Stack>
        <Stack align="center">
          <Text size="sm">Quote Volume</Text>
          <Text size="lg">
            {data?.quoteVolume.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </Text>
        </Stack>
        <Stack align="center">
          <Text size="sm">Open Price</Text>
          <Text size="lg">
            {data?.openPrice.toLocaleString(undefined, {
              currency: "usd",
              style: "currency",
              maximumFractionDigits: 2,
            })}
          </Text>
        </Stack>
        <Stack align="center">
          <Text size="sm">High Price</Text>
          <Text size="lg">
            {data?.highPrice.toLocaleString(undefined, {
              currency: "usd",
              style: "currency",
              maximumFractionDigits: 2,
            })}
          </Text>
        </Stack>
        <Stack align="center">
          <Text size="sm">Low Price</Text>
          <Text size="lg">
            {data?.lowPrice.toLocaleString(undefined, {
              currency: "usd",
              style: "currency",
              maximumFractionDigits: 2,
            })}
          </Text>
        </Stack>
      </Group>
    </Skeleton>
  );
}
