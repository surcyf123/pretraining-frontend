import { MetagraphTable } from ".";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "MetagraphTable",
  component: MetagraphTable,
  args: {
    data: [
      {
        neuronID: 1234,
        neuronRank: "1234",
        neuronIncentives: "1234",
        neuronEmission: "1234",
        neuronConsensus: "1234",
        neuronTrust: "1234",
        neuronValidatorTrust: "1234",
        neuronDividends: "1234",
        bonds: "1234",
        neuronWeight: "1234",
        neuronHotKeys: "1234",
        neuronColdKeys: "1234",
      },
    ],
  },
} as Meta<typeof MetagraphTable>;

export const Template: StoryObj<typeof MetagraphTable> = {};
