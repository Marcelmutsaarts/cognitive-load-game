# Cognitive Load Architect

Een educatief browser-based spel waarin docenten en onderwijsontwerpers leren hoe ontwerpkeuzes de cognitieve belasting van lerenden beïnvloeden.

## Over het Spel

**Cognitive Load Architect** laat spelers ervaren hoe je een overvolle digitale lespagina optimaliseert door bewust om te gaan met drie vormen van cognitieve belasting:

- **Extraneous Load**: Onnodige belasting door ruis en afleiding - moet worden geminimaliseerd
- **Intrinsic Load**: Complexiteit van het onderwerp zelf - moet worden gemanaged
- **Germane Load**: Gewenste belasting voor actieve verwerking - moet worden geactiveerd

## Hoe te Spelen

1. **Start**: Open `index.html` in je browser
2. **Bekijk de rommelige lespagina**: Vol met afleidingen, slechte structuur en weinig actieve leeraanpak
3. **Kies interventies**: Gebruik de drie kaarten om elementen te verwijderen, structureren of verbeteren
4. **Monitor de balans**: Houd de Flow Meter in de gaten voor optimale cognitieve balans
5. **Speel 5 rondes**: Na elke interventie krijg je feedback en zie je het effect
6. **Bekijk resultaat**: Zie hoe goed je de leeromgeving hebt geoptimaliseerd

## Technische Specificaties

### Vereisten
- Moderne browser (Chrome, Firefox, Safari, Edge)
- Geen server of backend nodig
- Geen installatie vereist

### Bestandsstructuur
```
/cognitive-load-game
  index.html              # Hoofd HTML bestand
  /css
    styles.css            # Complete styling
  /js
    game.js              # Game state en hoofdlogica
    lessonpage.js        # Lesson page elementen data
    cards.js             # Interventies data
    feedback.js          # Feedback systeem
  /assets
    /images              # (Optioneel) Iconen
  README.md
  PVA_Cognitive_Load_Architect.md  # Programma van Aanpak
```

## Voor Webinar Demo

### Demo Flow (5-7 minuten)
1. **Intro (1 min)**: Toon startscherm, leg doel uit
2. **Start situatie (1 min)**: Laat overvolle lespagina zien, wijs op problemen
3. **Interventies (3-4 min)**:
   - Verwijder banner (extraneous)
   - Chunk lange tekst (intrinsic)
   - Voeg oefenvraag toe (germane)
   - Toon feedback na elke actie
   - Wijs op Flow Meter veranderingen
4. **Afsluiting (1 min)**: Toon eindscherm met reflectie

### Key Talking Points
- "Zien jullie hoeveel ruis hier is? Dit kost mentale energie."
- "Door te chunken blijft de inhoud hetzelfde, maar wordt het behapbaar."
- "Deze oefenvraag kost mentale energie, maar dan wel productief."
- "De Flow Meter laat zien: niet te veel, niet te weinig, maar precies goed."

### Tips voor Demonstratie
- Gebruik full screen mode (F11)
- Navigeer langzaam, geef deelnemers tijd om te lezen
- Leg bij elke interventie uit waarom je deze kiest
- Wijs expliciet op de drie load types in de feedback
- Sluit af met didactische reflectie op eindscherm

## Didactische Achtergrond

Het spel is gebaseerd op **Cognitive Load Theory** (Sweller, 1988):

- **Werkgeheugen is beperkt**: 7±2 elementen tegelijk
- **Design matters**: Hoe je informatie presenteert beïnvloedt leren
- **Drie vormen van load**:
  - Extraneous: vermijd split-attention, redundantie, irrelevante info
  - Intrinsic: gebruik chunking, scaffolding, voorkennis activatie
  - Germane: stimuleer elaboratie, reflectie, toepassing

## Customization

Wil je de content aanpassen?

- **Lesson elementen**: Bewerk `js/lessonpage.js`
- **Interventies**: Bewerk `js/cards.js`
- **Feedback teksten**: Bewerk de `feedbackText` in `js/cards.js`
- **Styling**: Bewerk `css/styles.css`
- **Scores en balans**: Pas `effect` waarden aan in `js/cards.js`

## Licentie

Dit project is ontwikkeld voor educatieve doeleinden.

## Contact

Voor vragen of feedback over deze demo, neem contact op met het ontwikkelteam.

---

**Versie**: 1.0
**Datum**: Oktober 2025
**Status**: Demo-ready voor webinar
