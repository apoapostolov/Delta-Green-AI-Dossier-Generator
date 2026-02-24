# The Life & Career Simulation Engine

This document provides a detailed explanation of the procedural life and career simulation engine used in the Delta Green A.I. Agent Dossier Generator.

## 1. Overview

The core purpose of the simulation is to generate a plausible, thematic, and mechanically impactful career history for a potential Delta Green agent. It is a year-by-year simulation that tracks an agent's professional progression, personal life milestones, psychological erosion, and encounters with the strange or Unnatural. The final output is a rich log of events that is then used to fuel AI-powered narrative generation.

## 2. Core Concepts

### Years of Service

The length of an agent's career is not fixed. It's determined by two user selections on the Dossier tab to create a realistic tour of duty based on real-world career data for federal and intelligence agencies.

-   **Operational Decade**: This sets the *end year* of the simulation (e.g., selecting "1990s" sets the end year to 1995).
-   **Experience Level**: This determines the agent's total years of service.
    -   `New Recruit`: 1-4 years of service.
    -   `Experienced`: 5-12 years of service.
    -   `Veteran`: 13-20 years of service.
    -   `Legend`: 21-35 years of service.

The simulation calculates the agent's start year by subtracting their randomly determined years of service from the selected end year.

### Career States

The simulation is a state machine. An agent is always in one of several `CareerState`s, such as `Military`, `LawEnforcement`, `Academic`, etc. Each year, there is a chance they will transition to a new state based on a weighted probability table, reflecting a realistic career change (e.g., a soldier is more likely to transition into law enforcement or private security than academia).

## 3. The Annual Event Cycle

For each year of the agent's simulated life, the engine performs a sequence of checks. If a high-priority event (like a "Weird Event" or a promotion) occurs, it preempts any lower-priority events for that year.

The order of operations for each year is:

1.  **Weird Event Check**: A check is made to see if the agent experiences a strange, unsettling event.
2.  **Promotion Check**: If no weird event occurs, a check is made for promotion eligibility.
3.  **Catastrophic Event Check**: If neither of the above occurs, a check is made for a life-altering negative event based on the career's danger level.
4.  **Standard Event Check**: If none of the above occur, a final check is made for a standard career or personal life event.

---

## 4. Key Mechanics & Systems

### Event Tables & Outcomes

-   **Event Tables**: Each `CareerState` is associated with a large, weighted table of possible `EventBlueprint`s. This ensures that a soldier's year is more likely to involve a deployment, while an academic's might involve publishing a paper.
-   **Checks**: Most events involve a skill or attribute check (a d100 roll against the relevant score). The outcome of the event (success or failure) depends on this roll.
-   **Outcomes**: Both success and failure have defined mechanical consequences, which can include:
    -   **Skill/Attribute Changes**: Positive or negative changes to skills and attributes.
    -   **SAN/Bond/HP Changes**: Changes to derived stats.
-   **Criticals**:
    -   **Critical Success** (roll of `01`, or a successful roll with matching digits like `22`, `33`): Skill gains are enhanced (+1 becomes +2, 1d4 becomes 4).
    -   **Critical Failure / Fumble** (roll of `100`): These often have more severe consequences and reset any accumulated performance bonuses for promotion.

### Promotion System

An agent's advancement is not random; it's earned. The system is designed to be more challenging as an agent climbs the ladder, making senior promotions highly dependent on performance.

-   **Ranks**: Each profession has a 6-step career ladder with realistic rank titles.
-   **Promotion Chance**: The annual chance for a promotion review is calculated with the following factors:
    -   **Rank-Dependent Base Chance**: The base chance starts at **3% per year** spent at the first rank. For each subsequent rank, this base chance is **reduced by 20%**. This means a rank 2 agent has a 2.4% base chance per year, a rank 3 agent has a 1.92% chance, and so on.
    -   **Performance Bonus**: The base chance is augmented by `+1%` for each successful event check and `+2.5%` for each critical success since the last promotion. A critical failure resets these performance bonuses to zero.
-   **The Check**: When a promotion opportunity occurs, it is not guaranteed. The agent must pass a check against the **higher** of their `Bureaucracy` skill or their `CHA x 3`. This reflects that advancement can come from navigating red tape or from sheer force of personality and networking.
-   **Failure**: Failing the check means the promotion is denied for that year, resulting in a small SAN loss and a reset of all performance-based bonuses (successes and critical successes). This represents a significant career setback.

### Danger Levels & Catastrophic Events

To reflect the varied risks of different professions, each career is assigned a `dangerLevel`. This determines the annual risk of a catastrophic, life-altering event.

-   **`casual`**: 0% chance of a catastrophic event.
-   **`risky`**: 1% annual chance of a **Permanent Injury**.
-   **`deadly`**:
    -   2% annual chance of a **Permanent Injury**.
    -   1% annual chance of being **Killed in Action (KIA)**.

A `PermanentInjury` can result in either a permanent loss of a physical attribute (STR, CON, DEX, INT) or a reduction in maximum Hit Points.

### "Weird Events"

This is a core mechanic designed to simulate the slow psychological erosion from proximity to the Unnatural.

-   **Chance**: Each year, an agent has a chance to experience a "Weird Event"—a strange, unsettling, or subtly impossible occurrence.
-   **Probability**: The base chance is 1% per year, but it increases with exposure to the unnatural. The formula is: `(Unnatural Skill / 2)%`, with a minimum of 1%.
-   **Consequences**: These events now have a more nuanced impact on an agent's psyche, creating a risk/reward dynamic. The SAN effect is determined by the outcome of the associated skill or attribute check:
    -   **Critical Success**: +1 SAN gain.
    -   **Success**: 0 SAN change.
    -   **Failure**: -1 SAN loss.
    -   **Critical Failure (Fumble)**: -1d4 SAN loss.

### Sanity Dynamics

An agent's Sanity is not a one-way trip to zero. The simulation models a more dynamic psychological state.

-   **Loss**: Sanity is lost from traumatic events (injuries, partner deaths), professional failures, cover-ups, and especially from Weird Events and DG Incidents.
-   **Gain**: To model moments of hope and recovery, certain positive life events (marriage, childbirth), major professional successes (commendations), and critically succeeding on a "Weird Event" check can restore a small amount of Sanity.
-   **The Cap**: Sanity can *never* be restored above its starting maximum value (`POW x 5`). The scars of a career can be mitigated, but never fully erased.

## 5. AI Integration

The raw, mechanical data from the simulation is used as the foundation for rich, AI-generated narrative content.

1.  **Event Narratives**: The entire event log (e.g., `Year 2005: Deployed to active combat zone. (SUCCESS)`) is sent to the Gemini AI with a prompt instructing it to write a brief, first-person "memory" for each event. This prompt includes a 25% chance per event to connect it to a real-world historical event from that specific year.
2.  **Injury Reports**: All `PermanentInjury` events are collected and sent to the AI with a prompt that asks it to act as a clinical physician and generate a consolidated, in-universe medical report.
3.  **Final Dossier Synthesis**: A final summary of the agent's career—including their career path, final rank, notable skills, and number of traumas—is combined with the AI-generated injury summary and sent to the AI. The final prompt instructs the AI to synthesize all this data into a long-form, bureaucratic dossier assessing the agent's career and suitability for the Delta Green program.
