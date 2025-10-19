# Programma van Aanpak: Layout en Gameplay Verbetering
**Cognitive Load Architect - Versie 2.0**

---

## Probleemanalyse

### Probleem 1: Layout - Zichtbaarheid en Toegankelijkheid

**Huidige situatie:**
- De 3 interventiekaarten (Extraneous, Intrinsic, Germane) zijn verticaal gestacked
- Elke kaart bevat 4-5 interventieknoppen
- Het totale rechter paneel is te lang, waardoor scrollen nodig is
- Het dashboard (Flow Meter en scores) staat onderaan het paneel en is niet direct zichtbaar
- Dit is problematisch voor demo's: publiek ziet niet de real-time effecten

**Impact:**
- Gebruikers moeten constant scrollen om interventies te kiezen EN het effect te zien
- De pedagogische feedback-loop (actie → direct visueel effect op flow meter) is verstoord
- Tijdens een live webinar demo is de flow meter niet zichtbaar bij het kiezen van interventies

### Probleem 2: Gameplay - Gebrek aan Diepgang

**Huidige situatie:**
- Alle interventies zijn altijd "correct" - ze verbeteren de situatie
- Spelers hoeven niet na te denken over timing of volgorde
- Er zijn geen trade-offs of strategische keuzes
- Geen consequenties voor verkeerde keuzes
- Geen reflectie nodig: gewoon alles aanklikken = winnen

**Impact:**
- Oppervlakkige leerervaring zonder kritisch denken
- Geen echte toepassing van Cognitive Load Theory principes
- Spelers leren niet om te analyseren en te redeneren
- Te weinig "skin in the game"

---

## Oplossingsrichtingen

### Oplossing 1: Layout Herstructurering

**Hoofdstrategie: Fixed Viewport Layout met Tabs/Accordion**

**Optie 1A: Tab-based Interventies (Aanbevolen)**
```
+------------------------+------------------+
| Lesson Page            | [Tab: Extr][Int][Germ] |
|                        |                  |
| [scrollable content]   | [5 buttons]      |
|                        | [visible space]  |
|                        |                  |
|                        | FLOW METER ⬅ VAST|
|                        | (altijd zichtbaar)|
|                        | Scores           |
+------------------------+------------------+
```
**Voordelen:**
- Flow meter altijd zichtbaar
- Gebruiker kiest actief welke categorie interventies te bekijken
- Compacte layout, geen scrollen nodig
- Past bij leerprincipe: bewuste categoriekeuze

**Optie 1B: Accordion met Collapsible Cards**
```
▼ Extraneous Load (uitgevouwen)
  [5 intervention buttons]
▶ Intrinsic Load (ingeklapt)
▶ Germane Load (ingeklapt)

FLOW METER (fixed onderaan)
Scores
```
**Voordelen:**
- Overzicht van alle categorieën
- Kan één categorie tegelijk openen
- Flow meter blijft zichtbaar

**Optie 1C: Horizontal Cards met Scroll**
- Kaarten naast elkaar met horizontale scroll
- Minder intuitief, niet aanbevolen

**Aanbeveling: Optie 1A (Tabs)**
- Beste UX voor demo-doeleinden
- Flow meter centraal en altijd zichtbaar
- Past bij educatieve intentie (bewuste keuze = actieve verwerking)

---

### Oplossing 2: Gameplay Verdieping met "Foute" Interventies

**Hoofdstrategie: Mixed Interventions met Dilemma's**

**2A: Toevoegen van "Misleidende" Interventies**

Voeg per categorie 1-2 interventies toe die LIJKEN goed maar negatieve bijeffecten hebben:

**Voorbeelden:**

**Extraneous categorie:**
- ❌ "Verwijder alle afbeeldingen"
  - Effect: -4 extraneous, +2 intrinsic (zonder visuele ondersteuning wordt tekst complexer)
  - Feedback: "Je hebt ook relevante visuele hulpmiddelen verwijderd. Sommige afbeeldingen helpen juist bij begrip door dual coding."

**Intrinsic categorie:**
- ❌ "Splits alle tekst in zeer korte zinnen"
  - Effect: -2 intrinsic, +3 extraneous (te gefragmenteerd, verlies van samenhang)
  - Feedback: "Teveel chunken kan contraproductief zijn. Je hebt de samenhang verstoord, wat juist extraneous load verhoogt."

**Germane categorie:**
- ❌ "Voeg meerdere oefenvragen toe aan elk onderwerp"
  - Effect: +5 germane, +3 intrinsic (cognitive overload door te veel tegelijk)
  - Feedback: "Te veel actieve verwerkingsopdrachten tegelijk creëert overload. Dosering is belangrijk."

**Impact:**
- Spelers moeten nadenken over WANNEER en WELKE interventie
- Reflectie: "Is dit wel de juiste keuze op dit moment?"
- Leert nuance: niet alles wat germane lijkt is altijd goed

**2B: Context-afhankelijke Interventies**

Sommige interventies werken alleen goed als andere eerst zijn gedaan:

**Voorbeeld:**
- "Voeg advance organizer toe" werkt alleen goed (germane +3) ALS de lange tekst al is gechunked
- Anders: germane +1, extraneous +2 (te veel info tegelijk)

**Implementatie:**
- Tracking van intervention sequence
- Conditionele effecten op basis van gameState
- Feedback verklaart waarom volgorde uitmaakt

**2C: Budget/Limiet Systeem**

Introduceer een beperking:
- Spelers krijgen 8-10 interventies (niet alle 14)
- Of: tijd-gebaseerd (5 minuten, simuleer 'deadline pressure')
- Of: "mentale energie budget" - elke interventie kost energie

**Impact:**
- Strategische keuzes: wat is het belangrijkste?
- Leert prioriteren
- Realistische constraint (tijd/budget bestaat altijd in onderwijs)

**2D: "Te ver optimaliseren" Mechanic**

Als extraneous te laag wordt (<2) en germane te laag blijft:
- Flow meter slaat door naar "underload"
- Feedback: "De pagina is nu té kaal. Lerenden hebben te weinig prikkels en raken ondergestimuleerd."

**Impact:**
- Leert dat balance belangrijker is dan perfectie
- Nuance van CLT: niet alles verwijderen, maar optimaliseren

---

## Implementatieplan

### Fase 1: Layout Fix (Prioriteit 1 - Nodig voor demo)
**Tijdsinvestering: 3-4 uur**

#### Stap 1.1: Tab UI Implementatie (1.5 uur)
- HTML aanpassen: tab-buttons toevoegen boven cards-container
- CSS: tabs styling (active/inactive states)
- JavaScript: tab switching logic
  ```javascript
  function showCardType(cardType) {
    // hide all cards
    // show selected card
    // update active tab styling
  }
  ```

#### Stap 1.2: Fixed Flow Meter Layout (1 uur)
- CSS aanpassen:
  ```css
  .control-panel {
    display: grid;
    grid-template-rows: auto 1fr auto; /* header, tabs/cards, flow meter */
    max-height: calc(100vh - 150px);
  }
  .flow-meter-container {
    position: sticky;
    bottom: 0;
    /* of: fixed positioning binnen panel */
  }
  ```

#### Stap 1.3: Responsive Tweaks (0.5 uur)
- Test op verschillende schermformaten
- Breakpoint voor tablets/mobiel

#### Stap 1.4: Testing (1 uur)
- Test alle interventies werken in tab-view
- Test flow meter blijft zichtbaar
- Test tijdens gesimuleerde demo flow

**Deliverable: Werkende tab-based layout met zichtbare flow meter**

---

### Fase 2: Gameplay Verdieping (Prioriteit 2 - Na demo)
**Tijdsinvestering: 6-8 uur**

#### Stap 2.1: Design van Misleidende Interventies (2 uur)
- Identificeer 4-6 "foute" interventies (2 per categorie)
- Schrijf feedback teksten die uitleggen WAAROM het fout is
- Definieer negatieve effecten (balanced voor fairness)
- Review met cognitive load expert voor didactische accuraatheid

#### Stap 2.2: Implementatie Misleidende Interventies (2 uur)
- Voeg toe aan `cards.js`:
  ```javascript
  {
    id: 'int-ext-bad-1',
    cardType: 'extraneous',
    label: 'Verwijder alle afbeeldingen',
    isMisleading: true, // nieuwe flag
    effect: {
      extraneous: -4,
      intrinsic: +2, // trade-off!
      germane: 0
    },
    feedbackText: '⚠️ Oppassen! Je hebt ook relevante visuele...'
  }
  ```
- Update UI: visuele hint voor misleiding (optioneel: grijze kleur, vraagteken icoon)

#### Stap 2.3: Budget/Limiet Systeem (2 uur)
- Voeg `interventionBudget` toe aan gameState
- UI: toon remaining budget boven cards
- Disable alle knoppen als budget op is
- Eindscherm: evaluatie op basis van gekozen interventies

#### Stap 2.4: Conditionele Effecten (optioneel, 2 uur)
- Voeg `prerequisites` veld toe aan interventies:
  ```javascript
  {
    id: 'int-ger-3',
    prerequisites: ['int-int-1'], // werkt alleen als deze eerst gedaan is
    effectIfPrereqMet: { germane: +3 },
    effectIfPrereqNotMet: { germane: +1, extraneous: +2 }
  }
  ```
- Update `executeIntervention()` om prerequisites te checken

#### Stap 2.5: "Underload" Warning Mechanic (1 uur)
- Update `getFlowStatusMessage()` met underload detectie
- Feedback als extraneous < 3 EN germane < 5: "Te kaal!"

#### Stap 2.6: Testing & Balancing (2 uur)
- Playtest nieuwe mechanics
- Balanceer moeilijkheidsgraad (moet haalbaar blijven)
- Test met doelgroep (docenten) voor didactische validiteit

**Deliverable: Game met strategische diepte en leerwaarde**

---

## Prioritering

### Must Have (voor webinar demo)
✅ **Fase 1 volledig** - Layout fix is kritiek voor demo
- Tab-based interventies
- Altijd zichtbare flow meter
- Geen scrollen nodig

### Should Have (v2.0 release na demo)
✅ **Fase 2.1-2.3** - Basis gameplay verbetering
- 4-6 misleidende interventies
- Budget systeem (8-10 interventies max)
- Duidelijke feedback bij foute keuzes

### Could Have (toekomstige iteraties)
⚡ **Fase 2.4-2.5** - Geavanceerde mechanics
- Conditionele effecten
- Underload warning
- Timing-based challenges

### Won't Have (out of scope)
❌ Multiplayer/competitief element
❌ Meerdere levels/scenarios
❌ Persistente opslag van voortgang
❌ AI-gegenereerde interventies

---

## Design Overwegingen

### Didactische Validiteit
**Vraag:** Versterken de "foute" interventies het leren van CLT?
**Antwoord:** Ja, als:
- Feedback helder uitlegt WAAROM iets fout is
- Misconcepties worden geadresseerd (bijv. "meer chunken = altijd beter" is een misconceptie)
- Spelers leren van fouten zonder gefrustreerd te raken

**Actie:**
- Test met 2-3 docenten voordat je uitrolt
- Zorg dat feedback educatief is, niet punitief
- Optioneel: "hint" knop voor wie vastloopt

### UX Balans
**Vraag:** Wordt het spel te moeilijk/frustrerend met foute opties?
**Mitigation:**
- Ratio: 70% goede interventies, 30% misleidend
- Visuele cue: subtiel verschil in kleur/icoon (optioneel)
- "Undo" functie: laatste interventie terugdraaien (kost wel budget)

### Demo Context
**Vraag:** Moet de demo-versie simpeler blijven?
**Antwoord:** Ja, voor live webinar:
- **Demo mode:** Alleen goede interventies (zoals nu)
- **Practice mode:** Met misleidende interventies voor zelfstandig oefenen
- Toggle in intro screen: "Demo mode" vs "Challenge mode"

---

## Technical Specificaties

### CSS Changes (Fase 1)

```css
/* Tab system */
.intervention-tabs {
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
  background: white;
  padding: 10px;
  border-radius: 8px;
}

.tab-btn {
  flex: 1;
  padding: 10px 15px;
  border: 2px solid transparent;
  background: var(--bg-light);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 600;
  font-size: 0.85em;
}

.tab-btn.active {
  background: white;
  border-color: var(--intrinsic-color);
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.2);
}

.tab-btn.extraneous-tab.active {
  border-color: var(--extraneous-color);
}

.tab-btn.intrinsic-tab.active {
  border-color: var(--intrinsic-color);
}

.tab-btn.germane-tab.active {
  border-color: var(--germane-color);
}

/* Fixed layout */
.control-panel {
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 150px);
  overflow: hidden; /* belangrijk! */
}

.cards-container {
  flex: 1;
  overflow-y: auto; /* alleen cards scrollen indien nodig */
  margin-bottom: 15px;
}

.card {
  display: none; /* hide all by default */
}

.card.active {
  display: block; /* show only active tab */
}

.flow-meter-container {
  flex-shrink: 0; /* never shrink */
  position: sticky;
  bottom: 0;
  background: white; /* dekking tegen content eronder */
  z-index: 10;
}
```

### JavaScript Changes (Fase 1)

```javascript
// game.js - Add tab system
let activeCardType = 'extraneous'; // default

function initializeTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const cardType = e.target.dataset.cardType;
      setActiveTab(cardType);
    });
  });
  setActiveTab('extraneous'); // show first tab
}

function setActiveTab(cardType) {
  activeCardType = cardType;

  // Update tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`.tab-btn[data-card-type="${cardType}"]`).classList.add('active');

  // Update visible cards
  document.querySelectorAll('.card').forEach(card => {
    card.classList.remove('active');
  });
  document.querySelector(`.${cardType}-card`).classList.add('active');
}
```

### Data Structure Changes (Fase 2)

```javascript
// cards.js - Extended intervention object
{
  id: 'int-ext-bad-1',
  cardType: 'extraneous',
  label: 'Verwijder alle afbeeldingen',
  isMisleading: true,              // NEW
  difficulty: 'misleading',        // NEW: 'good', 'misleading', 'trap'
  targetElementId: null,           // kan meerdere elementen beïnvloeden
  action: 'custom',                // NEW: custom logic
  effect: {
    extraneous: -4,
    intrinsic: +2,                 // trade-off
    germane: 0
  },
  feedbackText: '⚠️ Oppassen! ...',
  prerequisites: [],               // NEW: array van intervention IDs
  conditionalEffect: {             // NEW: effect als prereq niet voldaan
    extraneous: -2,
    intrinsic: +3,
    germane: 0
  },
  used: false
}

// game.js - Extended gameState
const gameState = {
  interventionCount: 0,
  interventionBudget: 10,          // NEW
  loadScores: { ... },
  interventionsUsed: [],
  lessonElements: [],
  availableInterventions: [],
  mistakes: 0                      // NEW: track misleading choices
};
```

---

## Testing Plan

### Fase 1 Testing: Layout

**Functionele Tests:**
- [ ] Tabs schakelen tussen categorieën
- [ ] Alleen actieve tab is zichtbaar
- [ ] Flow meter blijft altijd zichtbaar (ook bij veel interventies)
- [ ] Geen overflow/scroll van totaal control panel
- [ ] Interventies werken vanuit elke tab
- [ ] Responsive: werkt op tablet/desktop

**Demo Scenario Test:**
1. Open game
2. Klik interventie uit tab 1
3. Check flow meter reageert direct (geen scrollen)
4. Schakel naar tab 2
5. Klik interventie
6. Check flow meter direct zichtbaar
7. Herhaal voor tab 3

**Browser Compatibility:**
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

---

### Fase 2 Testing: Gameplay

**Functionele Tests:**
- [ ] Misleidende interventies tonen negatieve effecten
- [ ] Budget telt correct af
- [ ] Spel eindigt bij budget = 0
- [ ] Feedback verklaart waarom interventie misleidend is
- [ ] Eindscherm toont goede/foute ratio

**Balancing Tests:**
- [ ] Is het mogelijk om te winnen met budget van 10?
- [ ] Zijn misleidende opties herkenbaar maar niet te obvious?
- [ ] Is feedback educatief genoeg?
- [ ] Voelt het spel eerlijk aan (niet vals of frustrerend)?

**Didactic Tests (met docenten):**
- [ ] Leren spelers de nuances van CLT?
- [ ] Wordt misconceptie gecorrigeerd door feedback?
- [ ] Is moeilijkheidsgraad passend voor doelgroep?

---

## Risico's & Mitigatie

| Risico | Impact | Waarschijnlijkheid | Mitigatie |
|--------|--------|-------------------|-----------|
| Tab UI is verwarrend voor gebruikers | Hoog | Laag | User testing voor implementatie; duidelijke labels |
| Flow meter past niet in fixed layout op kleine schermen | Gemiddeld | Gemiddeld | Responsive breakpoints; kleinere font-sizes |
| Misleidende interventies frustreren gebruikers | Hoog | Gemiddeld | Goede feedback; 70/30 ratio; optionele hints |
| Balancing van budget is te moeilijk | Gemiddeld | Hoog | Iteratief testen en tweaken; start met 12 budget |
| Implementatie duurt langer dan gepland | Laag | Gemiddeld | Fase 1 eerst afmaken voor demo; Fase 2 kan later |

---

## Success Criteria

### Fase 1 (Layout) Geslaagd als:
✅ Flow meter is 100% van de tijd zichtbaar tijdens gameplay
✅ Geen scrollen nodig om interventies te kiezen
✅ Demo kan vlot worden uitgevoerd zonder UI-frustratie
✅ Publiek ziet directe visuele feedback op keuzes

### Fase 2 (Gameplay) Geslaagd als:
✅ Spelers moeten nadenken over keuzes (niet blindly klikken)
✅ Feedback teksten worden gelezen en begrepen
✅ 80% van spelers maakt minstens 1 misleidende keuze (= nadenken gebeurt)
✅ Eindscherm reflectie is betekenisvoller door strategische keuzes
✅ Didactische validatie: docenten bevestigen leerwaarde

---

## Planning & Tijdlijn

### Sprint 1: Layout Fix (Week 1)
**Doel:** Demo-ready maken
- Dag 1: Tabs implementeren (HTML + CSS)
- Dag 2: JavaScript tab logic + fixed flow meter
- Dag 3: Testing & refinement
- Dag 4: Demo run-through & polish

**Oplevering:** Werkende demo voor webinar

---

### Sprint 2: Gameplay Depth (Week 2-3, NA demo)
**Doel:** Educatieve waarde verhogen

**Week 2:**
- Dag 1-2: Design misleidende interventies + review
- Dag 3: Implementatie misleidende interventies
- Dag 4-5: Budget systeem + UI updates

**Week 3:**
- Dag 1-2: Testing & balancing
- Dag 3: User testing met 3-5 docenten
- Dag 4: Iteraties op basis van feedback
- Dag 5: Final polish & documentatie

**Oplevering:** v2.0 met gameplay depth

---

## Vervolgstappen na PvA

1. **Review dit PvA** met stakeholders/expert
2. **Kies prioriteit:** Fase 1 alleen (demo), of both?
3. **Valideer aannames:** Quick user test van tab concept (papieren mockup)
4. **Start implementatie Fase 1** (Layout fix)
5. **Demo webinar** met nieuwe layout
6. **Gather feedback** van webinar deelnemers
7. **Besluit over Fase 2** op basis van feedback

---

**Document versie:** 1.0
**Datum:** 19 oktober 2025
**Status:** Klaar voor review en besluitvorming
**Auteur:** Cognitive Load Architect Development Team
