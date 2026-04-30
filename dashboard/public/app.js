// State
let mode = 'real';
let tests = [];
let activeTest = null;
let currentSSE = null;
let runStart = null;
let searchTerm = '';
let collapsedKeys = new Set(); // for tree mode

// localStorage keys
const LS_COLLAPSED = 'cmicDash:collapsed';
const LS_LAST_TEST = 'cmicDash:lastTestId';

// DOM refs
const testList = document.getElementById('testList');
const sidebarSearch = document.getElementById('sidebarSearch');
const searchInput = document.getElementById('searchInput');
const searchCount = document.getElementById('searchCount');
const panelEmpty = document.getElementById('panelEmpty');
const panelActive = document.getElementById('panelActive');
const panelProject = document.getElementById('panelProject');
const panelTitle = document.getElementById('panelTitle');
const panelFile = document.getElementById('panelFile');
const panelPath = document.getElementById('panelPath');
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
const configBanner = document.getElementById('configBanner');
const configBannerText = document.getElementById('configBannerText');

// Clock
function updateTime() {
  const now = new Date();
  headerTime.textContent = now.toLocaleTimeString('en-AU', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  });
}
setInterval(updateTime, 1000);
updateTime();

// localStorage helpers
function loadCollapsed() {
  try {
    const raw = localStorage.getItem(LS_COLLAPSED);
    if (raw) collapsedKeys = new Set(JSON.parse(raw));
  } catch {}
}
function saveCollapsed() {
  try { localStorage.setItem(LS_COLLAPSED, JSON.stringify([...collapsedKeys])); } catch {}
}

// Mode label
function modeLabel(m) {
  return ({ mock: 'Mock Mode', real: 'Live', 'cmic-api': 'CMiC API' })[m] || m;
}

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
    tests = data.tests || [];
    mode = data.mode;

    modeBadge.textContent = modeLabel(mode);
    modeBadge.className = `mode-badge ${mode === 'cmic-api' ? 'cmic-api' : mode}`;

    if (mode === 'cmic-api') {
      sidebarSearch.classList.remove('hidden');
      loadCollapsed();
      await checkConfig();
    } else {
      sidebarSearch.classList.add('hidden');
    }

    renderTestList();
    restoreLastSelection();
  } catch (err) {
    testList.innerHTML = `<div class="loading-state" style="color:#ef4444;font-size:12px;font-family:monospace;">Failed to load tests</div>`;
  } finally {
    refreshBtn.classList.remove('spinning');
  }
}

async function checkConfig() {
  try {
    const res = await fetch('/api/config-status');
    const data = await res.json();
    if (!data.ok) {
      configBanner.classList.remove('hidden');
      if (data.missing) {
        configBannerText.textContent = 'bash/config not found. Copy bash/config.template to bash/config and set credentials before running tests.';
      } else {
        configBannerText.textContent = 'CMiC credentials are not set in bash/config. Tests will fail.';
      }
    } else {
      configBanner.classList.add('hidden');
    }
  } catch {}
}

function renderTestList() {
  if (!tests.length) {
    testList.innerHTML = `<div class="loading-state" style="font-size:12px;color:#6b7280;">No tests found</div>`;
    return;
  }

  if (mode === 'cmic-api') {
    renderTreeList();
  } else {
    renderFlatList();
  }
}

function renderFlatList() {
  testList.innerHTML = tests.map(t => `
    <div class="test-item" data-id="${escapeAttr(t.id)}" id="item-${sanitizeId(t.id)}">
      <span class="test-item-indicator"></span>
      <div class="test-item-body">
        <div class="test-item-desc" title="${escapeAttr(t.description)}">${escapeHtml(t.description)}</div>
        <div class="test-item-file">${escapeHtml(t.file || t.id)}</div>
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

function renderTreeList() {
  // Filter
  const term = searchTerm.trim().toLowerCase();
  const filtered = term
    ? tests.filter(t =>
        (t.description || '').toLowerCase().includes(term) ||
        (t.path || '').toLowerCase().includes(term) ||
        (t.slug || '').toLowerCase().includes(term))
    : tests;

  searchCount.textContent = term ? `${filtered.length} / ${tests.length}` : `${tests.length}`;

  if (!filtered.length) {
    testList.innerHTML = `<div class="loading-state" style="font-size:12px;color:#6b7280;">No matches</div>`;
    return;
  }

  // Group: module → submodule → endpoints
  const groups = new Map();
  for (const t of filtered) {
    if (!groups.has(t.module)) groups.set(t.module, new Map());
    const sub = groups.get(t.module);
    if (!sub.has(t.submodule)) sub.set(t.submodule, []);
    sub.get(t.submodule).push(t);
  }

  // When searching, force-expand everything; otherwise honour collapsed state.
  const forceExpand = term.length > 0;

  let html = '';
  for (const [module, subMap] of groups) {
    const moduleKey = `m:${module}`;
    const moduleCollapsed = !forceExpand && collapsedKeys.has(moduleKey);
    const moduleCount = [...subMap.values()].reduce((n, arr) => n + arr.length, 0);
    html += `
      <div class="tree-group module-group">
        <div class="tree-header module-header ${moduleCollapsed ? 'collapsed' : ''}" data-key="${escapeAttr(moduleKey)}">
          <span class="tree-caret">▾</span>
          <span class="tree-name">${escapeHtml(module)}</span>
          <span class="tree-count">${moduleCount}</span>
        </div>
        <div class="tree-body" ${moduleCollapsed ? 'style="display:none"' : ''}>`;
    for (const [submodule, items] of subMap) {
      const subKey = `s:${module}::${submodule}`;
      const subCollapsed = !forceExpand && collapsedKeys.has(subKey);
      html += `
          <div class="tree-group submodule-group">
            <div class="tree-header submodule-header ${subCollapsed ? 'collapsed' : ''}" data-key="${escapeAttr(subKey)}">
              <span class="tree-caret">▾</span>
              <span class="tree-name">${escapeHtml(submodule)}</span>
              <span class="tree-count">${items.length}</span>
            </div>
            <div class="tree-body" ${subCollapsed ? 'style="display:none"' : ''}>`;
      for (const t of items) {
        html += `
              <div class="test-item tree-leaf" data-id="${escapeAttr(t.id)}" id="item-${sanitizeId(t.id)}">
                <span class="test-item-indicator"></span>
                <div class="test-item-body">
                  <div class="test-item-desc" title="${escapeAttr(t.description)}">${escapeHtml(t.description)}</div>
                  <div class="test-item-file">${escapeHtml(t.path || '')}</div>
                </div>
              </div>`;
      }
      html += `
            </div>
          </div>`;
    }
    html += `
        </div>
      </div>`;
  }
  testList.innerHTML = html;

  // Click handlers
  testList.querySelectorAll('.tree-header').forEach(el => {
    el.addEventListener('click', () => {
      const key = el.dataset.key;
      if (collapsedKeys.has(key)) collapsedKeys.delete(key); else collapsedKeys.add(key);
      saveCollapsed();
      renderTestList();
      // re-mark active item
      if (activeTest) {
        const item = document.getElementById(`item-${sanitizeId(activeTest.id)}`);
        if (item) item.classList.add('active');
      }
    });
  });
  testList.querySelectorAll('.test-item').forEach(el => {
    el.addEventListener('click', (ev) => {
      ev.stopPropagation();
      const t = tests.find(x => x.id === el.dataset.id);
      if (t) selectTest(t);
    });
  });

  // Re-mark active
  if (activeTest) {
    const item = document.getElementById(`item-${sanitizeId(activeTest.id)}`);
    if (item) item.classList.add('active');
  }
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function escapeAttr(s) { return escapeHtml(s); }

function sanitizeId(id) {
  return String(id).replace(/[^a-zA-Z0-9-_]/g, '_');
}

function selectTest(test) {
  testList.querySelectorAll('.test-item').forEach(el => el.classList.remove('active'));
  const el = document.getElementById(`item-${sanitizeId(test.id)}`);
  if (el) el.classList.add('active');

  activeTest = test;
  try { localStorage.setItem(LS_LAST_TEST, test.id); } catch {}

  // Populate panel
  panelProject.textContent = test.project || (mode === 'cmic-api' ? 'cmic-api' : 'cmic');
  panelTitle.textContent = test.description;
  panelFile.textContent = test.file || test.id;

  if (mode === 'cmic-api' && test.path) {
    panelPath.textContent = `GET ${test.path}`;
    panelPath.classList.remove('hidden');
  } else {
    panelPath.classList.add('hidden');
  }

  clearOutput();
  setStatus('ready');
  hideResultBar();
  runBtn.disabled = false;

  panelEmpty.classList.add('hidden');
  panelActive.classList.remove('hidden');
}

function restoreLastSelection() {
  try {
    const last = localStorage.getItem(LS_LAST_TEST);
    if (!last) return;
    const t = tests.find(x => x.id === last);
    if (t) selectTest(t);
  } catch {}
}

function clearOutput() {
  outputPre.innerHTML = '<span class="output-placeholder">Test output will appear here...</span>';
}

let outputBuffer = '';

function appendOutput(text) {
  const placeholder = outputPre.querySelector('.output-placeholder');
  if (placeholder) placeholder.remove();

  outputBuffer += text;

  // Detect DNS / connection problems and surface a friendly note once.
  if (!outputPre.dataset.dnsHinted &&
      /Could not resolve host|No address associated with hostname|Connection timed out|Failed to connect/i.test(text)) {
    outputPre.dataset.dnsHinted = '1';
    const hint = document.createElement('span');
    hint.className = 'line-info';
    hint.textContent = '\n[Note: CMiC tenant URLs typically only resolve from inside the client Citrix environment.]\n';
    outputPre.appendChild(hint);
  }

  const lines = text.replace(/\x1b\[[0-9;]*[a-zA-Z]/g, '').split('\n');
  lines.forEach((line, i) => {
    if (!line && i === lines.length - 1) return;
    const span = document.createElement('span');
    span.textContent = line + '\n';
    if (/✓|passed/.test(line)) span.className = 'line-pass';
    else if (/✗|failed|Error|error/.test(line)) span.className = 'line-fail';
    outputPre.appendChild(span);
  });

  outputPre.scrollTop = outputPre.scrollHeight;
}

function tryPrettyJson() {
  if (mode !== 'cmic-api') return;
  // Pull last bracketed JSON document out of the buffered output.
  const trimmed = outputBuffer.trim();
  const firstBrace = trimmed.indexOf('{');
  const firstBracket = trimmed.indexOf('[');
  let start = -1;
  if (firstBrace >= 0 && (firstBracket < 0 || firstBrace < firstBracket)) start = firstBrace;
  else if (firstBracket >= 0) start = firstBracket;
  if (start < 0) return;
  const candidate = trimmed.slice(start);
  try {
    const obj = JSON.parse(candidate);
    const pretty = JSON.stringify(obj, null, 2);
    if (pretty === candidate) return; // already pretty
    outputPre.innerHTML = '';
    const span = document.createElement('span');
    span.textContent = pretty + '\n';
    outputPre.appendChild(span);
  } catch {}
}

function setStatus(state, label) {
  statusDot.className = 'status-dot ' + (state === 'ready' ? '' : state);
  const labels = { ready: 'Ready', running: 'Running…', passed: 'Passed', failed: 'Failed' };
  statusText.textContent = label || labels[state] || state;

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
  resultText.textContent = passed ? 'Request completed' : 'Request failed';
  resultDuration.textContent = durationMs != null ? `${(durationMs / 1000).toFixed(1)}s` : '';
  resultBar.classList.remove('hidden');
}

function hideResultBar() {
  resultBar.classList.add('hidden');
}

// Run a test via SSE
function runTest() {
  if (!activeTest || runBtn.disabled) return;

  if (currentSSE) { currentSSE.close(); currentSSE = null; }

  clearOutput();
  outputBuffer = '';
  delete outputPre.dataset.dnsHinted;
  hideResultBar();
  setStatus('running');
  runBtn.disabled = true;
  runStart = Date.now();

  const sse = new EventSource(`/api/run/${encodeURIComponent(activeTest.id).replace(/%2F/g, '/')}`);
  currentSSE = sse;

  sse.onmessage = (event) => {
    const msg = JSON.parse(event.data);

    if (msg.type === 'stdout' || msg.type === 'stderr') {
      appendOutput(msg.data);
    } else if (msg.type === 'exit') {
      const passed = msg.data.code === 0;
      const duration = Date.now() - runStart;
      if (passed) tryPrettyJson();
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

// Search
let searchTimer = null;
searchInput.addEventListener('input', () => {
  searchTerm = searchInput.value;
  clearTimeout(searchTimer);
  searchTimer = setTimeout(renderTestList, 80);
});

// Event listeners
runBtn.addEventListener('click', runTest);
clearBtn.addEventListener('click', () => { clearOutput(); outputBuffer = ''; });
refreshBtn.addEventListener('click', loadTests);

// Init
loadTests();
