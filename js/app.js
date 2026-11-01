/**
 * Practical Malware Analysis - Chapter 1 Reverse Engineering Dashboard
 * Interactive Controller (app.js)
 * Student: Huỳnh Ngọc Hiếu (IAM302)
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTabs();
  initSubTabs();
  initSearchAndFilters();
  initStopwatch();
  initCodeCopyButtons();
});

/* ==========================================================================
   1. THEME CONTROLLER (DARK / LIGHT DUAL THEME)
   ========================================================================== */
function initTheme() {
  const savedTheme = localStorage.getItem('pma_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeButtonUI(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('pma_theme', newTheme);
  updateThemeButtonUI(newTheme);
  showToast(`Đã chuyển sang giao diện ${newTheme === 'dark' ? 'Tối (Cyber Dark)' : 'Sáng (Academic Light)'}`);
}

function updateThemeButtonUI(theme) {
  const themeBtn = document.getElementById('theme-btn');
  if (!themeBtn) return;
  if (theme === 'dark') {
    themeBtn.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
      Giao Diện Sáng
    `;
  } else {
    themeBtn.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
      Giao Diện Tối
    `;
  }
}

/* ==========================================================================
   2. TABS & SUB-TABS NAVIGATION
   ========================================================================== */
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  function activateTab(tabId, updateHash = true) {
    tabButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    tabContents.forEach(content => {
      content.classList.toggle('active', content.id === `tab-${tabId}`);
    });
    if (updateHash) {
      window.location.hash = tabId;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      activateTab(btn.dataset.tab);
    });
  });

  // Check URL hash on load
  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById(`tab-${hash}`)) {
    activateTab(hash, false);
  }

  window.addEventListener('hashchange', () => {
    const currentHash = window.location.hash.replace('#', '');
    if (currentHash && document.getElementById(`tab-${currentHash}`)) {
      activateTab(currentHash, false);
    }
  });
}

function initSubTabs() {
  const subTabBtns = document.querySelectorAll('.subtab-btn');
  const subTabContents = document.querySelectorAll('.subtab-content');

  subTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.subtab;
      subTabBtns.forEach(b => b.classList.toggle('active', b === btn));
      subTabContents.forEach(c => c.classList.toggle('active', c.id === targetId));
    });
  });
}

// Function to jump directly to specific subtab (useful from Overview or Presentation tabs)
function jumpToLab(labId) {
  // First switch to deepdive tab
  const deepDiveTabBtn = document.querySelector('[data-tab="deepdive"]');
  if (deepDiveTabBtn) deepDiveTabBtn.click();

  // Then activate specific subtab
  const subTabBtn = document.querySelector(`[data-subtab="${labId}"]`);
  if (subTabBtn) {
    setTimeout(() => {
      subTabBtn.click();
      const el = document.getElementById(labId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }
}

/* ==========================================================================
   3. SEARCH & FILTER IN IOCs TABLE
   ========================================================================== */
function initSearchAndFilters() {
  const searchInput = document.getElementById('ioc-search');
  const filterPills = document.querySelectorAll('.filter-pill');
  const tableRows = document.querySelectorAll('#ioc-table-body tr');

  function filterTable() {
    const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
    const activeFilter = document.querySelector('.filter-pill.active')?.dataset.filter || 'all';

    tableRows.forEach(row => {
      const text = row.innerText.toLowerCase();
      const category = row.dataset.category || '';

      const matchesSearch = query === '' || text.includes(query);
      const matchesFilter = activeFilter === 'all' || category === activeFilter;

      row.style.display = (matchesSearch && matchesFilter) ? '' : 'none';
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterTable);
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      filterTable();
    });
  });
}

/* ==========================================================================
   4. COPY HELPERS & TOAST
   ========================================================================== */
function copyToClipboard(text, successMessage = 'Đã sao chép vào bộ nhớ đệm!') {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMessage);
    }).catch(() => fallbackCopy(text, successMessage));
  } else {
    fallbackCopy(text, successMessage);
  }
}

function fallbackCopy(text, successMessage) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(successMessage);
  } catch (err) {
    showToast('Lỗi khi sao chép: ' + err, 'error');
  }
  document.body.removeChild(textArea);
}

function copyAllIOCs() {
  const iocData = [
    "[Lab 01-01] Lab01-01.exe MD5: bb7425b82141a1c0f7d60e5106676bb1",
    "[Lab 01-01] Lab01-01.exe SHA-256: 58898bd42c5bd3bf9b1389f0eee5b39cd59180e8370eb9ea838a0b327bd6fe47",
    "[Lab 01-01] Lab01-01.dll MD5: 290934c61de9176ad682ffdd65f0a669",
    "[Lab 01-01] Lab01-01.dll SHA-256: f50e42c8dd0ab5116709756c215fa127d140e72c842b0c36b85d398f6556eb14",
    "[Lab 01-01] C2 Server: 127.26.152.13:80",
    "[Lab 01-01] Dropped Hijack DLL: C:\\windows\\system32\\kerne132.dll",
    "[Lab 01-01] Mutex: SADFHUHF",
    "[Lab 01-02] Lab01-02.exe (Packed UPX) MD5: 8363436878404da0ae3e46991e355b83",
    "[Lab 01-02] Lab01-02_unpacked.exe MD5: ae4ca70697df5506bc610172cfc288e7",
    "[Lab 01-02] Windows Service: MalService (Display: Malservice)",
    "[Lab 01-02] Target DDoS URL: http://www.malwareanalysisbook.com",
    "[Lab 01-02] Mutex: HGL345",
    "[Lab 01-02] User-Agent: Internet Explorer 8.0",
    "[Lab 01-03] Lab01-03.exe (Packed FSG) MD5: 9c5c27494c28ed0b14853b346b113145",
    "[Lab 01-03] OEP: 0x00401090",
    "[Lab 01-04] Lab01-04.exe MD5: 625ac05fd47adc3c63700c3b30de79ab",
    "[Lab 01-04] Lab01-04.exe SHA-256: 0fa8276ed39f125b73f6048e4b0fb7f8e30029b12e3d861d80494204602273e",
    "[Lab 01-04] Resource #101 MD5: ee5a2eaddb0050ea8d1c54a7811db9ab",
    "[Lab 01-04] Temp Backup: %TEMP%\\winup.exe",
    "[Lab 01-04] Target Hijack: C:\\windows\\system32\\wupdmgr.exe",
    "[Lab 01-04] Stage 2 Dropped: C:\\windows\\system32\\wupdmgrd.exe",
    "[Lab 01-04] Remote Payload URL: http://www.practicalmalwareanalysis.com/updater.exe"
  ];
  copyToClipboard(iocData.join('\n'), 'Đã sao chép toàn bộ 22 chỉ số IOCs vào Clipboard!');
}

function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

function initCodeCopyButtons() {
  document.querySelectorAll('.copy-code-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.codeTarget;
      const targetCode = document.getElementById(targetId);
      if (targetCode) {
        copyToClipboard(targetCode.innerText, 'Đã sao chép mã nguồn vào Clipboard!');
      }
    });
  });
}

/* ==========================================================================
   5. PRESENTATION STUDIO STOPWATCH / TELEPROMPTER CONTROLLER
   ========================================================================== */
let stopwatchInterval = null;
let stopwatchSeconds = 0;
let isStopwatchRunning = false;

function initStopwatch() {
  const startBtn = document.getElementById('sw-start-btn');
  const resetBtn = document.getElementById('sw-reset-btn');

  if (startBtn) {
    startBtn.addEventListener('click', toggleStopwatch);
  }
  if (resetBtn) {
    resetBtn.addEventListener('click', resetStopwatch);
  }
}

function toggleStopwatch() {
  const startBtn = document.getElementById('sw-start-btn');
  if (!startBtn) return;

  if (isStopwatchRunning) {
    // Pause
    clearInterval(stopwatchInterval);
    isStopwatchRunning = false;
    startBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
      Tiếp Tục
    `;
    startBtn.className = 'btn btn-primary';
  } else {
    // Start
    isStopwatchRunning = true;
    startBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
      Tạm Dừng
    `;
    startBtn.className = 'btn btn-secondary';

    stopwatchInterval = setInterval(() => {
      stopwatchSeconds++;
      updateStopwatchDisplay();
      highlightActiveSegment(stopwatchSeconds);
    }, 1000);
  }
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchSeconds = 0;
  isStopwatchRunning = false;
  updateStopwatchDisplay();
  highlightActiveSegment(0);

  const startBtn = document.getElementById('sw-start-btn');
  if (startBtn) {
    startBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
      Bắt Đầu Quay
    `;
    startBtn.className = 'btn btn-primary';
  }
}

function updateStopwatchDisplay() {
  const display = document.getElementById('stopwatch-timer');
  if (!display) return;
  const mins = Math.floor(stopwatchSeconds / 60).toString().padStart(2, '0');
  const secs = (stopwatchSeconds % 60).toString().padStart(2, '0');
  display.innerText = `${mins}:${secs}`;
}

function highlightActiveSegment(seconds) {
  // Define segment thresholds in seconds
  // Segment 1: 0 - 150 (00:00 - 02:30)
  // Segment 2: 150 - 300 (02:30 - 05:00)
  // Segment 3: 300 - 450 (05:00 - 07:30)
  // Segment 4: 450 - 630 (07:30 - 10:30)
  // Segment 5: 630+ (10:30 - 11:30)

  let activeIndex = 0;
  if (seconds >= 0 && seconds < 150) activeIndex = 1;
  else if (seconds >= 150 && seconds < 300) activeIndex = 2;
  else if (seconds >= 300 && seconds < 450) activeIndex = 3;
  else if (seconds >= 450 && seconds < 630) activeIndex = 4;
  else if (seconds >= 630) activeIndex = 5;

  document.querySelectorAll('.segment-card').forEach((card, idx) => {
    const isCurrent = (idx + 1) === activeIndex;
    card.classList.toggle('active-segment', isCurrent);
  });
}
