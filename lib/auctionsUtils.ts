// lib/auctionUtils.ts
export function getLiveSubtypeCounts(
  allAuctionItems: any[],
  subtypes: { value: string; label: string }[]
) {
  const liveSubtypeCounts: Record<string, number> = allAuctionItems
    .filter((item) => item.status === "live")
    .reduce((acc, item) => {
      const subtype = item.auctionsubtype || "unknown";
      acc[subtype] = (acc[subtype] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const subtypesWithCounts = subtypes.map((sub) => ({
    ...sub,
    label:
      sub.value === "all"
        ? sub.label
        : `${sub.label} (${liveSubtypeCounts[sub.value] || 0})`,
  }));

  return subtypesWithCounts;
}
