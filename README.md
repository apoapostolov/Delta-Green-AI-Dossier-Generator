# Delta Green A.I. Agent Dossier Generator

Generate unique and detailed characters for the Delta Green role-playing game with this interactive, AI-powered tool. Go beyond simple stat blocks by using a sophisticated procedural engine to simulate a full career history, year by year. This rich simulation, filled with promotions, personal milestones, psychological decay, and encounters with the Unnatural, is then synthesized by the app's provider-aware AI runtime into a compelling, thematic, and ready-to-play agent dossier.

## Core Features

-   **Procedural Career Simulation**: A detailed, year-by-year simulation engine generates a unique life story for each agent. The engine models career transitions, a dynamic and challenging rank-dependent promotion system, skill development, and personal life events.
-   **AI-Powered Content Generation**:
    -   **Identity**: Generates plausible names and clandestine codenames appropriate for the agent's profession and historical era.
    -   **Portraits**: Creates high-quality, thematic portraits for agents, including full-body shots, AI-cropped headshots, and expressive emotional variations.
    -   **Narrative Synthesis**: After the career simulation, the AI writes evocative, first-person "memories" for each key event in the agent's life.
    -   **Medical Reports**: For agents who suffer career-ending injuries, the AI generates a clinical, in-universe medical report detailing their condition.
    -   **Final Dossier**: The entire simulated history is synthesized into a final, multi-paragraph classified dossier that assesses the agent's career and psychological state, grounding their activities in real-world historical events.
    -   **Multi-slot AI Settings (v1.2)**: Creative, simple, vision, and image each have their own provider, remembered API key, and model. Providers include OpenAI, Anthropic, Gemini, OpenRouter, **xAI Grok** (API key or SuperGrok OAuth), **Z.ai GLM Coding Plan**, DeepSeek, and OpenCode Go.
    -   **AI Distribution**: The Skills tab can now distribute Delta Green creation advancements as legal `+20%` blocks instead of CoC-style point spreads.
-   **Thematic Delta Green Mechanics**:
    -   **Sanity Erosion**: A rebalanced system where events, traumas, and encounters with the "Unnatural" will correctly impact an agent's Sanity score, with different outcomes for successes, failures, and criticals.
    -   **Career Danger Levels**: Professions are categorized as `casual`, `risky`, or `deadly`, with corresponding annual chances of permanent injury or being killed in action.
    -   **"Weird Events"**: A unique system where agents have a chance each year to experience a strange, unsettling event that hints at the true, horrifying nature of reality.
-   **Interactive UI**: A clean, tab-based interface walks the user through the creation process, providing clear feedback and detailed information at every step.
-   **Equipment Packs**: Gear now includes add-on archetype packs for surveillance, entry work, forensics, medicine, wilderness operations, and covert case handling.

## How to Use

1.  **Tab 1: Attributes**: Roll your agent's core attributes. You can re-roll as many times as you like and even restore a previous roll from the history. Once you have a set you like, select a profession.
2.  **Tab 2: Skills**: Allocate your agent's personal skill points based on their profession.
3.  **Tab 3: Gear**:
    -   Browse the full equipment catalog and add archetype-focused equipment packs.
    -   Use "Tools of the Trade" to apply a baseline kit, then layer additional packs on top.
    -   Generate custom items with the AI and inspect both item-generation prompts in a tabbed modal.
4.  **Tab 4: Dossier**:
    -   Finalize your agent's identity by selecting their operational decade (from the 1950s to the 2020s), gender, and nationality. Use the AI to generate a name and codename.
    -   Generate a unique AI portrait. You can optionally create a cropped headshot and expressive variations.
    -   Select an experience level and click "Simulate Career" to generate a procedural life history.
    -   Review the career events and "Accept Consequences" to apply the mechanical changes to your agent's sheet.
    -   Click "Generate Dossier" to have the AI synthesize the entire career into a final, narrative report. This action is final and cannot be redone.

## Save/Load System

The application includes a comprehensive save/load system with the following features:

-   **5 Save Slots**: Save up to 5 different characters locally in your browser
-   **Smart Naming**: Automatic character naming with priority: AI-generated name > Custom name > "Character X" placeholder
-   **Import/Export**: Export characters as JSON files for backup or sharing, and import them back
-   **Full Character Persistence**: All character data persists including:
    -   Attributes, skills, bonds, and profession
    -   AI-generated content (name, codename, traits, portrait state, dossier, simulated career notes)
    -   Career simulation results
    -   Inventory and equipment
    -   Special states (veteran damage, disorders, special trainings, pending AI skill distributions)
-   **LocalStorage**: Data persists across browser sessions automatically

### Testing

The save/load system has been thoroughly tested:

-   **Automated Tests**: Run `npm test` to execute the regression and smoke suite
-   **Manual Testing**: See `SAVE_LOAD_TEST_GUIDE.md` for comprehensive manual test procedures
-   **Quick Reference**: See `QUICK_TEST_REFERENCE.md` for a quick testing checklist

For detailed information about the save/load implementation, see:
-   `tests/README.md` - Complete test documentation
-   `SAVE_LOAD_IMPLEMENTATION_SUMMARY.md` - Implementation details and status

## Technology Stack

-   **Frontend**: React with TypeScript
-   **Styling**: Tailwind CSS
-   **AI**: Provider-aware runtime backed by `@google/genai` plus OpenRouter/OpenAI-compatible HTTP integrations
-   **Build**: Vite (via an `importmap` in `index.html` for a no-build-step development environment)
-   **Testing**: Vitest with React Testing Library

## Project Layout

-   `data/`: core Delta Green data tables and structured rules
-   `prompts/`: AI prompt builders and prompt composition helpers
-   `config/`: presentation configuration such as emotional portrait prompts

## Development

### Running the Application

```bash
npm install
npm run dev
```

The Vite dev server listens on `http://localhost:3002/`.

### Environment Setup

Copy `.env.example` to `.env.local` and set whichever provider keys you want to use. The local file is ignored by git.

Supported keys:

-   `VITE_GEMINI_API_KEY` or `GEMINI_API_KEY`
-   `VITE_OPENROUTER_API_KEY` or `OPENROUTER_API_KEY`
-   `VITE_OPENCODE_GO_API_KEY` or `OPENCODE_GO_API_KEY`
-   `VITE_DEEPSEEK_API_KEY` or `DEEPSEEK_API_KEY`

If no key is present, the non-AI parts of the app still work.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Disclaimer

This is an unofficial fan project and is not affiliated with Arc Dream Publishing. The content generated is for personal, non-commercial use in tabletop role-playing games.
