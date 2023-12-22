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
      </Group>
    </Skeleton>
  );
}
