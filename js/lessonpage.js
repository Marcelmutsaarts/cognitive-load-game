// ===== LESSON PAGE ELEMENTS =====
// These represent the initial state of the messy lesson page

function getLessonElements() {
    return [
        {
            id: 'element-1',
            type: 'banner',
            cognitiveLoadType: 'extraneous',
            content: '🔥 NIEUW! Exclusieve cursus nu beschikbaar! Klik hier! 🔥',
            removed: false,
            modified: false,
            enhanced: false
        },
        {
            id: 'element-2',
            type: 'text-long',
            cognitiveLoadType: 'extraneous',
            content: `
                <p>Welkom bij deze module over projectmanagement. Projectmanagement is een belangrijk onderdeel van moderne organisaties en omvat het plannen, organiseren en beheren van resources om specifieke doelen te bereiken. In deze module leer je over verschillende methodieken zoals Waterval, Agile en Scrum. We behandelen ook stakeholder management, risicobeheer, budgettering en planning. Daarnaast gaan we in op communicatie binnen projectteams, het gebruik van projectmanagement software, en best practices uit de industrie. Je leert ook over de verschillende fasen van een project: initiatie, planning, executie, monitoring en afsluiting. Aan het einde van deze module ben je in staat om zelfstandig projecten te leiden en teams aan te sturen.</p>
            `,
            removed: false,
            modified: false,
            enhanced: false
        },
        {
            id: 'element-3',
            type: 'text-complex',
            cognitiveLoadType: 'intrinsic',
            content: `
                <p><strong>Scrum Framework:</strong> Scrum is een framework binnen Agile projectmanagement waarbij werk wordt opgedeeld in sprints van 2-4 weken. Belangrijke rollen zijn Product Owner, Scrum Master en Development Team. De Product Owner bepaalt prioriteiten in de Product Backlog, de Scrum Master faciliteert het proces, en het Development Team voert het werk uit. Ceremonies zoals Daily Standup, Sprint Planning, Sprint Review en Sprint Retrospective zorgen voor continue verbetering en transparantie.</p>
            `,
            removed: false,
            modified: false,
            enhanced: false
        },
        {
            id: 'element-4',
            type: 'popup',
            cognitiveLoadType: 'extraneous',
            content: 'Wil je notificaties ontvangen voor nieuwe content? Klik JA om op de hoogte te blijven!',
            removed: false,
            modified: false,
            enhanced: false
        },
        {
            id: 'element-5',
            type: 'navigation',
            cognitiveLoadType: 'extraneous',
            content: `
                <ul>
                    <li>Home</li>
                    <li>Profiel</li>
                    <li>Cursussen</li>
                    <li>Archief</li>
                    <li>Downloads</li>
                    <li>Forum</li>
                    <li>Chat</li>
                    <li>Agenda</li>
                    <li>Cijfers</li>
                    <li>Instellingen</li>
                    <li>Help</li>
                    <li>Contact</li>
                    <li>Privacy</li>
                    <li>Terms</li>
                    <li>Uitloggen</li>
                </ul>
            `,
            removed: false,
            modified: false,
            enhanced: false
        },
        {
            id: 'element-6',
            type: 'text-complex',
            cognitiveLoadType: 'intrinsic',
            content: `
                <p><strong>Risicomanagement:</strong> Identificeer potentiële risico's, analyseer de kans en impact, ontwikkel mitigatiestrategieën en monitor risico's gedurende het project. Gebruik tools zoals een risicoregister en houd rekening met zowel interne als externe risicofactoren.</p>
            `,
            removed: false,
            modified: false,
            enhanced: false
        },
        {
            id: 'element-7',
            type: 'image-decorative',
            cognitiveLoadType: 'extraneous',
            content: '[Decoratieve afbeelding: Abstract patroon zonder relatie tot de lesstof]',
            removed: false,
            modified: false,
            enhanced: false
        }
    ];
}
