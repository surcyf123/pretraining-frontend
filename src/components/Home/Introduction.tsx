import { List, Stack, Text, Title } from "@mantine/core";
import { AboutData } from "../../sample-data/about";

export function Introduction(): JSX.Element {
  return (
    <Stack>
      <Title order={1}>{AboutData.introTitle}</Title>
      <Text c="gray.6">{AboutData.introDescription}</Text>
      <List mt="lg" spacing="xs" size="sm">
        {AboutData.introList.map((item: string) => (
          <List.Item key={item}>{item}</List.Item>
        ))}
      </List>
    </Stack>
  );
}
