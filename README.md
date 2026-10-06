# Way of the Hunter 2 Companion & Ecosystem Engine

A community-driven, open-source companion dashboard and ecosystem tracker for **Way of the Hunter 2**.

Designed for field use and dual-screen workflow on PC, PlayStation 5, and Xbox Series X|S. This tool lets players track herd fitness, log seasonal trails, monitor natural mortality clocks, and calculate ethical caliber pairings with zero build steps.

---

## 🌟 Key Features

* **Biological Mortality & Lifecycle Clock:** Tracks the 3-day in-game year lifecycle across all 15 native launch species. Features early-warning timers to ensure 5-star trophy animals are harvested before they die of old age and despawn permanently.
* **Seasonal Migration & Grazing Corridors:** Toggle between Summer high-elevation paths and Winter lowland valley corridors. Track cloven hoof V-splits to intercept moving herds in broad grazing zones.
* **Regional Population Stewardship:** Monitor the 5-tier health rating (Critical to Thriving) across New Laurentia's 7 sectors. Keep track of culling quotas and environmental remediation tasks (feeders, clean lakes, invasive weed eradication).
* **Multi-Tenant Cloud Sync:** Sign in with Google to manage personal private pins and harvest logs stored directly in Firebase Realtime Database. Guest mode automatically falls back to write-protected `localStorage`.
* **Hit Blood Diagnostics:** Instant field evaluation for vital oxygenated bubbles, liver crimson blood, digestive tract food spatter, and superficial flesh scratches.
* **33 Story Missions & 32 Infrastructure Tasks:** Complete breakdown of NPC objectives, cash payouts, bridge repair costs, and hunting stand construction requirements.

---

## 📁 Repository Structure

```text
├── data/
│   ├── infrastructure.json  # All 32 enhancement costs, bridge repairs, & feeder tasks
│   ├── lifecycles.json      # Lifespans, aging stages, & mortality despawn rules
│   ├── missions.json        # 33 campaign and campsite mission objectives & rewards
│   ├── regions.json         # 7 New Laurentia regions, NPCs, & genetic isolation rules
│   ├── species.json         # 15 native species, tiers (1–8), & regional distribution
│   ├── stewardship.json     # Regional health metrics, culling quotas, & habitat tiers
│   └── trails.json          # Summer/Winter migration paths & grazing corridors
├── assets/
│   ├── css/
│   │   └── style.css        # Sleek, high-contrast dark theme
│   └── js/
│       ├── advisor.js       # Decimal fitness engine & blood diagnostic evaluator
│       ├── auth.js          # Google authentication & profile provisioning
│       ├── config.js        # Firebase configuration & database references
│       └── tracker.js       # Live marker logging & write-protection gate
├── index.html               # Single-page web dashboard (runs natively in-browser)
├── CONTRIBUTING.md          # Guide for adding need zones and verifying patch updates
├── LICENSE                  # MIT License
└── README.md
