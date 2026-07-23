// ─── State ────────────────────────────────────────────
let steps = 0;
let goal = 10000;

const circumference = 2 * Math.PI * 85; // ~534.07

// ─── DOM refs ─────────────────────────────────────────
const stepEl        = document.getElementById('stepCount');
const goalEl        = document.getElementById('goalDisplay');
const pctEl         = document.getElementById('percentageDisplay');
const circleEl      = document.getElementById('progressCircle');
const goalInput     = document.getElementById('goalInput');
const setGoalBtn    = document.getElementById('setGoalBtn');
const addBtn        = document.getElementById('addBtn');
const addTenBtn     = document.getElementById('addTenBtn');
const decrementBtn  = document.getElementById('decrementBtn');
const resetBtn      = document.getElementById('resetBtn');

// ─── Helpers ──────────────────────────────────────────
function formatNumber(n) {
  return n.toLocaleString();
}

function updateUI() {
  // Steps
  stepEl.textContent = formatNumber(steps);

  // Progress ring
  const progress = Math.min(steps / goal, 1);
  const offset = circumference * (1 - progress);
  circleEl.style.strokeDashoffset = offset;

  // Percentage
  pctEl.textContent = `${Math.round(progress * 100)}%`;

  // Ring colour: green → amber → red as you exceed goal
  if (progress >= 1) {
    circleEl.style.stroke = '#ff5252'; // red (overachiever)
  } else if (progress >= 0.75) {
    circleEl.style.stroke = '#ffab40'; // amber
  } else {
    circleEl.style.stroke = '#00e676'; // green
  }
}

// ─── Actions ──────────────────────────────────────────
function addSteps(n) {
  steps += n;
  if (steps > 99999) steps = 99999; // sanity cap
  updateUI();
}

function decrementSteps(n) {
  steps = Math.max(0, steps - n);
  updateUI();
}

function resetSteps() {
  steps = 0;
  updateUI();
}

function setGoal(value) {
  const v = parseInt(value, 10);
  if (isNaN(v) || v < 100) return;
  goal = v;
  goalEl.textContent = formatNumber(goal);
  goalInput.value = v;
  updateUI();
}

// ─── Event listeners ──────────────────────────────────
addBtn.addEventListener('click', () => addSteps(1));
addTenBtn.addEventListener('click', () => addSteps(10));
decrementBtn.addEventListener('click', () => decrementSteps(100));
resetBtn.addEventListener('click', resetSteps);

setGoalBtn.addEventListener('click', () => setGoal(goalInput.value));
goalInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') setGoal(goalInput.value);
});

// ─── Initial render ───────────────────────────────────
circleEl.style.strokeDasharray = circumference;
updateUI();

