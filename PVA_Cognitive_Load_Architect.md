# Programma van Aanpak: Cognitive Load Architect

## 1. Projectdoel

**Cognitive Load Architect** is een educatief browser-based spel voor docenten en onderwijsontwerpers waarin spelers ervaren hoe ontwerpkeuzes de cognitieve belasting van lerenden beïnvloeden. Door een rommelige digitale lespagina te optimaliseren leren spelers de drie vormen van cognitive load (Extraneous, Intrinsic, Germane) herkennen en bewust toepassen.

**Doelgroep**: Docenten, instructional designers, onderwijsadviseurs
**Context**: Webinar demonstratie
**Scope**: Eenvoudige, robuuste single-page applicatie zonder backend

---

## 2. Kernfunctionaliteit (MVP)

### 2.1 Spelmechaniek
- **Startsituatie**: Overvolle lespagina met te veel elementen (extraneous load)
- **Drie interventiekaarten**:
  - Extraneous Load kaart: verwijder/vereenvoudig elementen
  - Intrinsic Load kaart: chunk informatie, activeer voorkennis
  - Germane Load kaart: voeg actieve verwerkingselementen toe
- **Ronde-based gameplay**: Speler maakt 3-5 interventies
- **Direct feedback**: Na elke actie verschijnt uitleg over het effect
- **Flow-indicator**: Visuele meter die optimale balans weergeeft

### 2.2 Wat NIET in MVP
- Geen multiplayer
- Geen persistente opslag/accounts
- Geen complexe animaties
- Geen meerdere levels (1 casus is voldoende)
- Geen audio

---

## 3. Technische Architectuur

### 3.1 Tech Stack
**Voorstel: Vanilla JavaScript + HTML + CSS**
- Geen frameworks nodig voor deze scope
- Maximale compatibiliteit en laagste complexiteit
- Eenvoudig te demonstreren en debuggen
- Alternatief: React voor betere component herbruikbaarheid (indien voorkeur)

### 3.2 Bestandsstructuur
```
/cognitive-load-game
  index.html          # Hoofd HTML
  /css
    styles.css        # Alle styling
  /js
    game.js          # Game state en logica
    lessonpage.js    # Render van lespagina elementen
    cards.js         # Kaarten en interventies
    feedback.js      # Feedback systeem
  /assets
    /images          # Iconen voor kaarten, elementen
  README.md
```

### 3.3 Data Management
- **Game State**: JavaScript object in geheugen
- **Configuratie**: JSON-objecten met lesson elements en interventies
- **Geen API calls nodig**

---

## 4. Datastructuur

### 4.1 Lesson Page Elements
```javascript
{
  id: "element-1",
  type: "banner",           // banner, text, image, popup, animation
  cognitiveLoadType: "extraneous",
  visible: true,
  description: "Knipperende reclamebanner",
  overloadValue: 3          // 1-5 schaal
}
```

### 4.2 Interventie Acties
```javascript
{
  id: "remove-banner",
  cardType: "extraneous",
  targetElementId: "element-1",
  action: "remove",
  feedbackText: "Ruis verwijderd: cognitieve ruimte vrijgekomen voor relevante info",
  effect: {
    extraneous: -3,
    intrinsic: 0,
    germane: 0
  }
}
```

### 4.3 Game State
```javascript
{
  currentRound: 1,
  maxRounds: 5,
  loadScores: {
    extraneous: 15,    // Startscore: hoog
    intrinsic: 8,      // Gemiddeld
    germane: 2         // Laag
  },
  flowBalance: 0,      // -10 (underload) tot +10 (overload), 0 is optimaal
  interventionsUsed: [],
  lessonElements: []
}
```

---

## 5. UI/UX Flow

### 5.1 Schermen

**Scherm 1: Intro**
- Titel + korte uitleg (2-3 zinnen)
- "Start het spel" button
- Optioneel: hover info over de 3 load types

**Scherm 2: Game View**
Layout:
```
+------------------+------------------+
|  Rommelige       |  Interventie     |
|  Lespagina       |  Kaarten         |
|  (links)         |  (rechts)        |
|                  |                  |
|  [veel elements] |  [3 kaarten]     |
|                  |                  |
|                  |  [Flow Meter]    |
+------------------+------------------+
```

**Scherm 3: Feedback Modal**
- Pop-up na elke interventie
- Effect op cognitive load
- "Volgende" button

**Scherm 4: Eindscherm**
- Samenvatting van interventies
- Finale flow-score
- Didactische reflectie
- "Opnieuw spelen" button

### 5.2 Visuele Elementen

**Lespagina (starttoestand)**:
- 3-4 tekstvlakken (sommige te lang)
- 2 banners/pop-ups
- 1 knipperende animatie
- Menu zonder structuur
- Geen duidelijke hiërarchie

**Kaarten** (rechts paneel):
- **Extraneous card** (rood): "Verwijder Ruis"
  - Acties: verwijder banner, verwijder animatie, simplify navigation
- **Intrinsic card** (blauw): "Structureer Complexiteit"
  - Acties: chunk tekst, voeg heading toe, activeer voorkennis
- **Germane card** (groen): "Activeer Verwerking"
  - Acties: voeg oefenvraag toe, voeg reflectie prompt toe, voeg voorbeeld toe

**Flow Meter**:
- Horizontale balk met 3 zones:
  - Links (rood): Onderload / te simpel
  - Midden (groen): Optimaal
  - Rechts (rood): Overload / te complex
- Naald die beweegt na elke interventie

---

## 6. Game Logica

### 6.1 Scoring Systeem

**Startsituatie**:
- Extraneous: 15/20 (veel ruis)
- Intrinsic: 10/20 (gemiddelde complexiteit)
- Germane: 3/20 (weinig actieve verwerking)
- Flow: +8 (overload zone)

**Berekening Flow Balance**:
```
flowBalance = (extraneous + intrinsic - germane)
Optimaal: flowBalance tussen -2 en +2
Overload: flowBalance > 5
Underload: flowBalance < -5
```

**Win conditie**:
- Flow balance in groene zone (-2 tot +2)
- Germane load minimaal 8/20
- Extraneous load maximaal 5/20

### 6.2 Feedback Regels

Na elke interventie:
- Toon verandering in scores
- Geef contextuele uitleg ("Door het verwijderen van de banner...")
- Update flow meter
- Als flow in optimale zone komt: positieve reinforcement
- Als flow uit balans: waarschuwing met uitleg

---

## 7. Content Specificatie

### 7.1 Lesson Page Start Elements (8-10 items)

| ID | Type | Beschrijving | Extraneous Load |
|----|------|--------------|-----------------|
| E1 | Banner | "Nieuwe cursus beschikbaar!" knipperende banner boven | 3 |
| E2 | Text | Doorlopende tekst van 400 woorden zonder kopjes | 2 |
| E3 | Popup | "Wil je notificaties ontvangen?" overlay | 4 |
| E4 | Animation | Draaiende logo in hoek | 2 |
| E5 | Text | Instructies zonder voorkennis activatie | 1 (intrinsic) |
| E6 | Navigation | Menu met 15 ongestructureerde opties | 3 |
| E7 | Image | Decoratieve afbeelding zonder relevantie | 2 |
| E8 | Text | Complexe uitleg zonder chunking | 2 (intrinsic) |

### 7.2 Mogelijke Interventies (per kaart 4-5 opties)

**Extraneous Card**:
1. Verwijder banner E1
2. Verwijder popup E3
3. Verwijder decoratieve afbeelding E7
4. Stop animatie E4
5. Vereenvoudig navigatie E6

**Intrinsic Card**:
1. Splits lange tekst E2 in 3 paragrafen met kopjes
2. Voeg advance organizer toe aan E5
3. Chunk E8 in stappen
4. Structureer menu E6 met categorieën
5. Voeg visueel schema toe aan E8

**Germane Card**:
1. Voeg oefenvraag toe na E2
2. Voeg "Wat verwacht je?" prompt toe voor E5
3. Voeg concrete toepassing toe bij E8
4. Voeg reflectievraag toe
5. Voeg self-explanation prompt toe

### 7.3 Feedback Teksten (templates)

**Extraneous interventie**:
- "Je hebt [element] verwijderd. Dit vermindert onnodige afleiding en maakt ruimte vrij in het werkgeheugen voor relevante informatie. Extraneous load daalt."

**Intrinsic interventie**:
- "Door [actie] stem je de complexiteit beter af op het niveau van de lerende. De informatie wordt toegankelijker zonder inhoud te verliezen. Intrinsic load wordt beter gemanaged."

**Germane interventie**:
- "Je hebt [element] toegevoegd. Dit stimuleert actieve verwerking en betekenisgeving. Lerenden gaan dieper nadenken over de stof. Germane load neemt toe."

---

## 8. Implementatieplan

### 8.1 Fases

**Fase 1: Setup & Core Structure (2-3 uur)**
- Project setup
- HTML skeleton
- CSS base styling
- Game state object

**Fase 2: Lesson Page Rendering (2-3 uur)**
- Render start elements
- Element removal/modification logic
- Visual updates

**Fase 3: Card System (3-4 uur)**
- Drie kaarten UI
- Interventie buttons
- Koppeling interventies aan elements
- Effect berekening

**Fase 4: Feedback & Flow System (2-3 uur)**
- Feedback modal
- Flow meter visueel
- Score updates
- Win/lose conditions

**Fase 5: Polish & Testing (2-3 uur)**
- Eindscherm
- Responsive design basics
- Cross-browser testing
- Content fine-tuning

**Totaal: 11-16 uur ontwikkeltijd**

### 8.2 Prioritering

**Must Have (voor demo)**:
- Werkende start situatie met rommelige pagina
- Minimaal 2 interventies per kaart type
- Zichtbare flow meter
- Feedback na interventie
- Eindscherm met score

**Should Have**:
- 4-5 interventies per kaart
- Geanimeerde flow meter
- Rich feedback teksten
- Intro scherm

**Could Have**:
- Hover states met extra uitleg
- Subtiele animaties
- Sound effects (optioneel uit)
- "Expert" mode met meer complexiteit

**Won't Have (v1)**:
- Meerdere levels
- Backend/database
- User accounts
- Analytics tracking

---

## 9. Visueel Ontwerp Richtlijnen

### 9.1 Kleurenschema
- **Extraneous**: Rood/oranje (#E74C3C, #E67E22) - signaleert "verwijderen"
- **Intrinsic**: Blauw (#3498DB, #2C3E50) - signaleert "structuur"
- **Germane**: Groen (#27AE60, #16A085) - signaleert "activeren"
- **Achtergrond**: Licht grijs (#ECF0F1)
- **Primaire tekst**: Donkergrijs (#2C3E50)

### 9.2 Typografie
- Headers: Sans-serif, bold (bijv. Inter, Open Sans)
- Body: Sans-serif, regular
- Font sizes: duidelijk leesbaar (16px+ voor body)

### 9.3 Layout Principes
- **Split-screen**: Links lespagina, rechts controls
- **Whitespace**: Ruim tussen elementen (ironisch genoeg, gezien het thema)
- **Responsive breakpoint**: Stack bij < 768px
- **Kaarten**: Duidelijk onderscheidbaar met kleuraccenten

---

## 10. Testplan

### 10.1 Functionele Tests
- [ ] Game start correct met volle lespagina
- [ ] Elke kaart toont juiste interventies
- [ ] Interventie verwijdert/wijzigt correct element
- [ ] Scores updaten correct na interventie
- [ ] Flow meter beweegt naar juiste positie
- [ ] Feedback modal toont juiste tekst
- [ ] Eindscherm bereikbaar en toont correcte samenvatting
- [ ] Reset functionaliteit werkt

### 10.2 UX Tests
- [ ] Is de game intuitief zonder uitleg?
- [ ] Is feedback begrijpelijk?
- [ ] Is relatie tussen interventie en effect duidelijk?
- [ ] Is win condition haalbaar in 5 rondes?

### 10.3 Browser Compatibiliteit
- [ ] Chrome (laatste 2 versies)
- [ ] Firefox (laatste 2 versies)
- [ ] Safari (laatste 2 versies)
- [ ] Edge (laatste 2 versies)

---

## 11. Risico's & Mitigatie

| Risico | Impact | Mitigatie |
|--------|--------|-----------|
| Game te complex voor demo | Hoog | Focus op 1 casus, max 5 interventies per kaart |
| Balancing game mechanics moeilijk | Gemiddeld | Iteratief testen met kleine groep, versimpel scoring |
| Didactische accuraatheid onduidelijk | Hoog | Review met cognitive load expert voor demo |
| Technische bugs tijdens demo | Hoog | Uitgebreide tests, backup demo video |
| Responsive design te tijdrovend | Laag | Toon op vast formaat (laptop), mobiel = nice-to-have |

---

## 12. Deliverables

1. **Werkende web applicatie**
   - Hosting: GitHub Pages of lokaal runnen
   - URL voor easy access

2. **Documentatie**
   - README.md met uitleg en setup instructies
   - Inline code comments

3. **Demo Script** (voor webinar)
   - Stapsgewijze demo flow
   - Key talking points per interventie
   - Didactische duiding

4. **Dit PvA document**

---

## 13. Planning & Oplevering

**Aanbevolen tijdlijn**:
- **Dag 1-2**: Fase 1-2 (Setup + Lesson Page)
- **Dag 3**: Fase 3 (Card System)
- **Dag 4**: Fase 4 (Feedback & Flow)
- **Dag 5**: Fase 5 (Polish & Testing)

**Review moment**: Na Fase 4 (functioneel compleet)
**Oplevering**: Na Fase 5 (demo-ready)

---

## 14. Vervolgstappen (na demo)

Mocht de demo succesvol zijn en wil je verder bouwen:
- Meerdere cases/levels toevoegen
- Learning analytics implementeren
- Social sharing van scores
- Tutorial modus met hints
- Adaptive moeilijkheid
- Backend voor opslag van progress

---

## 15. Success Criteria

De app is succesvol als:
1. **Functioneel**: Alle core mechanics werken zonder bugs
2. **Didactisch**: Spelers begrijpen de drie load types door te spelen
3. **Intuïtief**: Minimale uitleg nodig om te starten
4. **Robust**: Werkt stabiel tijdens live demo
5. **Inspirerend**: Deelnemers zien potentie voor eigen onderwijs

---

**Document versie**: 1.0
**Datum**: 15 oktober 2025
**Status**: Klaar voor review en implementatie start
