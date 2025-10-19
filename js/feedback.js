// ===== FEEDBACK SYSTEM =====
// Handles displaying feedback after interventions

function showFeedback(intervention) {
    const modal = document.getElementById('feedback-modal');
    const title = document.getElementById('feedback-title');
    const feedbackText = document.getElementById('feedback-text');
    const scoreChanges = document.getElementById('score-changes');

    // Set title based on card type
    const titleMap = {
        'extraneous': 'Extraneous Load Verlaagd',
        'intrinsic': 'Intrinsic Load Gemanaged',
        'germane': 'Germane Load Geactiveerd'
    };
    title.textContent = titleMap[intervention.cardType] || 'Interventie Effect';

    // Set feedback text
    feedbackText.innerHTML = `<p>${intervention.feedbackText}</p>`;

    // Show score changes
    const changes = [];
    if (intervention.effect.extraneous !== 0) {
        const sign = intervention.effect.extraneous > 0 ? '+' : '';
        const className = intervention.effect.extraneous < 0 ? 'positive' : 'negative';
        changes.push(`<div class="score-change ${className}">Extraneous Load: ${sign}${intervention.effect.extraneous}</div>`);
    }
    if (intervention.effect.intrinsic !== 0) {
        const sign = intervention.effect.intrinsic > 0 ? '+' : '';
        const className = intervention.effect.intrinsic < 0 ? 'positive' : 'negative';
        changes.push(`<div class="score-change ${className}">Intrinsic Load: ${sign}${intervention.effect.intrinsic}</div>`);
    }
    if (intervention.effect.germane !== 0) {
        const sign = intervention.effect.germane > 0 ? '+' : '';
        const className = intervention.effect.germane > 0 ? 'positive' : 'negative';
        changes.push(`<div class="score-change ${className}">Germane Load: ${sign}${intervention.effect.germane}</div>`);
    }

    scoreChanges.innerHTML = changes.join('');

    // Add flow status message
    const flowStatus = getFlowStatusMessage();
    if (flowStatus) {
        feedbackText.innerHTML += `<p style="margin-top: 15px; font-weight: 600; color: #2C3E50;">${flowStatus}</p>`;
    }

    // Show modal
    modal.classList.remove('hidden');
}

function getFlowStatusMessage() {
    const { extraneous, intrinsic, germane } = gameState.loadScores;
    const flowBalance = extraneous + intrinsic - germane;

    // Optimal range
    if (flowBalance >= -2 && flowBalance <= 5 && germane >= 8 && extraneous <= 7) {
        return '✅ Uitstekend! Je bereikt een optimale cognitieve balans. Lerenden hebben nu voldoende uitdaging zonder overload.';
    }

    // Overload
    if (flowBalance > 10) {
        return '⚠️ Let op: De totale cognitieve belasting is nog hoog (overload zone). Overweeg meer ruis te verwijderen of complexiteit te structureren.';
    }

    // Underload - NEW: Enhanced warning
    if (flowBalance < -5) {
        return '⚠️ Let op: De cognitieve belasting wordt misschien te laag (onderload zone). Zorg dat er voldoende uitdaging en actieve verwerking blijft.';
    }

    // NEW: Too empty warning
    if (extraneous < 3 && germane < 5) {
        return '⚠️ Oppassen! De pagina wordt té kaal. Lerenden hebben te weinig prikkels. Balans is belangrijker dan alles verwijderen.';
    }

    // Low germane
    if (germane < 6) {
        return '💡 Tip: De germane load is nog laag. Voeg meer actieve verwerkingselementen toe voor dieper leren.';
    }

    // High extraneous
    if (extraneous > 10) {
        return '💡 Tip: Er is nog veel extraneous load. Overweeg meer ruis en afleiding te verwijderen.';
    }

    // Moving in right direction
    if (flowBalance > 5 && flowBalance <= 10) {
        return '👍 Je bent op de goede weg! De balans verbetert, blijf doorwerken aan optimalisatie.';
    }

    // Budget warning
    const remaining = gameState.interventionBudget - gameState.interventionCount;
    if (remaining === 2) {
        return '⏰ Let op: Je hebt nog maar 2 interventies over. Kies strategisch!';
    }
    if (remaining === 1) {
        return '⏰ Laatste interventie! Maak het tellen.';
    }

    return null;
}
