// Line 1: Way of the Hunter 2 - Database Seed Script
// Stamped: 2026-10-05 19:56 EDT | Target: /woth2_data | Version: 1.0.0

const https = require("https");

const RTDB_URL = "https://entertainment-71888-default-rtdb.firebaseio.com/woth2_data.json";

const seedData = {
  reserves: {
    new_laurentia: {
      id: 42,
      name: "New Laurentia",
      region: "Canada",
      bounds: [-180, -85, 180, 61],
      center: [0, -12],
      minZoom: 0,
      maxZoom: 7,
      bgColor: "#b2dbf6",
      tileUrl: "https://shackmaps-prod-media.s3.us-east-2.amazonaws.com/media/shackmaps-way-of-the-hunter-2-v01.webp",
      locations: {
        lodge: { count: 1, name: "Whitetail Foothills Main Lodge" },
        cabins: { count: 3 },
        campsites: { count: 16 },
        stations: { count: 3 },
        hunting_stands: { count: 10 },
        shooting_range: { count: 1 }
      },
      infrastructure: {
        damaged_bridges: { count: 9, repairCostAvg: 2100 },
        boulder_obstructions: { count: 2, repairCostAvg: 2200 },
        fallen_trees: { count: 1, repairCost: 2640 },
        habitat_enhancements: { count: 12, cost: 2355 },
        invasive_plants: { count: 2, cleanupCost: 3015 },
        polluted_lakes: { count: 1, cleanupCost: 5670 }
      }
    },
    kilimaya: {
      id: 69,
      name: "Kilimaya Reserve",
      region: "Africa",
      bounds: [-180, -85, 180, 85],
      center: [0, 0],
      minZoom: 0,
      maxZoom: 5,
      bgColor: "#bcb56a",
      locations: {
        lodge: { count: 1, name: "Mamlambo Heights Lodge" },
        cabins: { count: 3 },
        campsites: { count: 20 }
      }
    }
  },
  species: {
    new_laurentia: [
      { name: "White-Tailed Deer", zones: 373, ethicalClass: "6.5mm / .30-06" },
      { name: "Rocky Mountain Mule Deer", zones: 337, ethicalClass: "6.5mm / .30-06" },
      { name: "Rocky Mountain Elk", zones: 220, ethicalClass: ".30-06 / .300 Win Mag" },
      { name: "Western Moose", zones: 250, ethicalClass: ".300 Win Mag / .338 Lapua" },
      { name: "Wood Bison", zones: 360, ethicalClass: ".338 Lapua / .375 Mag" },
      { name: "Northwestern Wolf", zones: 413, ethicalClass: "6.5mm / .30-06" },
      { name: "Grizzly Bear", zones: 91, ethicalClass: ".300 Win Mag / .338 Lapua" },
      { name: "Dall Sheep", zones: 412, ethicalClass: "6.5mm / .270" },
      { name: "Central European Boar", zones: 315, ethicalClass: "6.5mm / .30-06" },
      { name: "Eastern Wild Turkey", zones: 279, ethicalClass: ".22 LR / Shotgun" },
      { name: "Mallard", zones: 251, ethicalClass: "Shotgun / .22 LR" },
      { name: "Snowshoe Hare", zones: 150, ethicalClass: ".22 LR" },
      { name: "American Wolverine", zones: 130, ethicalClass: "6.5mm / .243" },
      { name: "White-Tailed Ptarmigan", zones: 130, ethicalClass: ".22 LR / Shotgun" },
      { name: "Rocky Mountain Pronghorn", zones: 21, ethicalClass: "6.5mm / .243" }
    ]
  }
};

const payload = JSON.stringify(seedData);

const req = https.request(RTDB_URL, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(payload)
  }
}, (res) => {
  let responseData = "";
  res.on("data", (chunk) => responseData += chunk);
  res.on("end", () => {
    console.log("Firebase RTDB successfully updated! Response code:", res.statusCode);
  });
});

req.on("error", (e) => console.error("Error seeding RTDB:", e));
req.write(payload);
req.end();
