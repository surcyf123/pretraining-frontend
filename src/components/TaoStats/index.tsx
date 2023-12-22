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
                minimumFractionDigits: 2,
              })}
            </Text>
          </Group>
        </Stack>
      </Group>
    </Skeleton>
  );
}
