# Way of the Hunter 2 Companion & Herd Tracker

A community-driven, open-source companion dashboard and herd genetics tracker for **Way of the Hunter 2**. 

Designed for both field use and dual-screen workflow on PC, PlayStation 5, and Xbox Series X|S. This tool lets players track herd fitness, log need zones, diagnose blood trails, and reference weapon ethics without complex build environments.

---

## 🌟 Key Features

* **Multi-Tenant Hunter Profiles:** Sign in with Google to create an isolated personal hunting journal stored in Firebase Realtime Database. Guest mode automatically falls back to `localStorage` with offline write-protection.
* **Isolated Regional Genetics Engine:** Full mapping of New Laurentia's 7 distinct regions (Wetiko Foothills, Slalakum Shore, Thunderbird Muskeg, Jackalope Cordillera, Kermode Plateau, Lake Sasquatch, Mishipeshu Swamp), reflecting independent regional herd fitness calculations.
* **Decimal Fitness & Culling Advisor:** Evaluate exact in-game fitness percentages (e.g., 53.8% vs. 78.8%+) with instant culling recommendations (Cull Immediately, Average Herd Member, or Protected Trophy Breeder).
* **Hit Blood Diagnostics:** Rapid field evaluation for vital hits, liver damage, digestive tract perforations, and non-fatal flesh scratches.
* **Complete Campaign & Task Trackers:**
  * **33 Story & Local Missions:** Full objectives, contacts (Angel, Mikael, Juniper, Regina, Patrick), and payouts.
  * **32 Habitat Enhancements:** Detailed costs and requirements for repairing bridges, clearing boulder passages, installing feeders, and treating polluted waters.
* **Weapon & Caliber Ethics Guide:** Tier 1 through Tier 8 ethical weapon recommendations, covering everything from .22 LR small game to .375 magnum dangerous game.

---

## 📁 Repository Structure

```text
├── data/
│   ├── infrastructure.json  # All 32 enhancement costs, bridge repairs, & feeder tasks
│   ├── missions.json        # All 33 campaign and campsite mission objectives & rewards
│   ├── regions.json         # 7 New Laurentia regions, NPCs, and genetic isolation rules
│   └── species.json         # 15 native launch species, tiers (1–8), and regional distribution
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
