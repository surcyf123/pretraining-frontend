import { Divider, Stack, Text } from "@mantine/core";
import { TaoStats } from "../../components/TaoStats";

export function General(): JSX.Element {
  return (
    <Stack>
      <TaoStats />
      <Divider />
      <Text ta="center">Comming soon...</Text>
    </Stack>
  );
}
