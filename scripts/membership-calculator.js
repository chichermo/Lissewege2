// ============================================
// MEMBERSHIP CALCULATOR
// ============================================
function initMembershipCalculator() {
    const pricingSection = document.getElementById('prijslijst');
    if (!pricingSection) return;

    const membershipCard = pricingSection.querySelector('.membership-card');
    if (!membershipCard) return;

    // Add calculator button
    const calculatorBtn = document.createElement('button');
    calculatorBtn.className = 'btn-new btn-new-outline membership-calculator-btn';
    calculatorBtn.innerHTML = '<i class="fas fa-calculator"></i> <span>Bereken Kosten</span>';
    
    const membershipBody = membershipCard.querySelector('.membership-body');
    if (membershipBody) {
        const cta = membershipBody.querySelector('.membership-cta');
        if (cta) {
            cta.insertAdjacentElement('beforebegin', calculatorBtn);
        }
    }

    calculatorBtn.addEventListener('click', () => {
        showCalculator();
    });
}

function showCalculator() {
    const modal = document.createElement('div');
    modal.className = 'calculator-modal';
    modal.innerHTML = `
        <div class="calculator-content">
            <button class="calculator-close">&times;</button>
            <h2>Lidmaatschap Calculator</h2>
            <div class="calculator-form">
                <div class="calc-field">
                    <label>Aantal kinderen:</label>
                    <input type="number" id="numChildren" min="1" max="5" value="1">
                </div>
                <div class="calc-field">
                    <label>Trainingspak:</label>
                    <input type="checkbox" id="trainingSuit">
                </div>
                <div class="calc-field">
                    <label>Clubtas:</label>
                    <input type="checkbox" id="clubBag">
                </div>
                <div class="calc-result">
                    <h3>Totaal: <span id="totalPrice">€200</span></h3>
                </div>
                <button class="btn-new btn-new-accent" id="calculateBtn">Bereken</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const basePrice = 200;
    const trainingSuitPrice = 50;
    const clubBagPrice = 30;

    function calculate() {
        const numChildren = parseInt(document.getElementById('numChildren').value) || 1;
        const hasTrainingSuit = document.getElementById('trainingSuit').checked;
        const hasClubBag = document.getElementById('clubBag').checked;

        let total = basePrice * numChildren;
        if (hasTrainingSuit) total += trainingSuitPrice;
        if (hasClubBag) total += clubBagPrice;

        document.getElementById('totalPrice').textContent = `€${total}`;
    }

    document.getElementById('numChildren').addEventListener('input', calculate);
    document.getElementById('trainingSuit').addEventListener('change', calculate);
    document.getElementById('clubBag').addEventListener('change', calculate);
    document.getElementById('calculateBtn').addEventListener('click', calculate);

    modal.querySelector('.calculator-close').addEventListener('click', () => {
        modal.remove();
    });

    // Add CSS
    if (!document.querySelector('#calculatorModalStyle')) {
        const style = document.createElement('style');
        style.id = 'calculatorModalStyle';
        style.textContent = `
            .calculator-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
            }
            .calculator-content {
                background: var(--white);
                border-radius: 16px;
                padding: 2.5rem;
                max-width: 500px;
                width: 90%;
                position: relative;
            }
            .calculator-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: var(--text-color);
            }
            .calculator-form {
                margin-top: 2rem;
            }
            .calc-field {
                margin-bottom: 1.5rem;
            }
            .calc-field label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 600;
            }
            .calc-field input[type="number"] {
                width: 100%;
                padding: 0.75rem;
                border: 2px solid rgba(13, 77, 46, 0.2);
                border-radius: 8px;
            }
            .calc-field input[type="checkbox"] {
                width: 24px;
                height: 24px;
            }
            .calc-result {
                background: var(--light-color);
                padding: 1.5rem;
                border-radius: 12px;
                margin: 2rem 0;
                text-align: center;
            }
            .calc-result h3 {
                font-size: 1.75rem;
                color: var(--primary-color);
            }
        `;
        document.head.appendChild(style);
    }

    calculate();
}

// Initialize when pricing section is shown
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initMembershipCalculator, 500);
    });
} else {
    setTimeout(initMembershipCalculator, 500);
}

