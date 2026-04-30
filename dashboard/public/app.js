// State
let tests = [];
let activeTest = null;
let currentSSE = null;
let runStart = null;

// DOM refs
const testList = document.getElementById('testList');
const panelEmpty = document.getElementById('panelEmpty');
const panelActive = document.getElementById('panelActive');
const panelProject = document.getElementById('panelProject');
const panelTitle = document.getElementById('panelTitle');
const panelFile = document.getElementById('panelFile');
const runBtn = document.getElementById('runBtn');
const clearBtn = document.getElementById('clearBtn');
const outputPre = document.getElementById('outputPre');
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');
const resultBar = document.getElementById('resultBar');
const resultIcon = document.getElementById('resultIcon');
const resultText = document.getElementById('resultText');
const resultDuration = document.getElementById('resultDuration');
const modeBadge = document.getElementById('modeBadge');
const refreshBtn = document.getElementById('refreshBtn');
const headerTime = document.getElementById('headerTime');

// Clock
function updateTime() {
  const now = new Date();
  headerTime.textContent = now.toLocaleTimeString('en-AU', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  });
}
setInterval(updateTime, 1000);
updateTime();

// Load tests
async function loadTests() {
  testList.innerHTML = `<div class="loading-state">
    <span class="loading-dot"></span>
    <span class="loading-dot"></span>
    <span class="loading-dot"></span>
  </div>`;
  refreshBtn.classList.add('spinning');

  try {
    const res = await fetch('/api/tests');
    const data = await res.json();
    tests = data.tests;

    modeBadge.textContent = data.mode === 'mock' ? 'Mock Mode' : 'Live';
    modeBadge.className = `mode-badge ${data.mode}`;

    renderTestList();
  } catch (err) {
    testList.innerHTML = `<div class="loading-state" style="color:#ef4444;font-size:12px;font-family:monospace;">Failed to load tests</div>`;
  } finally {
    refreshBtn.classList.remove('spinning');
  }
}

function renderTestList() {
  if (!tests.length) {
    testList.innerHTML = `<div class="loading-state" style="font-size:12px;color:#6b7280;">No tests found</div>`;
    return;
  }

  testList.innerHTML = tests.map(t => `
    <div class="test-item" data-id="${t.id}" id="item-${sanitizeId(t.id)}">
      <span class="test-item-indicator"></span>
      <div class="test-item-body">
        <div class="test-item-desc" title="${t.description}">${t.description}</div>
        <div class="test-item-file">${t.file || t.id}</div>
      </div>
    </div>
  `).join('');

  testList.querySelectorAll('.test-item').forEach(el => {
    el.addEventListener('click', () => {
      const t = tests.find(x => x.id === el.dataset.id);
      if (t) selectTest(t);
    });
  });
}

function sanitizeId(id) {
  return id.replace(/[^a-zA-Z0-9-_]/g, '_');
}

function selectTest(test) {
  // Clear active state on all items
  testList.querySelectorAll('.test-item').forEach(el => el.classList.remove('active'));
  const el = document.getElementById(`item-${sanitizeId(test.id)}`);
  if (el) el.classList.add('active');

  activeTest = test;

  // Populate panel
  panelProject.textContent = test.project || 'cmic';
  panelTitle.textContent = test.description;
  panelFile.textContent = test.file || test.id;

  // Reset state
  clearOutput();
  setStatus('ready');
  hideResultBar();
  runBtn.disabled = false;

  panelEmpty.classList.add('hidden');
  panelActive.classList.remove('hidden');
}

function clearOutput() {
  outputPre.innerHTML = '<span class="output-placeholder">Test output will appear here...</span>';
}

function appendOutput(text) {
  // Remove placeholder if present
  const placeholder = outputPre.querySelector('.output-placeholder');
  if (placeholder) placeholder.remove();

  // Colour key lines
  const lines = text.replace(/\x1b\[[0-9;]*[a-zA-Z]/g, '').split('\n');
  lines.forEach((line, i) => {
    if (!line && i === lines.length - 1) return;
    const span = document.createElement('span');
    span.textContent = line + '\n';
    if (/✓|passed/.test(line)) span.className = 'line-pass';
    else if (/✗|failed|Error|error/.test(line)) span.className = 'line-fail';
    outputPre.appendChild(span);
  });

  // Auto-scroll
  outputPre.scrollTop = outputPre.scrollHeight;
}

function setStatus(state, label) {
  statusDot.className = 'status-dot ' + (state === 'ready' ? '' : state);
  const labels = { ready: 'Ready', running: 'Running…', passed: 'Passed', failed: 'Failed' };
  statusText.textContent = label || labels[state] || state;

  // Update sidebar item
  if (activeTest) {
    const el = document.getElementById(`item-${sanitizeId(activeTest.id)}`);
    if (el) {
      el.classList.remove('running', 'passed', 'failed');
      if (state !== 'ready') el.classList.add(state);
    }
  }
}

function showResultBar(passed, durationMs) {
  resultBar.className = `result-bar ${passed ? 'pass' : 'fail'}`;
  resultIcon.textContent = passed ? '✓' : '✗';
  resultText.textContent = passed ? 'All checks passed' : 'Test failed';
  resultDuration.textContent = durationMs != null ? `${(durationMs / 1000).toFixed(1)}s` : '';
  resultBar.classList.remove('hidden');
}

function hideResultBar() {
  resultBar.classList.add('hidden');
}

// Run a test via SSE
function runTest() {
  if (!activeTest || runBtn.disabled) return;

  // Abort any existing run
  if (currentSSE) { currentSSE.close(); currentSSE = null; }

  clearOutput();
  hideResultBar();
  setStatus('running');
  runBtn.disabled = true;
  runStart = Date.now();

  const sse = new EventSource(`/api/run/${encodeURIComponent(activeTest.id)}`);
  currentSSE = sse;

  sse.onmessage = (event) => {
    const msg = JSON.parse(event.data);

    if (msg.type === 'stdout' || msg.type === 'stderr') {
      appendOutput(msg.data);
    } else if (msg.type === 'exit') {
      const passed = msg.data.code === 0;
      const duration = Date.now() - runStart;
      setStatus(passed ? 'passed' : 'failed');
      showResultBar(passed, duration);
      runBtn.disabled = false;
      sse.close();
      currentSSE = null;
    }
  };

  sse.onerror = () => {
    appendOutput('\n[Connection lost]');
    setStatus('failed');
    runBtn.disabled = false;
    sse.close();
    currentSSE = null;
  };
}

// Event listeners
runBtn.addEventListener('click', runTest);
clearBtn.addEventListener('click', clearOutput);
refreshBtn.addEventListener('click', loadTests);

// Init
loadTests();
