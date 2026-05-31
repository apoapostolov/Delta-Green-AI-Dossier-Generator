// narrative/build.ts
import type { SimResult, CareerState } from "../sim/types";
import type { DecadeConfig, Nationality, Profession, Department, DamagedVeteranOption, Disorder } from "../types";

export function narrativeFacts(r: SimResult) {
  const s = r.summary;
  return {
    activeYears: r.endYear - r.startYear + 1,
    finalState: r.finalState,
    path: s.path,
    topSkill: s.peakSkill?.name,
    dgOps: s.dgTouchpoints,
    commendations: s.commendations,
    scandals: s.scandals,
    majorTraumas: s.majorTraumas,
    finalRank: s.finalRank,
    yearsInFinalRank: s.yearsInFinalRank,
  };
}

const KEY_EVENT_KINDS = new Set(['PermanentInjury', 'KIA', 'PartnerDeath', 'Suspension', 'Coverup', 'Arrest', 'DGIncident', 'Weird', 'DisciplinaryAction', 'Injury']);

function selectKeyEvents(r: SimResult): string[] {
    const keyEvents = r.events.filter(e => 
        KEY_EVENT_KINDS.has(e.kind) || 
        (e.outcome.sanDelta && e.outcome.sanDelta <= -2)
    );
    
    if (keyEvents.length === 0) {
        // If no traumatic events, return last 3 events to have something for the AI to work with.
        return r.events.slice(-3).map(e => `${e.year}: ${e.detail} (Outcome: ${e.check.success ? 'SUCCESS' : 'FAILURE'})`);
    }
    
    // Limit to a reasonable number to not overwhelm the prompt context, prioritizing most recent.
    return keyEvents.slice(-10).map(e => `${e.year}: ${e.detail} (Outcome: ${e.check.success ? 'SUCCESS' : 'FAILURE'})`);
}


export function buildPrompt(
    r: SimResult,
    characterName: string,
    codename: string,
    injurySummary: string | null,
    decadeConfig: DecadeConfig | undefined,
    nationality: Nationality,
    profession: Profession | null,
    department: Department | null,
    baseSkills: Record<string, number>,
    damagedVeteranOption: DamagedVeteranOption | null,
    assignedDisorder: Disorder | null
){
  const f = narrativeFacts(r);

  // Calculate top 3 skills
  const finalSkills = { ...baseSkills };
  for (const [skillName, gain] of Object.entries(r.skills)) {
      finalSkills[skillName] = (finalSkills[skillName] || 0) + gain;
  }
  const topSkills = Object.entries(finalSkills)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([name, value]) => `${name}: ${value}%`)
      .join(', ');

  // Determine superior's rank and AI persona
  let aiPersona = "You are an AI tasked with synthesizing an agent's career into a classified federal dossier.";
  let nextRank = "N/A (Top Rank)";
  if (department && profession && f.finalRank) {
      const rankLadder = department.ranks?.[profession.name] || profession.ranks;
      if (rankLadder) {
          const currentRankIndex = rankLadder.indexOf(f.finalRank);
          if (currentRankIndex !== -1) {
              const superiorRankIndex = Math.min(currentRankIndex + 2, rankLadder.length - 1);
              const superiorRank = rankLadder[superiorRankIndex];
              aiPersona = `You are a **${superiorRank}** within the **${department.name}**. You are writing a classified dossier to assess a subordinate agent.`;

              if (currentRankIndex < rankLadder.length - 1) {
                  nextRank = rankLadder[currentRankIndex + 1];
              }
          }
      }
  }

  const departmentContext = department ? `
**Author's Departmental Context:** The dossier must reflect the mission and jurisdiction of the **${department.name}**, which is described as: "${department.description}". The agent's activities must be interpreted through this lens.` : '';
  
  const veteranProfileSection = damagedVeteranOption ? `
**Psychological Profile Addendum:**
- **Originating Trauma:** ${damagedVeteranOption}.
- **Assessment Notes:** ${
    (() => {
        switch (damagedVeteranOption) {
            case 'Extreme Violence': return "The asset is adapted to violence. Assess how this desensitization makes them an effective but potentially reckless tool. Note their reduced CHA as a difficulty in forming stable interpersonal bonds.";
            case 'Captivity or Imprisonment': return "The asset is adapted to helplessness. Evaluate how this manifests as either extreme resilience or a dangerous level of fatalism. Note their reduced POW as a potential vulnerability to mental domination or coercion.";
            case 'Hard Experience': return "The asset has learned from hard-won, traumatic experience. This has made them highly skilled but has come at the cost of personal connections. Assess this trade-off in their operational suitability.";
            case 'Things Man Was Not Meant to Know': return `The asset has been exposed to Unnatural forces, resulting in a diagnosed psychological disorder: **${assignedDisorder?.name || 'an unknown affliction'}**. The dossier MUST analyze how this disorder impacts their operational reliability, decision-making, and interactions with the team. This is a critical factor in their assessment.`;
            default: return 'Not specified.';
        }
    })()
}` : '';

  const keyEvents = selectKeyEvents(r).join(" | ");
  const injuryInfo = injurySummary ? `- Medical Assessment: ${injurySummary}` : '';

  return `${aiPersona} The tone must be clinical, detached, and bureaucratic, suitable for a performance review or threat assessment.

**Core Instructions:**
1.  **Interpret, Don't Repeat:** All data provided in the 'Factual Summary' is for context. The reader and author of this dossier are assumed to be aware of this data. **DO NOT** repeat any data verbatim or quote any numerical values (e.g., skill percentages, number of years). Instead, interpret this data to build a narrative.
2.  **Focus on Application:** The report must analyze how the agent's traits, skills, and career experiences have applied to past activities and how they may impact future operational suitability. Mention key events from their life as if they were part of an internal investigation file.
3.  **Historical Context:** Choose a specific, significant year from the agent's \`Operational Era Context\`. Weave the asset's activities into the real-world political, geopolitical, economic, or clandestine events of that year. For example, if the era is the 1980s and the chosen year is 1983, you might reference the Able Archer 83 exercise, the bombing of the U.S. Embassy in Beirut, or the downing of Korean Air Lines Flight 007.
4.  **Length & Tone:** The output must be a long, detailed report (approx. 400-500 words). Maintain a formal, impersonal tone. Refer to the subject as 'the asset' or by their name/codename. Avoid emotional language, except when quoting psychological assessments.
5.  **Redaction:** When mentioning specific individuals, operations, or locations (other than the subject's own name/codename), there is a 70% chance you must replace the name with '**[REDACTED]**'.
6.  **Formatting:** The subject's name (**${characterName}**), their codename (**${codename}**), any other proper names, operation names, and the literal string '**[REDACTED]**' MUST be bolded using Markdown (e.g., **Agent Smith**, **OPERATION NIGHTFALL**, **[REDACTED]**).
7.  **Structure:** Structure the report with clear paragraphs. Start with a summary, elaborate on key career moments or patterns of behavior, and conclude with a psychological assessment and recommendation.
${departmentContext}${veteranProfileSection}
---
**Factual Summary for Synthesis (DO NOT REPEAT VERBATIM):**
-   **Subject Name:** ${characterName}
-   **Designation:** ${codename}
-   **Nationality:** ${nationality}
-   **Operational Era Context:** ${decadeConfig?.displayName || 'Modern'}
-   **Profession:** ${profession?.name || 'Field Agent'}
-   **Assigned Department:** ${department?.name || 'N/A'}
-   **Current Rank/Position:** ${f.finalRank} (held for ${f.yearsInFinalRank} years).
-   **Reports to:** ${nextRank}
-   **Noteworthy Skills:** ${topSkills}.
-   **Career Path:** ${f.path.join(" -> ")}.
-   **Performance Metrics:** ${f.commendations} commendations, ${f.scandals} administrative reviews.
-   **Psychological Stressors:** ${f.majorTraumas} major traumatic incidents noted.
${injuryInfo ? `${injuryInfo}\n` : ''}-   **Exposure to Anomalous Activity:** ${f.dgOps} documented encounters with phenomena designated UNNATURAL.
-   **Key Traumatic/Anomalous Events Log:** ${keyEvents}.

---
**Begin Dossier Entry (Full Page Report):**
`;
}

export function getDossierPromptTemplate(
    characterName?: string,
    codename?: string,
    nationality?: Nationality,
    decadeConfig?: DecadeConfig,
    profession?: Profession | null,
    department?: Department | null,
): string {
    const name = characterName || '[Character Name]';
    const code = codename || '[Codename]';
    const nat = nationality || '[Nationality]';
    const decade = decadeConfig?.displayName || '[Operational Era]';
    const prof = profession?.name || '[Profession]';
    const dept = department?.name || '[Assigned Department]';

    return `You are an AI tasked with synthesizing an agent's career into a classified federal dossier. The tone must be clinical, detached, and bureaucratic, suitable for a performance review or threat assessment.

**Core Instructions:**
1.  **Interpret, Don't Repeat:** All data provided in the 'Factual Summary' is for context. The reader and author of this dossier are assumed to be aware of this data. **DO NOT** repeat any data verbatim or quote any numerical values (e.g., skill percentages, number of years). Instead, interpret this data to build a narrative.
2.  **Focus on Application:** The report must analyze how the agent's traits, skills, and career experiences have applied to past activities and how they may impact future operational suitability. Mention key events from their life as if they were part of an internal investigation file.
3.  **Historical Context:** Choose a specific, significant year from the agent's \`Operational Era Context\`. Weave the asset's activities into the real-world political, geopolitical, economic, or clandestine events of that year. For example, if the era is the 1980s and the chosen year is 1983, you might reference the Able Archer 83 exercise, the bombing of the U.S. Embassy in Beirut, or the downing of Korean Air Lines Flight 007.
4.  **Length & Tone:** The output must be a long, detailed report (approx. 400-500 words). Maintain a formal, impersonal tone. Refer to the subject as 'the asset' or by their name/codename. Avoid emotional language, except when quoting psychological assessments.
5.  **Redaction:** When mentioning specific individuals, operations, or locations (other than the subject's own name/codename), there is a 70% chance you must replace the name with '**[REDACTED]**'.
6.  **Formatting:** The subject's name (**${name}**), their codename (**${code}**), any other proper names, operation names, and the literal string '**[REDACTED]**' MUST be bolded using Markdown (e.g., **Agent Smith**, **OPERATION NIGHTFALL**, **[REDACTED]**).
7.  **Structure:** Structure the report with clear paragraphs. Start with a summary, elaborate on key career moments or patterns of behavior, and conclude with a psychological assessment and recommendation.

---
**Factual Summary for Synthesis (DO NOT REPEAT VERBATIM):**
-   **Subject Name:** ${name}
-   **Designation:** ${code}
-   **Nationality:** ${nat}
-   **Operational Era Context:** ${decade}
-   **Profession:** ${prof}
-   **Assigned Department:** ${dept}
-   **Current Rank/Position:** [...Data from Career Simulation...]
-   **Reports to:** [...Data from Career Simulation...]
-   **Noteworthy Skills:** [...Data from Career Simulation...]
-   **Career Path:** [...Data from Career Simulation...]
-   **Performance Metrics:** [...Data from Career Simulation...]
-   **Psychological Stressors:** [...Data from Career Simulation...]
-   **Medical Assessment:** [...Data from Career Simulation, if applicable...]
-   **Exposure to Anomalous Activity:** [...Data from Career Simulation...]
-   **Key Events Log (for narrative color):** [...Data from Career Simulation...]

---
**Begin Dossier Entry (Full Page Report):**
`;
}