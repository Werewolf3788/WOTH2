// Line 1: Way of the Hunter 2 - Field Guide & Genetics Advisor Engine
// Stamped: 2026-10-05 20:12 EDT | Version: 1.0.0

export const BloodDiagnostics = {
  pink_oxygenated: {
    label: "Pink with Oxygen Bubbles",
    organ: "Lungs / Heart",
    lethality: "Fatal (Close Recovery)",
    color: "#f472b6"
  },
  dark_crimson: {
    label: "Dark Crimson Red",
    organ: "Liver",
    lethality: "High (Extended Tracking)",
    color: "#881337"
  },
  watery_food: {
    label: "Red with Food Particles",
    organ: "Stomach / Intestines",
    lethality: "Slow Bleed (Long Track Required)",
    color: "#b91c1c"
  },
  light_scratch: {
    label: "Low Volume Red Blood",
    organ: "Superficial Flesh Scratch",
    lethality: "Non-Fatal (Animal May Survive)",
    color: "#ef4444"
  }
};

export function evaluateHerdFitness(percentage) {
  const val = parseFloat(percentage);
  if (isNaN(val)) return { label: "Invalid Input", action: "Enter numeric percentage", status: "neutral" };

  if (val < 55.0) {
    return {
      label: `${val.toFixed(1)}% - Inferior Genetics`,
      action: "CULL IMMEDIATELY. Remove to prevent passing weak genetics to future generations.",
      status: "cull"
    };
  } else if (val >= 55.0 && val < 70.0) {
    return {
      label: `${val.toFixed(1)}% - Moderate Genetics`,
      action: "AVERAGE HERD MEMBER. Allow to age to adult; cull if male trophy potential stalls.",
      status: "monitor"
    };
  } else {
    return {
      label: `${val.toFixed(1)}% - Superior Genetics`,
      action: "DO NOT HARVEST EARLY. Let reach oldest mature age for 5-star trophy potential.",
      status: "protect"
    };
  }
}
