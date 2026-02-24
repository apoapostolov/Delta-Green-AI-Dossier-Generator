# Delta Green A.I. Agent Dossier Generator

Generate unique and detailed characters for the Delta Green role-playing game with this interactive, AI-powered tool. Go beyond simple stat blocks by using a sophisticated procedural engine to simulate a full career history, year by year. This rich simulation, filled with promotions, personal milestones, psychological decay, and encounters with the Unnatural, is then synthesized by the Google Gemini AI to produce a compelling, thematic, and ready-to-play agent dossier.

## Core Features

-   **Procedural Career Simulation**: A detailed, year-by-year simulation engine generates a unique life story for each agent. The engine models career transitions, a dynamic and challenging rank-dependent promotion system, skill development, and personal life events.
-   **AI-Powered Content Generation (Google Gemini)**:
    -   **Identity**: Generates plausible names and clandestine codenames appropriate for the agent's profession and historical era.
    -   **Portraits**: Creates high-quality, thematic portraits for agents, including full-body shots, AI-cropped headshots, and expressive emotional variations.
    -   **Narrative Synthesis**: After the career simulation, the AI writes evocative, first-person "memories" for each key event in the agent's life.
    -   **Medical Reports**: For agents who suffer career-ending injuries, the AI generates a clinical, in-universe medical report detailing their condition.
    -   **Final Dossier**: The entire simulated history is synthesized into a final, multi-paragraph classified dossier that assesses the agent's career and psychological state, grounding their activities in real-world historical events.
-   **Thematic Delta Green Mechanics**:
    -   **Sanity Erosion**: A rebalanced system where events, traumas, and encounters with the "Unnatural" will correctly impact an agent's Sanity score, with different outcomes for successes, failures, and criticals.
    -   **Career Danger Levels**: Professions are categorized as `casual`, `risky`, or `deadly`, with corresponding annual chances of permanent injury or being killed in action.
    -   **"Weird Events"**: A unique system where agents have a chance each year to experience a strange, unsettling event that hints at the true, horrifying nature of reality.
-   **Interactive UI**: A clean, tab-based interface walks the user through the creation process, providing clear feedback and detailed information at every step.

## How to Use

1.  **Tab 1: Attributes**: Roll your agent's core attributes. You can re-roll as many times as you like and even restore a previous roll from the history. Once you have a set you like, select a profession.
2.  **Tab 2: Skills**: Allocate your agent's personal skill points based on their profession.
3.  **Tab 3: Gear**: (Not yet implemented) This tab is reserved for future equipment selection.
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
    -   AI-generated content (name, codename, traits, memories, dossier)
    -   Career simulation results
    -   Inventory and equipment
    -   Special states (veteran damage, disorders, special trainings)
-   **LocalStorage**: Data persists across browser sessions automatically

### Testing

The save/load system has been thoroughly tested:

-   **Automated Tests**: Run `npm test` to execute 15 integration tests
-   **Manual Testing**: See `SAVE_LOAD_TEST_GUIDE.md` for comprehensive manual test procedures
-   **Quick Reference**: See `QUICK_TEST_REFERENCE.md` for a quick testing checklist

For detailed information about the save/load implementation, see:
-   `tests/README.md` - Complete test documentation
-   `SAVE_LOAD_IMPLEMENTATION_SUMMARY.md` - Implementation details and status

## Technology Stack

-   **Frontend**: React with TypeScript
-   **Styling**: Tailwind CSS
-   **AI**: Google Gemini API (`@google/genai`)
-   **Build**: Vite (via an `importmap` in `index.html` for a no-build-step development environment)
-   **Testing**: Vitest with React Testing Library

## Development

### Running the Application

```bash
npm install
npm run dev
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Disclaimer

This is an unofficial fan project and is not affiliated with Arc Dream Publishing. The content generated is for personal, non-commercial use in tabletop role-playing games.