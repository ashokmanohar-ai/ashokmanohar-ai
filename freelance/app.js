'use strict';
const scenarios = {
  healthy: {quality:94,grounding:96,valid:true},
  schema: {quality:97,grounding:96,valid:false},
  grounding: {quality:95,grounding:62,valid:true}
};
function renderScenario(name) {
  const item = scenarios[name] || scenarios.healthy;
  for (const metric of ['quality','grounding']) {
    document.getElementById(metric).textContent = item[metric] + '%';
    document.getElementById(metric+'-bar').style.width = item[metric] + '%';
  }
  document.getElementById('schema').textContent = item.valid ? 'Valid' : 'Invalid';
  const passed = item.quality >= 90 && item.grounding >= 90 && item.valid;
  document.getElementById('verdict').className = 'verdict ' + (passed ? 'pass' : 'fail');
  document.getElementById('verdict-title').textContent = passed ? 'PASS · ready for human review' : 'BLOCK · evidence needs attention';
  document.getElementById('verdict-detail').textContent = !item.valid ? 'The schema contract fails. A high average does not override it.' : item.grounding < 90 ? 'Grounding is below 90%. Investigate evidence and retrieval before release.' : 'Both illustrative thresholds and the schema contract pass.';
}
document.getElementById('scenario').addEventListener('change', event => renderScenario(event.target.value));
