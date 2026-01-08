# 🎯 CS2-GSI-Z

![License](https://img.shields.io/badge/license-MIT-green)
![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen)
![Status](https://img.shields.io/badge/status-active-blue)


> A modern, modular, and event-driven Game State Integration (GSI) handler for **Counter-Strike 2**, built with Node.js.

---

## 📖 Project Overview

`cs2-gsi-z` is an advanced event processing library for Counter-Strike 2 Game State Integration (GSI) data.
It transforms raw GSI JSON updates into high-level, context-aware events, enabling developers to easily build real-time HUDs, dashboards, analytics systems, bots, or esports tools.

Unlike traditional GSI listeners that emit low-level or noisy data, `cs2-gsi-z` structures and simplifies information, significantly reducing client-side complexity.

---

## ✨ Why CS2-GSI-Z?

> “There are other GSI tools... why use this one?”

| Feature                          | CS2-GSI-Z | Traditional GSI Handlers |
|----------------------------------|:---------:|:-----------------------:|
| Built for CS2 from scratch       | ✅        | ❌ (often CS:GO ports)  |
| Modular differ-based architecture| ✅        | ❌ (monolithic parsing) |
| Delta (`previously`/`added`) support| ✅      | ❌                   |
| Granular, high-level events       | ✅        | ❌ (raw dumps)         |
| Dynamic differ extension         | ✅        | ❌                   |


Whether you're building a companion HUD, tournament backend, stream overlay, or an esports analytics dashboard — **this is the toolkit designed for you**.

---

## 🚀 Key Features

- **🌟 Structured, Context-Aware Events**  
  > **Problem Solved:** No need to manually parse complex GSI dumps.
  > **Benefit:** Focus immediately on meaningful gameplay changes.

- **🧩 Modular Differ System**  
  > **Problem Solved:** Avoids tangled monolithic update handlers.
  > **Benefit:** Easier maintenance, faster extension, safer upgrades.

- **✨ Delta-Aware Processing**  
  > **Problem Solved:** Deep-cloning and manual patching are error-prone.
  > **Benefit:** Fast, reliable diff calculation with minimal memory footprint.

- **🔀 Dynamic Diff Manager**  
  > **Problem Solved:** Hardcoding all diffs upfront limits flexibility.
  > **Benefit:** Extend or replace behaviors easily at runtime.

- **🎯 Flexible Event Subscription**  
  > **Problem Solved:** Handling noisy events on the client.
  > **Benefit:** Listen only to what matters, improving performance.

- **💪 Optimized for Real-Time Systems**  
  > **Problem Solved:** Raw GSI processing can cause lags or instability.
  > **Benefit:** Low-latency, high-frequency event handling.


---

## 🚀 Quick Start

### Prerequisites

To receive data from CS2, you must set up a Game State Integration (GSI) configuration file.
*Reference:  [Valve Developer Wiki — Game State Integration](https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive_Game_State_Integration)*


Or you can simply generate a valid GSI configuration file automatically using the included helper in this library:

```javascript
import { GSIConfigWriter } from 'cs2-gsi-z';

// Generate the config file on your desktop
const configPath = GSIConfigWriter.generate({
  name: 'cs2-gsi-z',
  uri: 'http://localhost:3000'
});

console.log(`Config file created at: ${configPath}`);
```
*Remember to move the generated **.cfg** file to your CS2 cfg directory*

### Installation

```bash
npm install cs2-gsi-z
```



### Basic Usage

```javascript
import { GsiService, EVENTS } from 'cs2-gsi-z';

const gsi = new GsiService({
  httpPort: 3000
});

gsi.start();

gsi.on(EVENTS.player.weaponChanged, (payload) => {
  console.log(`weapon changed:`, payload);
});
```

---

## 📈 Event Model

When a new GSI payload is received, `cs2-gsi-z`:

1. 🔄 Applies delta changes efficiently.
2. 🔀 Detects relevant modifications via differs.
3. 💪 Emits structured, context-aware events.

Each emitted event includes:

```javascript
{
  previous: <previous value>,
  current: <current value>,
  previouslyBlock: <raw previous GSI block>,
  addedBlock: <raw new GSI block>
}
```

---

## 🔖 Supported Events

**Player:** `hpChanged`, `armorChanged`, `teamChanged`, `weaponChanged`, `activityChanged`, `helmetChanged`, `flashedChanged`, `smokedChanged`, `burningChanged`, `killsChanged`, `deathsChanged`, `assistsChanged`, `scoreChanged`

**Round:** `phaseChanged`, `started`, `ended`, `won`

**Map:** `nameChanged`, `phaseChanged`, `roundChanged`, `teamCTScoreChanged`, `teamTScoreChanged`

(Some of them are not yet implemented, but you can easily do it)

---

## 🔢 Differs and Diff Manager

Each differ handles one domain: player, round, map, etc.

The `DifferManager`:
- Manages active differs
- Calls them on each GSI update
- Emits clean events when changes are detected

> Extend or replace differs without touching core functionality.

---

## 🎯 Extending with Custom Differs

Register your own differ easily:

```javascript
const customDiffer = {
  diff(prev, curr, emitter) {
    const p = prev?.map?.team_t;
    const c = curr.map?.team_t;
    if (p && c && p.score !== c.score) {
      emitter.emit('map:teamTScoreChanged', { previous: p.score, current: c.score });
    }
  }
};

gsi.differManager.registerDiffer(customDiffer);
```

---

## 🔍 Advanced Event Subscription

Subscribe to:
- Specific event (`player:hpChanged`)
- Whole namespace (`player:*`)

```javascript
gsi.on('player:*', (eventName, payload) => {
  console.log(`[Player Event] ${eventName}:`, payload);
});
```

---

## 🔹 Examples

### Log Health Changes
```javascript
gsi.on('player:hpChanged', ({ previous, current }) => {
  console.log(`HP: ${previous} → ${current}`);
});
```

### Log Map Changes
```javascript
gsi.on('map:nameChanged', ({ previous, current }) => {
  console.log(`Map: ${previous} → ${current}`);
});
```

---

## 🌐 Use Cases

- 🏋️ Live HUDs for players and spectators
- 🌍 Stream overlays with real-time updates
- 📊 Tournament backends and dashboards
- 👾 Automated bots reacting to events
- 📘 Esports analytics and match reviews
- 💪 Coaching and training tools


---

## 🔹 Requirements

- **Node.js** v18+
- Support for `async/await`, optional chaining (`?.`), and ES Modules.

---

## 🧳 Contributing

Pull requests, ideas, and feedback are welcome!
If you are using `cs2-gsi-z` for your tools, streams, or projects, feel free to share and contribute back.

---

## 🙏 Acknowledgments

• Valve Corporation for the CS Game State Integration API

• CS community for inspiration and feedback

---

## 🔒 License

Distributed under the **MIT License**. See [LICENSE](./LICENSE) for full text.





_*Made with ❤️ for the CS2 community*_
