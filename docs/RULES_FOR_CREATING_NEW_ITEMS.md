# Rules and Philosophy for Creating New Items

## A Designer's Introduction

In a game like Delta Green, items are more than just stat blocks; they are narrative tools that ground the world in a gritty, plausible reality. Unlike high fantasy, where equipment is often a source of power, in d100 modern horror, gear is a fragile shield against overwhelming forces. Its primary purpose is to solve mundane problems (breaching a door, analyzing a substance) so that the agents can confront the truly insoluble ones.

The design philosophy for new items should always prioritize:
1.  **Plausibility:** Does this item feel like something that exists or could exist in the real world?
2.  **Functionality:** Does it serve a clear purpose within the game's mechanics and narrative?
3.  **Tone:** Does it reinforce the game's atmosphere of tension, paranoia, and realism?
4.  **Balance:** Are its benefits appropriately offset by its cost, rarity, or potential consequences?

This guide outlines the structure and best practices for creating new items that fit seamlessly into the Delta Green ecosystem.

## Core Item Properties (`DGItem`)

Each item is a JSON object with several key properties. Not all properties apply to every item; leave unused fields `null` or `undefined`.

### `section: string`
**Purpose:** Categorizes the item for organization in lists and equipment kits.
**Guidelines:** Use an existing section from `item-data/index.ts` whenever possible to maintain consistency (e.g., "Firearms," "Surveillance," "Emergency and Survival"). If a new category is truly necessary, make it broad and descriptive.

### `name: string`
**Purpose:** The full, descriptive name of the item.
**Guidelines:** Be specific. Instead of "Pistol," use "Medium Pistol." Use real-world examples where appropriate to ground the item, e.g., `Baseball Bat or Rifle Butt`. This is the name displayed in master equipment lists.

### `shortName: string (Weapons Only)`
**Purpose:** A shortened version of the name (max 20 characters) for use on the PDF character sheet, where space is limited.
**Guidelines:** This is **mandatory for any item with combat stats** (`damage`, `lethality`, etc.). Be concise but clear. `General-Purpose Machine Gun` becomes `GPMG`.

### `skill: string`
**Purpose:** The skill used to operate the item effectively.
**Guidelines:**
-   Must match a `name` from `data/skills-data.ts` exactly.
-   For simple actions, a stat-based check like `DEXx5` can be used.
-   This links the item directly to character proficiency.

### Combat Properties

These properties define how an item performs in combat. Delta Green's combat is swift and deadly; stats should reflect this.

-   **`damage: string`**: The base damage roll (e.g., `1D6`, `2D8`). Melee weapons tend to have lower dice pools than firearms.
-   **`armorPiercing: string`**: The item's ability to bypass armor. A value of `3` means it ignores 3 points of Armor. Piercing/slashing weapons and firearms have AP values; blunt weapons usually do not (`N/A`).
-   **`lethality: string`**: A percentage chance for an instant kill if damage exceeds a target's HP. This is a key feature of firearms and explosives. A standard 9mm pistol has 5%, a shotgun 20%, a grenade 15%. Use this sparingly for non-firearms. For **Body Armor** and **Vehicles**, this field represents the **Armor Rating (AR)** or **Structural Integrity (HP)**, respectively.
-   **`killRadius: string`**: For explosives, the radius (in meters) within which a Lethality check is required. For **Vehicles**, this represents its **Armor Rating**.
-   **`baseRange: string`**: The effective range of a firearm in meters.
-   **`ammoCapacity: string`**: For firearms, the magazine size. For **Vehicles**, this represents its **Speed** category (e.g., `Slow`, `Average`, `Fast`).

### `expense: DGItemExpense`
**Purpose:** The item's cost and rarity, which dictates the difficulty of acquiring it.
**Guidelines:** This is a crucial balancing mechanic.
-   **`None`**: No cost (e.g., Unarmed Attack).
-   **`Incidental`**: Common, cheap items (knife, flashlight, handcuffs).
-   **`Standard`**: Standard-issue or commercially available gear (pistol, laptop, Kevlar vest).
-   **`Unusual`**: Less common, more expensive, or specialized items (suppressor, submachine gun, advanced drone).
-   **`Major`**: Highly specialized, expensive, or restricted gear (heavy machine gun, car bomb).
-   **`Extreme`**: Military-grade hardware or services requiring immense resources (cruise missile, chartered jet, new identity).

## Expense Level Details

Here are the official guidelines for determining an item's expense level, based on real-world cost and accessibility.

-   **`Incidental` (Up to ~$150):** Most day-to-day transactions. A meal, a taxi, ammunition, burner phones, basic tools (shovels, tarps), simple civilian clothing. Any Agent can handle these costs without issue. **If an ordinary person can buy it easily and it's not specialized, it's Incidental.**
-   **`Standard` ($200 to $800):** Substantial expenses that might require some thought for an average person. A standard pistol or rifle, a same-day plane ticket, a week at a motel, a basic computer. **Items that require specialized sources (e.g., a firearms shop) or online purchases that could be tracked by surveillance are at least Standard expense.**
-   **`Unusual` ($1,000 to $5,000):** Purchases most Agents cannot make from their own pocket without trouble. A good rifle with a scope, a cheap used car, a powerful computer, a forged passport from a developing nation. **If an item is on a federal list of tracked substances/goods, or its purchase might draw attention to potential illegal or covert activity, it is at least Unusual expense.**
-   **`Major` ($6,000 to $30,000):** Big-ticket items requiring significant resources or high-level authorization. Heavy weapons, professional forgeries, a new vehicle.
-   **`Extreme` ($36,000 and Higher):** Items available only to the very wealthy or through black budgets with little oversight. Military-grade hardware, chartered jets, a new identity.

### Other Properties

-   **`description: string`**: The most important field for custom mechanics, flavor, and context. Use this for:
    -   Skill check bonuses (`+20% to First Aid`).
    -   Special rules (`Works only from surprise.`).
    -   Sanity (SAN) costs for unnatural items (`Costs 0/1D4 SAN to witness.`).
    -   Required special training.
-   **`isRestricted: boolean`**: If `true`, the item is illegal for civilians or requires high-level agency authorization. This has significant in-game consequences for acquisition and possession.
-   **`sourceType: 'core' | 'homebrew' | 'ai'`**: A tag for tracking the item's origin. `core` is the default for official items.

## Item Archetypes & Schemas

To ensure consistency, new items should conform to one of the following archetypes. The AI generator will use these schemas to create balanced stats.

### Melee Weapon
- **Primary Fields:** `skill`, `damage`, `armorPiercing`, `expense`
- **Example:** A combat knife uses `Melee Weapons`, deals `1D6` damage, has `3` AP, and is an `Incidental` expense.

### Firearm
- **Primary Fields:** `skill`, `damage`, `armorPiercing`, `baseRange`, `lethality`, `ammoCapacity`, `expense`
- **Example:** A medium pistol uses `Firearms`, deals `1D10` damage, has `N/A` AP, a `15 m` range, `5%` lethality, `15` round capacity, and is a `Standard` expense.

### Explosive / Thrown Weapon
- **Primary Fields:** `skill`, `range` (for thrown), `radius`, `lethality`, `killRadius`, `uses`, `expense`
- **Example:** A hand grenade uses `Athletics`, has a `20 m` thrown range, `20 m` effect radius, `15%` lethality, `10 m` kill radius, `1` use, and is an `Incidental` expense (for the military).

### Area Effect (Non-Lethal)
- **Primary Fields:** `skill`, `range`, `radius`, `uses`, `victimsPenalty`, `expense`
- **Example:** A flash-bang grenade uses `Athletics`, has a `20 m` thrown range, `10 m` radius, `1` use, inflicts a `-40%` penalty, and is an `Incidental` expense.

### Armor
- **Primary Fields:** `lethality` (as Armor Rating), `expense`, `description`
- **Example:** A tactical vest provides `5` points of armor (`lethality: '5'`), is an `Unusual` expense, and its description notes it cannot be concealed.

### Vehicle
- **Primary Fields:** `lethality` (as Structural Integrity/HP), `killRadius` (as Armor), `ammoCapacity` (as Speed), `expense`
- **Example:** An armored SUV has `35` HP, `10` Armor, `Average` speed, and is an `Extreme` expense.

### General Gear / Tool
- **Primary Fields:** `expense`, `uses`, `description`
- **Example:** An Individual First Aid Kit is `Incidental`, has `1` use, and its description states `Adds +20% to a single First Aid roll.`

### Service / Intangible
- **Primary Fields:** `expense`, `description`
- **Example:** "Off-the-Books First Aid" is a `Standard` expense, and its description notes it requires a `Criminology` check to find.

## Balancing Guidelines

-   **The Power/Cost Trade-off:** A powerful item must have a high `expense` level, be `isRestricted`, or have a significant narrative drawback detailed in its `description`. A cheap, unrestricted item should not be mechanically superior to its peers.
-   **Weapon Benchmarks:**
    -   **Pistols:** 1D8 to 1D12 damage, 5-10% Lethality.
    -   **Shotguns/Rifles:** 1D12 to 2D8 damage, 10-20% Lethality, higher AP.
    -   **Explosives:** No direct damage roll, just a high Lethality % and a Kill Radius.
-   **Tools and Gear:** Non-weapon items should empower players by giving them new options or bonuses, not by making them invincible. A lockpick kit doesn't guarantee success; it enables a `Craft (Locksmith)` check. A surveillance microphone enables a `SIGINT` check at a distance.
-   **Unnatural Items:** These should be rare and dangerous. The primary cost is usually psychological (SAN loss). They should introduce complications, not solve problems cleanly. An alien artifact might provide a powerful effect but attract unwanted attention or slowly corrupt its user.

By following these principles, you can create new items that enrich the game, challenge the players, and stay true to the chillingly realistic tone of Delta Green.

## Advanced Design & Mechanics

Beyond the core stats, a truly memorable item interacts with the game's systems in interesting ways. The following principles guide the creation of items with deeper mechanical and narrative impact.

### 1. Items Enable, Skills Execute: The Primacy of the Skill Check

The core principle is this: **items do not replace skills; they enable them.** An item's main function is to make a skill check possible or to modify its difficulty.

-   **When to Call for a Check:** A skill check should only be required when using an item under pressure, in a complex manner, or against opposition.
    -   **No Check Needed:** A paramedic using a tourniquet on a stable patient. A mechanic using a wrench to tighten a bolt in a garage.
    -   **Check Required:** A historian trying to use a tourniquet on a bleeding teammate while under fire (`First Aid` check). A computer scientist trying to use a wrench to disable a strange, ticking device (`Craft (Mechanic)` or `Demolitions` check).
-   **Item as Prerequisite:** Some actions are impossible without the right tool. You cannot perform a `Craft (Locksmith)` check without lockpicks, or a `SIGINT` check to bug a room without a microphone. The item grants *permission* to roll the dice.

### 2. Modifiers: The Art of the Situational Edge

Modifiers represent an item's quality or suitability for a task. To maintain the gritty feel, flat, permanent bonuses should be rare. Modifiers should be situational.

-   **Circumstantial Modifiers (The +/- 20% Rule):** This is the most common and effective tool. A standard bonus or penalty should be **+/- 20%**. This is the d100 equivalent of advantage/disadvantage.
    -   **Example:** An `Individual First Aid Kit` grants a one-time +20% bonus to a `First Aid` roll. A `Script Kiddie Hacking Software` might allow a `Computer Science` roll but at a -20% penalty compared to professional software.
-   **Specialized Tools:** A very high-quality or specialized item might grant a higher bonus (e.g., +40%) but only in a very narrow context, which should be detailed in its `description`.
    -   **Example:** A `Forensic Mass Spectrometer` might grant +40% to `Science (Chemistry)` for identifying a specific residue, but is useless for anything else.

### 3. Consumables vs. Durables: The Law of Scarcity

In a horror setting, resources must be finite. This creates tension. Every item should fall into one of three categories regarding its longevity.

-   **Consumables:** These items have a limited number of applications, tracked by the `uses` property. This includes ammunition, single-use medical kits, or chemical reagents. Once the uses are gone, the item is inert.
-   **Powered Items:** Gear that requires batteries, fuel, or some other power source.
    -   **Design Rule:** Instead of tracking hours, a powered item should have a chance of failing at a critical moment. When under stress, the Handler can call for a **Luck roll** (d100 roll under 50%) or a simple d10 roll. On a failure, the batteries die. This is more dramatic than bookkeeping. This rule should be in the item's `description`.
-   **Durable Items:** Tools, weapons, and armor that are meant to last.
    -   **Design Rule:** These items are not immune to failure. A **critical failure** when using a durable item should be the primary mechanic for it breaking, jamming, or becoming damaged. An M4 doesn't just run out of ammo; a fumbled `Firearms` roll might mean the firing pin breaks.

### 4. Criticals & Fumbles: Moments of Brilliance and Disaster

In Delta Green, criticals are defined by matching digits on a d100 roll. This rule adds a constant, low-level uncertainty to every action.

-   **Critical Success:** A roll with matching digits (e.g., 11, 22, 33, 00) that is **equal to or less than** the target skill is a critical success. It represents flawless, efficient execution.
-   **Critical Failure (Fumble):** A roll with matching digits that is **greater than** the target skill is a critical failure. A fumble while using an item is a moment of catastrophic failure where the world's grit pushes back.

When designing an item, consider how it might behave at these extremes. The item's `description` can specify unique effects.

**Suggested Effects for a Critical Success:**
-   The action is performed in half the time.
-   It is done silently or without leaving a trace.
-   A consumable item does not expend a `use`.
-   A firearm hits a weak point, ignoring a portion of the target's armor.

**Suggested Effects for a Critical Failure:**
-   A firearm jams and requires a `Craft (Gunsmith)` check to clear.
-   A fragile piece of surveillance equipment breaks permanently.
-   A medical device is applied incorrectly, causing 1 point of damage.
-   An explosive device's timer is accidentally set for 10 seconds instead of 10 minutes.

### 5. The Unnatural Item: A Problem, Not a Solution

This is the most crucial design space for a game like Delta Green. Unnatural items are not magic items. They should be dangerous, costly, and fundamentally alien.

-   **The Primary Cost is Sanity:** The `description` MUST detail the SAN cost of using or even witnessing the item in action (e.g., `Costs 0/1D4 SAN to activate`).
-   **They Have Side Effects:** An unnatural weapon might never miss, but it whispers to its wielder. A protective amulet might ward off a creature, but it causes plants to wither and electronics to fail nearby. The solution it provides should create a new, often worse, problem.
-   **They Attract Attention:** Using an unnatural item should be like lighting a beacon in the dark. Its `description` might include a rule that its use has a percentage chance to attract the attention of other unnatural entities or interested, hostile parties.
