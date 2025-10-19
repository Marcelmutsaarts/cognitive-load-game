// ===== INTERVENTIONS =====
// All available interventions organized by cognitive load type

function getInterventions() {
    return [
        // ===== EXTRANEOUS LOAD INTERVENTIONS =====
        {
            id: 'int-ext-1',
            cardType: 'extraneous',
            label: 'Verwijder knipperende banner',
            targetElementId: 'element-1',
            action: 'remove',
            feedbackText: 'Je hebt de knipperende banner verwijderd. Dit vermindert onnodige afleiding en maakt ruimte vrij in het werkgeheugen voor relevante informatie. Extraneous load daalt aanzienlijk.',
            effect: {
                extraneous: -3,
                intrinsic: 0,
                germane: 0
            },
            used: false
        },
        {
            id: 'int-ext-2',
            cardType: 'extraneous',
            label: 'Verwijder notificatie popup',
            targetElementId: 'element-4',
            action: 'remove',
            feedbackText: 'Door de popup te verwijderen elimineer je een storende onderbreking. Lerenden kunnen zich nu beter concentreren op de leerstof zonder mentale resources te verspillen aan irrelevante beslissingen.',
            effect: {
                extraneous: -4,
                intrinsic: 0,
                germane: 0
            },
            used: false
        },
        {
            id: 'int-ext-3',
            cardType: 'extraneous',
            label: 'Verwijder decoratieve afbeelding',
            targetElementId: 'element-7',
            action: 'remove',
            feedbackText: 'De decoratieve afbeelding zonder didactische waarde is verwijderd. Visuele elementen die niet bijdragen aan begrip veroorzaken split-attention en verhogen onnodige belasting.',
            effect: {
                extraneous: -2,
                intrinsic: 0,
                germane: 0
            },
            used: false
        },
        {
            id: 'int-ext-4',
            cardType: 'extraneous',
            label: 'Vereenvoudig navigatiemenu',
            targetElementId: 'element-5',
            action: 'modify',
            newContent: `
                <div class="menu-simplified">
                    <strong>Menu</strong>
                    <ul>
                        <li>Cursusinhoud</li>
                        <li>Opdrachten</li>
                        <li>Profiel</li>
                        <li>Help</li>
                    </ul>
                </div>
            `,
            feedbackText: 'Het overweldigende menu met 15 opties is versimpeld naar 4 essentiële items. Dit vermindert keuze-overload en cognitieve belasting bij navigatie, waardoor mentale resources beschikbaar blijven voor leren.',
            effect: {
                extraneous: -3,
                intrinsic: 0,
                germane: 0
            },
            used: false
        },
        {
            id: 'int-ext-mislead-1',
            cardType: 'extraneous',
            label: 'Verwijder alle tekst, alleen visuals',
            targetElementId: null,
            action: 'custom',
            isMisleading: true,
            feedbackText: '⚠️ Oppassen! Door ALLE tekst te verwijderen maak je de content ontoegankelijk. Visuele elementen alleen zijn vaak niet voldoende voor begrip. Je hebt extraneous load verlaagd, maar intrinsic load verhoogd omdat lerenden nu moeten "raden" wat de visuele content betekent.',
            effect: {
                extraneous: -3,
                intrinsic: +4,
                germane: 0
            },
            used: false
        },

        // ===== INTRINSIC LOAD INTERVENTIONS =====
        {
            id: 'int-int-1',
            cardType: 'intrinsic',
            label: 'Chunk lange introducerende tekst',
            targetElementId: 'element-2',
            action: 'modify',
            newContent: `
                <h4>Wat is Projectmanagement?</h4>
                <p>Projectmanagement omvat het plannen, organiseren en beheren van resources om specifieke doelen te bereiken.</p>

                <h4>Wat leer je in deze module?</h4>
                <ul>
                    <li>Methodieken: Waterval, Agile en Scrum</li>
                    <li>Stakeholder management en risicobeheer</li>
                    <li>Projectfasen: van initiatie tot afsluiting</li>
                </ul>

                <h4>Leerdoel</h4>
                <p>Aan het einde van deze module kun je zelfstandig projecten leiden en teams aansturen.</p>
            `,
            feedbackText: 'De doorlopende tekst is opgedeeld in heldere secties met kopjes. Dit maakt de complexe informatie beter behapbaar door chunking toe te passen. Intrinsic load wordt effectiever gemanaged zonder inhoud te verliezen.',
            effect: {
                extraneous: 0,
                intrinsic: -3,
                germane: 0
            },
            used: false
        },
        {
            id: 'int-int-2',
            cardType: 'intrinsic',
            label: 'Structureer Scrum uitleg met visual',
            targetElementId: 'element-3',
            action: 'modify',
            newContent: `
                <h4>Scrum Framework</h4>
                <p><strong>Wat is Scrum?</strong> Een Agile framework met sprints van 2-4 weken.</p>

                <p><strong>3 Hoofdrollen:</strong></p>
                <ul>
                    <li><strong>Product Owner</strong> - Bepaalt prioriteiten (Product Backlog)</li>
                    <li><strong>Scrum Master</strong> - Faciliteert het proces</li>
                    <li><strong>Development Team</strong> - Voert het werk uit</li>
                </ul>

                <p><strong>4 Ceremonies:</strong> Daily Standup, Sprint Planning, Sprint Review, Sprint Retrospective</p>
            `,
            feedbackText: 'Door de Scrum-informatie te structureren met duidelijke kopjes, opsommingen en visuele hiërarchie maak je het makkelijker om mentale modellen te vormen. De complexiteit blijft, maar wordt beter beheerst.',
            effect: {
                extraneous: 0,
                intrinsic: -3,
                germane: 0
            },
            used: false
        },
        {
            id: 'int-int-3',
            cardType: 'intrinsic',
            label: 'Voeg voorkennis activatie toe',
            targetElementId: 'element-2',
            action: 'enhance',
            newContent: `
                <div style="background: #D6EAF8; padding: 15px; margin-top: 15px; border-radius: 6px;">
                    <strong>💡 Voorkennis check:</strong> Heb je al eens een project geleid, groot of klein? Bijvoorbeeld het organiseren van een feestje of een groepsproject? Die ervaring helpt je de concepten hieronder beter te begrijpen.
                </div>
            `,
            feedbackText: 'Door voorkennis te activeren help je lerenden nieuwe informatie te verbinden met wat ze al weten. Dit verlaagt de ervaren intrinsic load en maakt complexe concepten toegankelijker.',
            effect: {
                extraneous: 0,
                intrinsic: -2,
                germane: 1
            },
            used: false
        },
        {
            id: 'int-int-4',
            cardType: 'intrinsic',
            label: 'Splits risicomanagement in stappen',
            targetElementId: 'element-6',
            action: 'modify',
            newContent: `
                <h4>Risicomanagement - 4 Stappen</h4>
                <p><strong>Stap 1: Identificeer</strong> - Welke potentiële risico's zijn er?</p>
                <p><strong>Stap 2: Analyseer</strong> - Wat is de kans en impact?</p>
                <p><strong>Stap 3: Ontwikkel</strong> - Welke mitigatiestrategieën gebruik je?</p>
                <p><strong>Stap 4: Monitor</strong> - Houd risico's bij met een risicoregister</p>
            `,
            feedbackText: 'De compacte risicomanagement-uitleg is opgedeeld in een stap-voor-stap proces. Dit sequencen van informatie helpt lerenden de complexiteit beter te verwerken door gefaseerde opbouw.',
            effect: {
                extraneous: 0,
                intrinsic: -2,
                germane: 0
            },
            used: false
        },
        {
            id: 'int-int-mislead-1',
            cardType: 'intrinsic',
            label: 'Splits tekst in zeer korte zinnetjes',
            targetElementId: 'element-2',
            action: 'custom',
            isMisleading: true,
            feedbackText: '⚠️ Te veel fragmentatie! Door elk stukje informatie op te knippen in losse zinnetjes verlies je samenhang. Dit creëert juist MEER cognitieve belasting omdat lerenden de losse stukjes weer zelf moeten samenstellen. Chunking is goed, maar overdrijven leidt tot verwarring.',
            effect: {
                extraneous: +3,
                intrinsic: -1,
                germane: 0
            },
            used: false
        },

        // ===== GERMANE LOAD INTERVENTIONS =====
        {
            id: 'int-ger-1',
            cardType: 'germane',
            label: 'Voeg reflectievraag toe aan intro',
            targetElementId: 'element-2',
            action: 'enhance',
            newContent: `
                <div style="background: #D5F4E6; padding: 15px; margin-top: 15px; border-radius: 6px; border-left: 4px solid #27AE60;">
                    <strong>🤔 Reflecteer:</strong> Welke projectmanagement methode (Waterval, Agile, Scrum) zou het beste passen bij jouw manier van werken? Waarom?
                </div>
            `,
            feedbackText: 'Door een reflectievraag toe te voegen stimuleer je actieve verwerking. Lerenden gaan nu dieper nadenken over de stof en verbinden deze met hun eigen context. Germane load neemt toe op een productieve manier.',
            effect: {
                extraneous: 0,
                intrinsic: 0,
                germane: 3
            },
            used: false
        },
        {
            id: 'int-ger-2',
            cardType: 'germane',
            label: 'Voeg oefenvraag toe bij Scrum',
            targetElementId: 'element-3',
            action: 'enhance',
            newContent: `
                <div style="background: #D5F4E6; padding: 15px; margin-top: 15px; border-radius: 6px; border-left: 4px solid #27AE60;">
                    <strong>✏️ Oefening:</strong> Stel je voor: je Development Team meldt tijdens de Daily Standup dat ze een blokkade hebben. Welke Scrum rol gaat deze blokkade oplossen? En waarom?
                </div>
            `,
            feedbackText: 'Deze oefenvraag dwingt tot actieve toepassing van de Scrum concepten. Door kennis toe te passen in een scenario bouwen lerenden diepere mentale modellen. Dit is essentiële germane load.',
            effect: {
                extraneous: 0,
                intrinsic: 0,
                germane: 3
            },
            used: false
        },
        {
            id: 'int-ger-3',
            cardType: 'germane',
            label: 'Voeg voorspelling toe aan risicomanagement',
            targetElementId: 'element-6',
            action: 'enhance',
            newContent: `
                <div style="background: #D5F4E6; padding: 15px; margin-top: 15px; border-radius: 6px; border-left: 4px solid #27AE60;">
                    <strong>🔮 Voorspel:</strong> Voor je verder leest: welke 3 risico's zou een digitaal leerplatform kunnen hebben? Denk na en vergelijk straks met de theorie.
                </div>
            `,
            feedbackText: 'Door lerenden eerst te laten voorspellen activeer je diepere verwerking. Ze worden cognitief geactiveerd en bereiden hun werkgeheugen voor op de nieuwe informatie. Dit verhoogt betekenisvol leren.',
            effect: {
                extraneous: 0,
                intrinsic: 0,
                germane: 2
            },
            used: false
        },
        {
            id: 'int-ger-4',
            cardType: 'germane',
            label: 'Voeg concrete toepassing toe',
            targetElementId: 'element-6',
            action: 'enhance',
            newContent: `
                <div style="background: #D5F4E6; padding: 15px; margin-top: 15px; border-radius: 6px; border-left: 4px solid #27AE60;">
                    <strong>💼 Toepassing:</strong> Kies een actueel project waar je bij betrokken bent (of was). Identificeer 2 risico's en beschrijf voor elk een concrete mitigatiestrategie.
                </div>
            `,
            feedbackText: 'Door directe toepassing naar eigen ervaring te vragen, stimuleer je transfer van kennis. Lerenden construeren actief betekenis door theorie te verbinden met praktijk. Dit is krachtige germane load.',
            effect: {
                extraneous: 0,
                intrinsic: 0,
                germane: 3
            },
            used: false
        },
        {
            id: 'int-ger-5',
            cardType: 'germane',
            label: 'Voeg self-explanation prompt toe',
            targetElementId: 'element-3',
            action: 'enhance',
            newContent: `
                <div style="background: #D5F4E6; padding: 15px; margin-top: 15px; border-radius: 6px; border-left: 4px solid #27AE60;">
                    <strong>🗣️ Leg uit in eigen woorden:</strong> Wat is het verschil tussen de rol van de Product Owner en de Scrum Master? Formuleer het alsof je het aan een collega uitlegt.
                </div>
            `,
            feedbackText: 'Self-explanation dwingt tot diepere verwerking. Door concepten in eigen woorden te herformuleren moeten lerenden de informatie echt begrijpen, niet alleen oppervlakkig onthouden. Dit maximaliseert germane load.',
            effect: {
                extraneous: 0,
                intrinsic: 0,
                germane: 3
            },
            used: false
        },
        {
            id: 'int-ger-mislead-1',
            cardType: 'germane',
            label: 'Voeg veel complexe case studies toe',
            targetElementId: null,
            action: 'custom',
            isMisleading: true,
            feedbackText: '⚠️ Te veel tegelijk! Complexe case studies zijn waardevol voor germane load, maar te veel ervan tegelijk creëert cognitive overload. Lerenden raken overweldigd en kunnen de informatie niet meer goed verwerken. Dosering en timing zijn essentieel.',
            effect: {
                extraneous: 0,
                intrinsic: +4,
                germane: +2
            },
            used: false
        }
    ];
}
