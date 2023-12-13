export const PropertiesDictionary = {
  minLoss: "Min loss",
  averageLoss: "Average loss",
  bestUID: "Best UID",
  averageVTrust: "Average Vtrust",
  subnetEmission: "Subnet Emission",
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type PropertiesDictionary = typeof PropertiesDictionary;
