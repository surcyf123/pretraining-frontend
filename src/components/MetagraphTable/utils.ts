export function calculateRewards(emission: number): number {
  return (emission * 72) / 1000000000;
}
