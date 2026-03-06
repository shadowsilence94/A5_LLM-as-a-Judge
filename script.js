/**
 * Toggles the visibility of the expansion details within timeline items.
 * Applies a smooth transition using max-height configuration defined in CSS.
 */
function toggleDetails(elementId) {
    const detailsElement = document.getElementById(elementId);
    if (!detailsElement) return;

    if (detailsElement.classList.contains('hidden')) {
        detailsElement.classList.remove('hidden');
    } else {
        detailsElement.classList.add('hidden');
    }
}

// Initial observer to add a subtle entry animation and render Chart
document.addEventListener("DOMContentLoaded", () => {
    console.log("Project A5 Progress Flow initialization complete.");
    
    // Render the Win Rate Chart
    const ctx = document.getElementById('winRateChart').getContext('2d');
    
    // Modern gradients for the chart
    let gradientWin = ctx.createLinearGradient(0, 0, 0, 400);
    gradientWin.addColorStop(0, '#38bdf8');
    gradientWin.addColorStop(1, '#818cf8');
    
    let gradientTie = ctx.createLinearGradient(0, 0, 0, 400);
    gradientTie.addColorStop(0, '#94a3b8');
    gradientTie.addColorStop(1, '#cbd5e1');

    let gradientLoss = ctx.createLinearGradient(0, 0, 0, 400);
    gradientLoss.addColorStop(0, '#f87171');
    gradientLoss.addColorStop(1, '#ef4444');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Model B (DPO) Wins', 'Ties', 'Model A (Base) Wins'],
            datasets: [{
                data: [6, 8, 1],
                backgroundColor: [gradientWin, gradientTie, gradientLoss],
                borderWidth: 0,
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            cutout: '75%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#f8fafc',
                        font: { family: "'Inter', sans-serif", size: 13 },
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(30, 41, 59, 0.9)',
                    titleFont: { family: "'Outfit', sans-serif", size: 14 },
                    bodyFont: { family: "'Inter', sans-serif", size: 13 },
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: true
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true,
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
});

// Realtime LLM Judge via Google Gemini API
async function runRealtimeJudge() {
    const instruction = document.getElementById('judge-instruction').value.trim();
    const modelA = document.getElementById('judge-model-a').value.trim();
    const modelB = document.getElementById('judge-model-b').value.trim();
    const resultBox = document.getElementById('judge-verdict-box');
    const resultText = document.getElementById('judge-result');
    const btn = document.querySelector('.judge-btn');

    if (!instruction || !modelA || !modelB) {
        alert("Please fill in the Instruction and both Model responses.");
        return;
    }

    btn.innerText = "Judging... Please Wait.";
    btn.style.opacity = "0.7";
    resultBox.classList.add('hidden');

    const apiKey = "API_KEY_REMOVED";
    
    // Explicit system-level instruction injected inside prompt for standard REST call
    const prompt = `You are a highly qualified and impartial judge evaluating two AI models. Your task is to determine which model provides a better, more accurate, and more helpful response to the user's instruction.
User Instruction: ${instruction}
Model A (Base Model): ${modelA}
Model B (DPO Model): ${modelB}
Evaluate both models. Output ONLY your final verdict as exactly one of the following options, with no extra text or explanation: "Model A", "Model B", or "Tie".`;
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });
        
        const data = await response.json();
        let verdict = "Error";
        
        if (data.candidates && data.candidates.length > 0) {
            verdict = data.candidates[0].content.parts[0].text.trim().replace(/`/g, "").replace(/"/g, "");
            
            // Interpret result and dynamically color code
            if (verdict.includes("Model A")) {
                verdict = "Winner: Model A (Base)";
                resultBox.style.color = "#f87171";
                resultBox.style.borderColor = "rgba(248, 113, 113, 0.4)";
                resultBox.style.background = "rgba(248, 113, 113, 0.1)";
            } else if (verdict.includes("Model B")) {
                verdict = "Winner: Model B (DPO)";
                resultBox.style.color = "#38bdf8"; 
                resultBox.style.borderColor = "rgba(56, 189, 248, 0.4)";
                resultBox.style.background = "rgba(56, 189, 248, 0.1)";
            } else {
                verdict = "Result: Tie";
                resultBox.style.color = "#cbd5e1";
                resultBox.style.borderColor = "rgba(203, 213, 225, 0.4)";
                resultBox.style.background = "rgba(203, 213, 225, 0.1)";
            }
        }
        
        resultText.innerText = verdict;
        resultBox.classList.remove('hidden');
    } catch (error) {
        console.error("Gemini API Error:", error);
        resultText.innerText = "API Error - Check console";
        resultBox.style.color = "#f87171";
        resultBox.style.background = "rgba(248, 113, 113, 0.1)";
        resultBox.classList.remove('hidden');
    } finally {
        btn.innerText = "Evaluate with Gemini";
        btn.style.opacity = "1";
    }
}
