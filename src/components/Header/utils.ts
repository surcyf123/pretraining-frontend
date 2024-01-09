interface HeaderLinksProps {
  link: string;
  label: string;
  links?: { label: string; link: string }[];
}

//  dummy test: TODO: remove this while writing real tests
export function sum(a: number, b: number) {
  return a + b;
}

const SubnetsData: HeaderLinksProps["links"] = [
  {
    label: "00: Root",
    link: "subnet/0",
  },
  {
    label: "01: Text Prompting",
    link: "subnet/1",
  },
  {
    label: "02: Machine Transation",
    link: "subnet/2",
  },
  {
    label: "03: Data Scraping",
    link: "subnet/3",
  },
  {
    label: "04: Multi Modality",
    link: "subnet/4",
  },
  {
    label: "05: Image Generation",
    link: "subnet/5",
  },
  {
    label: "06: Unknown",
    link: "subnet/6",
  },
  {
    label: "07: Storage",
    link: "subnet/7",
  },
  {
    label: "08: Time Series Prediction",
    link: "subnet/8",
  },
  {
    label: "09: Pretraining",
    link: "subnet/9",
  },
  {
    label: "10: Map Reduce",
    link: "subnet/10",
  },

  {
    label: "11: Text Training",
    link: "subnet/11",
  },
  {
    label: "12: Unknown",
    link: "subnet/12",
  },
  {
    label: "13: Dataverse",
    link: "subnet/13",
  },
  {
    label: "14: LLM Defender",
    link: "subnet/14",
  },
  {
    label: "15: Blockchain Insights",
    link: "subnet/15",
  },
  {
    label: "16: Audio",
    link: "subnet/16",
  },
  {
    label: "17: Petal",
    link: "subnet/17",
  },
  {
    label: "18: Cortex.t",
    link: "subnet/18",
  },
  {
    label: "19: Vision",
    link: "subnet/19",
  },
  {
    label: "20: Unknown",
    link: "subnet/20",
  },
  {
    label: "21: Filetao",
    link: "subnet/21",
  },

  {
    label: "22: Unknown",
    link: "subnet/22",
  },
  {
    label: "23: Prime-Net",
    link: "subnet/23",
  },
  {
    label: "24: Unknown",
    link: "subnet/24",
  },
  {
    label: "25: Bitcurrent",
    link: "subnet/25",
  },
  {
    label: "26: Image Alchemy",
    link: "subnet/26",
  },
  {
    label: "27: Compute",
    link: "subnet/27",
  },
  {
    label: "28: ZK Tensor",
    link: "subnet/28",
  },
  {
    label: "29: 3D Gen",
    link: "subnet/29",
  },
  {
    label: "30: Lovelace",
    link: "subnet/30",
  },
  {
    label: "31: Game of Life",
    link: "subnet/31",
  },
  {
    label: "32: Roleplay",
    link: "subnet/32",
  },
];

export const NavLinks: HeaderLinksProps[] = [
  {
    link: "/",
    label: "Home",
  },
  {
    link: "/general",
    label: "General",
  },
  {
    link: "/dashboard",
    label: "Dashboard",
  },
  {
    link: "/",
    label: "Subnets",
    links: SubnetsData,
  },
];
