import { MetagraphTable } from ".";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "MetagraphTable",
  component: MetagraphTable,
  args: {
    data: [
      {
        neuronID: 1234,
        eachNeuronRank: "1234",
        eachNeuronIncentives: "1234",
        eachNeuronEmission: "1234",
        eachNeuronConsensus: "1234",
        eachNeuronTrust: "1234",
        eachNeuronValidatorTrust: "1234",
        eachNeuronDividends: "1234",
        bonds: "1234",
        eachNeuronWeight: "1234",
        eachNeuronHotKeys: "1234",
        eachNeuronColdKeys: "1234",
      },
    ],
  },
} as Meta<typeof MetagraphTable>;

export const Template: StoryObj<typeof MetagraphTable> = {};
