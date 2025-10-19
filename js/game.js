// ===== GAME STATE =====
const gameState = {
    interventionCount: 0,
    interventionBudget: 10, // NEW: Maximum interventies
    loadScores: {
        extraneous: 15,
        intrinsic: 10,
        germane: 3
    },
    interventionsUsed: [],
    lessonElements: [],
    availableInterventions: [],
    activeCardType: 'extraneous', // Track active tab
    mistakeCount: 0 // NEW: Track misleading choices
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
    attachEventListeners();
});

function initializeGame() {
    // Initialize lesson elements from lessonpage.js
    gameState.lessonElements = getLessonElements();

    // Initialize interventions from cards.js
    gameState.availableInterventions = getInterventions();

    // Show intro screen
    showScreen('intro-screen');
}

function attachEventListeners() {
    document.getElementById('start-game-btn').addEventListener('click', startGame);
    document.getElementById('feedback-continue-btn').addEventListener('click', continueGame);
    document.getElementById('restart-btn').addEventListener('click', restartGame);
    document.getElementById('view-result-btn').addEventListener('click', endGame);

    // Tab listeners
    initializeTabs();
}

function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cardType = e.currentTarget.dataset.cardType;
            setActiveTab(cardType);
        });
    });
}

function setActiveTab(cardType) {
    gameState.activeCardType = cardType;

    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeTabBtn = document.querySelector(`.tab-btn[data-card-type="${cardType}"]`);
    if (activeTabBtn) {
        activeTabBtn.classList.add('active');
    }

    // Update visible cards
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('active');
    });
    const activeCard = document.querySelector(`.${cardType}-card`);
    if (activeCard) {
        activeCard.classList.add('active');
    }
}

// ===== SCREEN MANAGEMENT =====
function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');
}

// ===== GAME FLOW =====
function startGame() {
    // Reset game state
    gameState.interventionCount = 0;
    gameState.interventionBudget = 10;
    gameState.mistakeCount = 0;
    gameState.loadScores = { extraneous: 15, intrinsic: 10, germane: 3 };
    gameState.interventionsUsed = [];
    gameState.lessonElements = getLessonElements();
    gameState.availableInterventions = getInterventions();
    gameState.activeCardType = 'extraneous';

    // Render game screen
    showScreen('game-screen');
    renderLessonPage();
    renderCards();
    setActiveTab('extraneous'); // Set initial tab
    updateFlowMeter();
    updateScores();
    updateInterventionCount();
}

function continueGame() {
    // Hide feedback modal
    document.getElementById('feedback-modal').classList.add('hidden');

    // Game continues - no automatic end
    renderCards(); // Re-render to update disabled states
}

function endGame() {
    showScreen('end-screen');
    renderEndScreen();
}

function restartGame() {
    startGame();
}

// ===== RENDERING FUNCTIONS =====
function renderLessonPage() {
    const lessonPageContainer = document.getElementById('lesson-page');
    lessonPageContainer.innerHTML = '';

    gameState.lessonElements.forEach(element => {
        const elementDiv = document.createElement('div');
        elementDiv.className = `lesson-element element-${element.type}`;
        elementDiv.id = element.id;

        // Apply states
        if (element.removed) {
            elementDiv.classList.add('removed');
        }
        if (element.modified) {
            elementDiv.classList.add('modified');
        }
        if (element.enhanced) {
            elementDiv.classList.add('enhanced');
        }

        elementDiv.innerHTML = element.content;
        lessonPageContainer.appendChild(elementDiv);
    });
}

function renderCards() {
    // Group interventions by card type
    const extraneousInterventions = gameState.availableInterventions.filter(i => i.cardType === 'extraneous');
    const intrinsicInterventions = gameState.availableInterventions.filter(i => i.cardType === 'intrinsic');
    const germaneInterventions = gameState.availableInterventions.filter(i => i.cardType === 'germane');

    // Render each card
    renderCard('extraneous-actions', extraneousInterventions);
    renderCard('intrinsic-actions', intrinsicInterventions);
    renderCard('germane-actions', germaneInterventions);
}

function renderCard(containerId, interventions) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    interventions.forEach(intervention => {
        const button = document.createElement('button');
        button.className = 'action-btn';

        // No visual hints - all interventions look the same
        button.textContent = intervention.label;

        // Disable if used OR if budget exhausted
        const budgetExhausted = gameState.interventionCount >= gameState.interventionBudget;
        button.disabled = intervention.used || budgetExhausted;

        if (!intervention.used && !budgetExhausted) {
            button.addEventListener('click', () => executeIntervention(intervention.id));
        }

        container.appendChild(button);
    });
}

function updateScores() {
    document.getElementById('extraneous-score').textContent = gameState.loadScores.extraneous;
    document.getElementById('intrinsic-score').textContent = gameState.loadScores.intrinsic;
    document.getElementById('germane-score').textContent = gameState.loadScores.germane;
}

function updateInterventionCount() {
    const remaining = gameState.interventionBudget - gameState.interventionCount;
    const budgetText = `${remaining} interventies over`;
    document.getElementById('current-round').textContent = budgetText;

    // Change color if budget is low
    const roundInfo = document.querySelector('.round-info');
    if (remaining <= 2) {
        roundInfo.style.color = '#E74C3C'; // Red warning
    } else if (remaining <= 4) {
        roundInfo.style.color = '#F39C12'; // Orange caution
    } else {
        roundInfo.style.color = '#2C3E50'; // Default
    }
}

function updateFlowMeter() {
    const { extraneous, intrinsic, germane } = gameState.loadScores;

    // Calculate flow balance: (extraneous + intrinsic - germane)
    // Normalize to 0-100 range for positioning
    const flowBalance = extraneous + intrinsic - germane;

    // Map flowBalance (-10 to +30) to position (0% to 100%)
    // Optimal is around 0-5, which should be in the middle
    const minFlow = -10;
    const maxFlow = 30;
    const position = ((flowBalance - minFlow) / (maxFlow - minFlow)) * 100;

    // Clamp between 0 and 100
    const clampedPosition = Math.max(0, Math.min(100, position));

    const needle = document.getElementById('flow-needle');
    needle.style.left = clampedPosition + '%';
}

// ===== INTERVENTION EXECUTION =====
function executeIntervention(interventionId) {
    const intervention = gameState.availableInterventions.find(i => i.id === interventionId);
    if (!intervention || intervention.used) return;

    // Mark as used
    intervention.used = true;

    // Apply effects to lesson elements
    if (intervention.targetElementId) {
        const element = gameState.lessonElements.find(e => e.id === intervention.targetElementId);
        if (element) {
            if (intervention.action === 'remove') {
                element.removed = true;
            } else if (intervention.action === 'modify') {
                element.modified = true;
                if (intervention.newContent) {
                    element.content = intervention.newContent;
                }
            } else if (intervention.action === 'enhance') {
                element.enhanced = true;
                if (intervention.newContent) {
                    element.content += intervention.newContent;
                }
            }
        }
    }

    // Update scores
    gameState.loadScores.extraneous += intervention.effect.extraneous;
    gameState.loadScores.intrinsic += intervention.effect.intrinsic;
    gameState.loadScores.germane += intervention.effect.germane;

    // Clamp scores between 0 and 20
    gameState.loadScores.extraneous = Math.max(0, Math.min(20, gameState.loadScores.extraneous));
    gameState.loadScores.intrinsic = Math.max(0, Math.min(20, gameState.loadScores.intrinsic));
    gameState.loadScores.germane = Math.max(0, Math.min(20, gameState.loadScores.germane));

    // Record intervention
    gameState.interventionCount++;

    // Track if misleading choice
    if (intervention.isMisleading) {
        gameState.mistakeCount++;
    }

    gameState.interventionsUsed.push({
        number: gameState.interventionCount,
        label: intervention.label,
        feedback: intervention.feedbackText,
        isMisleading: intervention.isMisleading || false
    });

    // Update UI
    renderLessonPage();
    renderCards();
    updateScores();
    updateFlowMeter();
    updateInterventionCount();

    // Show feedback
    showFeedback(intervention);
}

// ===== END SCREEN =====
function renderEndScreen() {
    const { extraneous, intrinsic, germane } = gameState.loadScores;
    const flowBalance = extraneous + intrinsic - germane;

    // Determine end message
    let message = '';
    let isOptimal = false;

    if (flowBalance >= -2 && flowBalance <= 5 && germane >= 8 && extraneous <= 7) {
        message = '🎉 Uitstekend werk! Je hebt een optimale balans bereikt. De lespagina heeft nu minimale ruis, goed gestructureerde complexiteit, en voldoende actieve verwerkingsmomenten. Dit creëert ideale condities voor effectief leren.';
        isOptimal = true;
    } else if (flowBalance > 10) {
        message = '⚠️ Let op: Er is nog steeds te veel cognitieve belasting (overload). Lerenden kunnen overweldigd raken door te veel informatie of te veel ruis. Overweeg meer extraneous load te verwijderen of intrinsic load beter te structureren.';
    } else if (flowBalance < -5) {
        message = '⚠️ Let op: De cognitieve belasting is te laag (onderload). De lespagina is nu misschien te simpel en biedt onvoldoende uitdaging. Voeg meer germane load toe om diepere verwerking te stimuleren.';
    } else if (germane < 6) {
        message = '💡 Bijna goed! De balans verbetert, maar er is nog te weinig germane load. Voeg meer actieve verwerkingselementen toe zoals oefenvragen, reflectieprompts of toepassingen om betekenisvol leren te bevorderen.';
    } else {
        message = '👍 Goed bezig! Je hebt de lespagina aanzienlijk verbeterd. Er is ruimte voor verdere optimalisatie, maar je laat zien dat je de principes van cognitive load begrijpt en kunt toepassen.';
    }

    document.getElementById('end-message').innerHTML = message;

    // Update final scores
    document.getElementById('final-extraneous').textContent = extraneous;
    document.getElementById('final-intrinsic').textContent = intrinsic;
    document.getElementById('final-germane').textContent = germane;

    // List interventions
    const interventionsList = document.getElementById('interventions-list');
    interventionsList.innerHTML = '';
    gameState.interventionsUsed.forEach(intervention => {
        const li = document.createElement('li');
        if (intervention.isMisleading) {
            li.innerHTML = `${intervention.number}. ${intervention.label} <span style="color: #E67E22; font-weight: bold;">⚠️ Misleidend</span>`;
            li.style.color = '#E67E22';
        } else {
            li.textContent = `${intervention.number}. ${intervention.label}`;
        }
        interventionsList.appendChild(li);
    });

    // Reflection with strategy evaluation
    const reflectionText = document.getElementById('reflection-text');
    const usedCount = gameState.interventionCount;
    const budgetCount = gameState.interventionBudget;
    const mistakeCount = gameState.mistakeCount;

    let strategyScore = '';
    if (mistakeCount === 0 && isOptimal) {
        strategyScore = '🏆 Meesterlijk! Je hebt perfect gescoord zonder misleidende keuzes. ';
    } else if (mistakeCount === 0 && !isOptimal) {
        strategyScore = '👍 Goede strategie! Je hebt geen misleidende keuzes gemaakt. ';
    } else if (mistakeCount === 1) {
        strategyScore = '💡 Leerervaring! Je hebt 1 misleidende keuze gemaakt. ';
    } else {
        strategyScore = `⚠️ Let op: Je hebt ${mistakeCount} misleidende keuzes gemaakt. `;
    }

    if (isOptimal) {
        reflectionText.textContent = strategyScore + 'Je demonstreert een sterk begrip van Cognitive Load Theory. Door systematisch extraneous load te verminderen, intrinsic load te structureren en germane load te activeren, creëer je een leeromgeving waarin lerenden hun beperkte werkgeheugen optimaal kunnen inzetten voor betekenisvol leren.';
    } else {
        reflectionText.textContent = strategyScore + 'Cognitive Load Theory vraagt om een delicate balans: verwijder afleiding (extraneous), maak complexiteit behapbaar (intrinsic), en stimuleer actief denken (germane). Blijf experimenteren met deze drie dimensies om de optimale leeromgeving te vinden voor jouw context en doelgroep.';
    }
}

// ===== UTILITY FUNCTIONS =====
function calculateFlowBalance() {
    const { extraneous, intrinsic, germane } = gameState.loadScores;
    return extraneous + intrinsic - germane;
}

function getFlowStatus() {
    const balance = calculateFlowBalance();
    if (balance >= -2 && balance <= 5) return 'optimal';
    if (balance > 5) return 'overload';
    return 'underload';
}
