# 🎯 CS2-GSI-Z

![License](https://img.shields.io/badge/license-MIT-green)
![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen)
![Status](https://img.shields.io/badge/status-active-blue)


> A modern, modular, and event-driven Game State Integration (GSI) handler for **Counter-Strike 2**, built with bun.sh and intercompatible with Node.js.

---

## 📖 Project Overview

`cs2-gsi-z` is an advanced event processing library for Counter-Strike 2 Game State Integration (GSI) data.
It transforms raw GSI JSON updates into high-level, context-aware events, enabling developers to easily build real-time HUDs, dashboards, analytics systems, bots, or esports tools.

Unlike traditional GSI listeners that emit low-level or noisy data, `cs2-gsi-z` structures and simplifies information, significantly reducing end-developer complexity.

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

```ts
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
bun add cs2-gsi-z
```

### Basic Usage

```ts
import { GsiService, EVENTS } from 'cs2-gsi-z';

const gsiService = new GsiService({
  httpPort: 3000
});

gsiService.start();

gsiService.on(EVENTS.player.weaponChanged, (payload) => {
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

```ts
{
  previous: <previous value>,
  current: <current value>
}
```

---

## 🔖 Supported Events

**Provider:** `nameChanged`, `timestampChanged`

**Map:** `nameChanged`, `phaseChanged`, `roundChanged`, `teamCTScoreChanged`, `teamTScoreChanged`, `currentSpectatorsChanged`, `souvenirsTotalChanged`, `roundWinsChanged`

**Round:** `phaseChanged`, `started`, `ended`, `won`

**Player:** `nameChanged`, `clanChanged`, `xpOverloadLevelChanged`, `steamidChanged`, `teamChanged`, `activityChanged`, `observerSlotChanged`, `spectargetChanged`, `positionChanged`, `forwardDirectionChanged`, `hpChanged`, `armorChanged`, `helmetChanged`, `flashedChanged`, `smokedChanged`, `burningChanged`, `moneyChanged`, `equipmentValueChanged`, `weaponChanged`, `ammoClipChanged`, `ammoReserveChanged`, `killsChanged`, `deathsChanged`, `assistsChanged`, `scoreChanged`, `mvpsChanged`

**PhaseCountdowns:** `phaseChanged`, `phaseEndsInChanged`

**AllPlayers:** `joined`, `left`, `teamChanged`, `observerSlotChanged`, `positionChanged`, `forwardDirectionChanged`, `hpChanged`, `armorChanged`, `helmetChanged`, `flashedChanged`, `smokedChanged`, `burningChanged`, `moneyChanged`, `equipmentValueChanged`, `weaponChanged`, `ammoClipChanged`, `ammoReserveChanged`, `killsChanged`, `deathsChanged`, `assistsChanged`, `scoreChanged`, `mvpsChanged`

**Bomb:** `stateChanged`, `positionChanged`, `playerChanged`

**Grenades:** `existenceChanged`, `positionChanged`, `velocityChanged`, `lifetimeChanged`, `effectTimeChanged`, `flamesChanged`

You can further implement your own differs, with the below DifferBase class.

You can also subscribe to specific players or grenades by using the `@` symbol in the event name followed by the players SteamID64/grenades ID.

---

## 🔢 Differs and Diff Manager

Each differ handles one domain: map, round, player, etc.

The `DifferManager`:
- Manages active differs
- Calls them on each GSI update
- Emits clean events when changes are detected

> Extend or replace differs without touching core functionality.

---

## 🎯 Extending with Custom Differs

Register your own differ easily:

```ts
class customDiffer extends DifferBase<Map> {
  diff(prev, curr, emitter, options?) {
    const p = prev?.map?.team_t;
    const c = curr.map?.team_t;
    if (p && c && p.score !== c.score) {
      emitter.emit('map:teamTScoreChanged', { previous: p.score, current: c.score });
    }
  }
};

gsiService.differManager.registerDiffer(new customDiffer);
```

---

## 🔹 Examples

### Log Health Changes
```ts
gsiService.on('player:hpChanged', ({ previous, current }) => {
  console.log(`HP: ${previous} → ${current}`);
});
```

### Log Map Changes
```ts
gsiService.on('map:nameChanged', ({ previous, current }) => {
  console.log(`Map: ${previous} → ${current}`);
});
```

### Log bomb state changes
```ts
gsiService.on('bomb:stateChanged', ({ previous, current }) => {
  if (current === BombState.Defusing) {
    console.log(`Bomb is being defused!`);
  }

  if (current === BombState.Planting) {
    console.log(`Bomb is being planted!`);
  }

  if (current === BombState.Planted) {
    console.log(`Bomb has been planted!`);
  }

  if (current === BombState.Exploded) {
    console.log(`Bomb has exploded!`);
  }

  if (current === BombState.Carried) {
    console.log(`Bomb is being carried by a player!`);
  }
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

- **Node.js** v18+ / **bun.sh** v1.0.0+
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
