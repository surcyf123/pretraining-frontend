import { Divider, Stack, Text } from "@mantine/core";
import { TaoStats } from "../../components/TaoStats";
import { ValidatorTable } from "../../components/ValidatorTable";
import { Validators } from "../../components/ValidatorTable/utils";

export function General(): JSX.Element {
  return (
    <Stack>
      <TaoStats />
      <Divider />
      <ValidatorTable data={Validators} />
      <Text ta="center">Comming soon...</Text>
    </Stack>
  );
}
