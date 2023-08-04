import './style.css'
import convertDistance from './convertDistance'
import rules from './convertationRules.json'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div class="converter">
      <label for="distance-value">Enter the distance value:</label>
      <input type="number" id="distance-value">

      <label for="select-from">From:</label>
      <select id="select-from"></select>

      <label for="select-to">To:</label>
      <select id="select-to"></select>

      <button id="convert-btn">Convert</button>

      <p class="result" id="result"></p>
    </div> 
`
const convertBtn = document.getElementById('convert-btn');
const distanceValue = document.getElementById('distance-value');
const selectFrom = document.getElementById('select-from');
const selectTo = document.getElementById('select-to');
const result = document.getElementById('result');

// Filling drop-down lists with values from conversionRules
function populateSelectOptions() {
  const convertationRules = JSON.parse(JSON.stringify(rules));

  for (const unit of Object.keys(convertationRules)) {
    const optionFrom = document.createElement('option');
    optionFrom.value = unit;
    optionFrom.textContent = unit;
    selectFrom!.appendChild(optionFrom);

    const optionTo = document.createElement('option');
    optionTo.value = unit;
    optionTo.textContent = unit;
    selectTo!.appendChild(optionTo);
  }
}

populateSelectOptions();

convertBtn!.addEventListener('click', () => {
  const distance = (distanceValue && distanceValue instanceof HTMLInputElement) && parseFloat(distanceValue.value);

  if (!distance || isNaN(distance)) {
    result!.textContent = 'Enter the distance value';
    return;
  }

  const fromUnit = (selectFrom && selectFrom instanceof HTMLSelectElement) && selectFrom.value;
  const toUnit = (selectTo && selectTo instanceof HTMLSelectElement) && selectTo.value;

  const jsonToConvert = JSON.stringify({
    distance: { unit: fromUnit, value: distance },
    convert_to: toUnit
  });

  try {
    const resultJson = convertDistance(jsonToConvert);
    result!.textContent = `Result: ${resultJson}`;
  } catch (error) {
    result!.textContent = `Error: ${error}`;
  }
});
