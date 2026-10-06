// Line 1: Way of the Hunter 2 - Persistent Animal Watchlist & Mortality Monitor
// Stamped: 2026-10-05 21:20 EDT | Version: 2.3.0

export function createWatchlistEntry(name, species, region, fitness, currentAge, maxLifespan) {
  const numericFitness = parseFloat(fitness);
  const age = parseInt(currentAge, 10);
  const maxAge = parseInt(maxLifespan, 10);
  const remainingYears = Math.max(0, maxAge - age);
  const remainingDays = remainingYears * 3;

  return {
    id: "watch_" + Date.now(),
    name: name || "Tracked Target",
    species,
    region,
    fitness: isNaN(numericFitness) ? "N/A" : `${numericFitness.toFixed(1)}%`,
    currentAge: age,
    maxLifespan: maxAge,
    remainingYears,
    remainingDays,
    status: getHarvestStatus(numericFitness, remainingYears),
    alternateZones: []
  };
}

function getHarvestStatus(fitness, remainingYears) {
  if (remainingYears <= 1) {
    return {
      urgency: "CRITICAL",
      message: "Final year! Animal will die of old age soon. Harvest immediately.",
      color: "var(--accent-red)"
    };
  }
  if (fitness >= 85.0) {
    return {
      urgency: "PROTECT / GROW",
      message: "5-star potential. Let age further, but monitor secondary zones.",
      color: "var(--accent-gold)"
    };
  }
  if (fitness < 55.0) {
    return {
      urgency: "CULL",
      message: "Inferior genetics. Remove before year rollover to protect new fawns.",
      color: "var(--accent-red)"
    };
  }
  return {
    urgency: "MONITOR",
    message: "Average herd genetics. Observe antler progression.",
    color: "var(--accent-blue)"
  };
}
