# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Cognitive Load Architect** is an educational browser-based game for teachers and instructional designers. Players optimize a cluttered digital lesson page by managing three types of cognitive load:

- **Extraneous Load**: Unnecessary burden from noise and distractions (minimize)
- **Intrinsic Load**: Complexity of the subject matter (manage)
- **Germane Load**: Desired load for active processing (activate)

The game demonstrates Cognitive Load Theory (Sweller, 1988) through interactive interventions where players remove distractions, structure content, and add active learning elements.

**Target audience**: Teachers, instructional designers, educational consultants
**Context**: Webinar demonstration (5-7 minutes)
**Tech stack**: Vanilla JavaScript, HTML, CSS (no frameworks or backend)

## How to Run

This is a static browser-based application with no build process or dependencies.

**Development**:
- Open `index.html` directly in any modern browser (Chrome, Firefox, Safari, Edge)
- No server required - runs entirely client-side
- No installation or npm packages needed

**Testing**:
- Manual testing through browser
- Test in multiple browsers for compatibility
- Use browser DevTools console for debugging

## Code Architecture

### File Structure

```
/cognitive-load-game
  index.html              # Main HTML with all screens (intro, game, feedback modal, end)
  /css
    styles.css            # Complete styling for all UI components
    vergelijking.css      # Styling for before/after comparison page
  /js
    game.js              # Game state management and core game loop
    lessonpage.js        # Initial lesson page elements data (8 elements)
    cards.js             # All 14 interventions organized by cognitive load type
    feedback.js          # Feedback modal system and flow status messages
  vergelijking.html      # Before/after comparison page (linked from end screen)
```

### Core Architecture Patterns

**1. State Management** (game.js)
- Single global `gameState` object holds all game data in memory
- No persistence layer - state resets on page reload
- State includes: intervention count, load scores, interventions used, lesson elements, available interventions

**2. Data Flow**
```
User clicks intervention button
  → executeIntervention() in game.js
  → Updates gameState (scores, element states)
  → Re-renders UI (lesson page, cards, scores, flow meter)
  → Shows feedback modal
  → Returns to game screen for next intervention
```

**3. Rendering Pattern**
- All rendering functions rebuild DOM from current gameState
- Imperative DOM manipulation using vanilla JavaScript
- No virtual DOM or reactive framework
- Render functions: `renderLessonPage()`, `renderCards()`, `updateFlowMeter()`, `updateScores()`

**4. Module Organization**
- Each JS file exports data or functions via global scope
- Dependencies loaded via `<script>` tags in order:
  1. lessonpage.js (provides `getLessonElements()`)
  2. cards.js (provides `getInterventions()`)
  3. feedback.js (provides `showFeedback()`, `getFlowStatusMessage()`)
  4. game.js (main orchestrator, depends on above)

### Key Game Mechanics

**Scoring System**:
- Each load type ranges 0-20
- Initial state: Extraneous=15, Intrinsic=10, Germane=3 (overload)
- Flow balance = `extraneous + intrinsic - germane`
- Optimal zone: flow balance between -2 and +5, germane ≥ 8, extraneous ≤ 7

**Intervention Actions**:
- `remove`: Hides element (sets `element.removed = true`)
- `modify`: Changes element content (updates `element.content`)
- `enhance`: Adds content to element (appends to `element.content`)

**Element States** (applied via CSS classes):
- `.removed` - Element fades out and is visually hidden
- `.modified` - Element shows it has been restructured
- `.enhanced` - Element shows added active learning components

### Data Structures

**Lesson Element** (lessonpage.js):
```javascript
{
  id: 'element-1',
  type: 'banner',                    // banner, text-long, popup, animation, etc.
  cognitiveLoadType: 'extraneous',  // extraneous, intrinsic, or germane
  content: '<html content>',
  removed: false,                   // Modified by interventions
  modified: false,
  enhanced: false
}
```

**Intervention** (cards.js):
```javascript
{
  id: 'int-ext-1',
  cardType: 'extraneous',           // extraneous, intrinsic, germane
  label: 'Verwijder knipperende banner',
  targetElementId: 'element-1',
  action: 'remove',                 // remove, modify, enhance
  feedbackText: 'Detailed explanation...',
  effect: {
    extraneous: -3,                 // Negative = reduces load
    intrinsic: 0,
    germane: 0
  },
  newContent: '<html>',             // Optional: for modify/enhance
  used: false                       // Tracks if intervention already applied
}
```

## Common Development Tasks

### Adding New Lesson Elements

Edit `js/lessonpage.js` → `getLessonElements()`:
1. Add new element object to returned array
2. Assign unique `id` (e.g., 'element-9')
3. Set appropriate `type` and `cognitiveLoadType`
4. Write HTML content
5. Add corresponding CSS styling in `css/styles.css` for `.element-{type}`

### Adding New Interventions

Edit `js/cards.js` → `getInterventions()`:
1. Add new intervention object to returned array
2. Assign unique `id` (e.g., 'int-ext-6')
3. Set `cardType` (extraneous/intrinsic/germane)
4. Link to target element via `targetElementId`
5. Define action: remove/modify/enhance
6. Set effect values (negative reduces load, positive increases)
7. Write clear `feedbackText` explaining the cognitive load impact

### Modifying Feedback Messages

Edit `js/feedback.js`:
- Modify `getFlowStatusMessage()` for contextual feedback based on current scores
- Adjust thresholds for optimal/overload/underload zones
- Edit feedback text in individual interventions in `cards.js`

### Adjusting Scoring/Balance

Edit `js/game.js`:
- Initial scores: `startGame()` function, line ~49
- Flow balance calculation: `updateFlowMeter()`, line ~153
- Win conditions: `renderEndScreen()`, line ~234
- Score ranges are clamped 0-20 in `executeIntervention()`, line ~202

### Styling Changes

Edit `css/styles.css`:
- Color scheme defined via CSS custom properties/classes
- Extraneous = red/orange tones
- Intrinsic = blue tones
- Germane = green tones
- Layout uses flexbox with split-screen design
- Responsive breakpoints handle mobile layout

## Important Constraints

**No External Dependencies**:
- Pure vanilla JavaScript (ES6)
- No npm, webpack, or build tools
- No frameworks (React, Vue, etc.)
- All code runs in browser

**Browser Compatibility**:
- Must work in latest 2 versions of Chrome, Firefox, Safari, Edge
- Uses modern JS features (arrow functions, destructuring, etc.)
- No polyfills included

**Content Language**:
- All UI text and content is in Dutch (Nederlands)
- Maintains educational/professional tone
- Uses cognitive load theory terminology consistently

**Demo-Ready Focus**:
- Optimized for 5-7 minute live webinar demonstration
- No persistence needed (demo resets each time)
- All 14 interventions should work without bugs during live demo
- Flow meter should visually demonstrate cognitive balance changes

## Testing Approach

Since this is a demo game with no automated tests:

**Manual Testing Checklist**:
1. Start game shows correct initial messy lesson page
2. All 14 intervention buttons are clickable
3. Each intervention correctly modifies/removes/enhances its target element
4. Scores update correctly (check console for gameState)
5. Flow meter needle moves appropriately
6. Feedback modal appears with correct text
7. End screen displays final scores and interventions list
8. "Opnieuw Spelen" resets game completely
9. "Bekijk Voor/Na Vergelijking" link works

**Browser Testing**:
- Test in Chrome, Firefox, Safari, Edge
- Check responsive behavior at different viewport sizes
- Verify no console errors

## Didactic Integrity

When modifying content, preserve Cognitive Load Theory principles:

**Extraneous Load** (minimize):
- Remove irrelevant visuals, animations, redundant info
- Simplify navigation and reduce split-attention
- Feedback should explain how removal frees working memory

**Intrinsic Load** (manage):
- Use chunking, scaffolding, advance organizers
- Structure complex info without removing content
- Feedback should explain how structure aids mental model formation

**Germane Load** (activate):
- Add reflection questions, application exercises, self-explanation prompts
- Stimulate deep processing and transfer
- Feedback should explain how prompts encourage meaning-making

## Known Patterns

**Adding a new intervention type**:
If you need to add a fourth card type beyond extraneous/intrinsic/germane, you'll need to:
1. Add new card HTML in `index.html` (game-screen section)
2. Add new color scheme in `css/styles.css`
3. Update `renderCards()` in `game.js` to include new type
4. Update `titleMap` in `feedback.js` for feedback titles

**Changing number of interventions**:
- Game currently allows unlimited interventions (no max rounds)
- Counter shows "X / 14 interventies" (total available)
- Users can click "Bekijk Resultaat" at any time
- No forced ending after N interventions

**Flow meter positioning**:
The flow meter maps flowBalance (-10 to +30) to visual position (0% to 100%):
- Underload zone: 0-33%
- Optimal zone: 33-66%
- Overload zone: 66-100%
Adjust in `updateFlowMeter()` if balance ranges change.
