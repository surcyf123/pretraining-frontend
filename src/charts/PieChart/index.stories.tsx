import { PieChart } from ".";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "PieChart",
  component: PieChart,
  args: {
    style: { height: "100vh" },
    data: [
      {
        uid: 46,
        block: 2084700,
        average_loss: 3.4289442965241728,
        win_rate: 0.5508196721311476,
        win_total: 2016,
        weight: 0.0013053265865892172,
      },
      {
        uid: 51,
        block: 2084692,
        average_loss: 3.4289442965241728,
        win_rate: 0.5841530054644809,
        win_total: 2138,
        weight: 0.0030744457617402077,
      },
      {
        uid: 65,
        block: 2084708,
        average_loss: 3.4289442965241728,
        win_rate: 0.5174863387978142,
        win_total: 1894,
        weight: 0.0005542770377360284,
      },
      {
        uid: 132,
        block: 2087190,
        average_loss: 3.4500467171434495,
        win_rate: 0.16038251366120218,
        win_total: 587,
        weight: 6.940052799109253e-8,
      },
      {
        uid: 138,
        block: 2080564,
        average_loss: 3.4532445864599257,
        win_rate: 0.26366120218579236,
        win_total: 965,
        weight: 8.587895194978046e-7,
      },
      {
        uid: 139,
        block: 2084750,
        average_loss: 3.431860190923097,
        win_rate: 0.4092896174863388,
        win_total: 1498,
        weight: 0.00003321433177916333,
      },
      {
        uid: 140,
        block: 2084741,
        average_loss: 3.4310369608832185,
        win_rate: 0.44153005464480877,
        win_total: 1616,
        weight: 0.000085527150076814,
      },
      {
        uid: 141,
        block: 2084732,
        average_loss: 3.430587694293163,
        win_rate: 0.48743169398907105,
        win_total: 1784,
        weight: 0.00021267952979542315,
      },
      {
        uid: 142,
        block: 2080512,
        average_loss: 3.4537315915842526,
        win_rate: 0.4054644808743169,
        win_total: 1484,
        weight: 0.000028123387892264873,
      },
      {
        uid: 143,
        block: 2080503,
        average_loss: 3.4540534019470215,
        win_rate: 0.4546448087431694,
        win_total: 1664,
        weight: 0.00010117534839082509,
      },
      {
        uid: 145,
        block: 2080495,
        average_loss: 3.4552625280911804,
        win_rate: 0.5300546448087432,
        win_total: 1940,
        weight: 0.0008200205629691482,
      },
      {
        uid: 146,
        block: 2080503,
        average_loss: 3.452320128190713,
        win_rate: 0.4882513661202186,
        win_total: 1787,
        weight: 0.00024313076573889703,
      },
      {
        uid: 148,
        block: 2080484,
        average_loss: 3.4541776453862423,
        win_rate: 0.5953551912568306,
        win_total: 2179,
        weight: 0.004939701873809099,
      },
      {
        uid: 149,
        block: 2080475,
        average_loss: 3.4542856216430664,
        win_rate: 0.6278688524590164,
        win_total: 2298,
        weight: 0.010824081487953663,
      },
      {
        uid: 151,
        block: 2080466,
        average_loss: 3.455024291257389,
        win_rate: 0.6647540983606557,
        win_total: 2433,
        weight: 0.025231795385479927,
      },
      {
        uid: 153,
        block: 2080522,
        average_loss: 3.46762306377536,
        win_rate: 0.2751366120218579,
        win_total: 1007,
        weight: 0.0000012145861774115474,
      },
      {
        uid: 154,
        block: 2080458,
        average_loss: 3.455209526859346,
        win_rate: 0.6978142076502732,
        win_total: 2554,
        weight: 0.059809066355228424,
      },
      {
        uid: 155,
        block: 2080449,
        average_loss: 3.453256968592034,
        win_rate: 0.7363387978142076,
        win_total: 2695,
        weight: 0.14882707595825195,
      },
      {
        uid: 156,
        block: 2078893,
        average_loss: 3.4532445864599257,
        win_rate: 0.7666666666666667,
        win_total: 2806,
        weight: 0.35915544629096985,
      },
      {
        uid: 163,
        block: 2080534,
        average_loss: 3.46719886240412,
        win_rate: 0.2087431693989071,
        win_total: 764,
        weight: 2.227987891956218e-7,
      },
      {
        uid: 164,
        block: 2080532,
        average_loss: 3.466986361097117,
        win_rate: 0.24316939890710382,
        win_total: 890,
        weight: 5.723463800677564e-7,
      },
      {
        uid: 171,
        block: 2080516,
        average_loss: 3.453454701626887,
        win_rate: 0.3663934426229508,
        win_total: 1341,
        weight: 0.000011878359146066941,
      },
      {
        uid: 175,
        block: 2084657,
        average_loss: 3.4289442965241728,
        win_rate: 0.7174863387978142,
        win_total: 2626,
        weight: 0.09473027288913727,
      },
      {
        uid: 181,
        block: 2084684,
        average_loss: 3.4289442965241728,
        win_rate: 0.6174863387978142,
        win_total: 2260,
        weight: 0.007242161780595779,
      },
      {
        uid: 189,
        block: 2080503,
        average_loss: 3.453811696318329,
        win_rate: 0.460655737704918,
        win_total: 1686,
        weight: 0.00015438591071870178,
      },
      {
        uid: 191,
        block: 2084683,
        average_loss: 3.4289442965241728,
        win_rate: 0.6508196721311476,
        win_total: 2382,
        weight: 0.017061732709407806,
      },
      {
        uid: 192,
        block: 2080492,
        average_loss: 3.453548644409805,
        win_rate: 0.566120218579235,
        win_total: 2072,
        weight: 0.0020931416656821966,
      },
      {
        uid: 193,
        block: 2084671,
        average_loss: 3.4289442965241728,
        win_rate: 0.6841530054644809,
        win_total: 2504,
        weight: 0.04020041599869728,
      },
      {
        uid: 246,
        block: 2086784,
        average_loss: 3.455841021459611,
        win_rate: 0.16666666666666666,
        win_total: 610,
        weight: 6.868926760716931e-8,
      },
      {
        uid: 253,
        block: 2083367,
        average_loss: 3.4289442965241728,
        win_rate: 0.7508196721311475,
        win_total: 2748,
        weight: 0.22325310111045837,
      },
      {
        uid: 217,
        block: 2087945,
        average_loss: 3.422074052154041,
        win_rate: 0.4103825136612022,
        win_total: 1502,
        weight: 0.000004556708063319093,
      },
    ],
  },
} as Meta<typeof PieChart>;

export const Template: StoryObj<typeof PieChart> = {};
