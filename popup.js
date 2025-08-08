document.addEventListener('DOMContentLoaded', async () => {
  const loadingEl = document.getElementById('loading');
  const resultsEl = document.getElementById('results');
  const errorEl = document.getElementById('error');
  
  try {
    // Get current tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab || !tab.url || !tab.url.startsWith('http')) {
      showError();
      return;
    }

    // Get analysis from storage
    const result = await chrome.storage.local.get(`analysis_${tab.id}`);
    const analysis = result[`analysis_${tab.id}`];

    if (analysis) {
      displayResults(analysis);
    } else {
      // No analysis available, trigger a new one
      await triggerAnalysis(tab.id);
      // Show loading state for a bit, then try to get results
      setTimeout(async () => {
        const newResult = await chrome.storage.local.get(`analysis_${tab.id}`);
        const newAnalysis = newResult[`analysis_${tab.id}`];
        
        if (newAnalysis) {
          displayResults(newAnalysis);
        } else {
          showError();
        }
      }, 3000);
    }
  } catch (error) {
    console.error('Error loading popup:', error);
    showError();
  }

  // Event listeners
  document.getElementById('reanalyze')?.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab) {
      showLoading();
      await triggerAnalysis(tab.id);
      setTimeout(async () => {
        const result = await chrome.storage.local.get(`analysis_${tab.id}`);
        const analysis = result[`analysis_${tab.id}`];
        if (analysis) {
          displayResults(analysis);
        }
      }, 3000);
    }
  });

  document.getElementById('learn-more')?.addEventListener('click', () => {
    chrome.tabs.create({
      url: 'https://greensoftware.foundation/'
    });
  });

  // Criteria modal event listeners
  document.getElementById('criteria-info')?.addEventListener('click', () => {
    document.getElementById('criteria-modal').style.display = 'flex';
  });

  document.getElementById('close-modal')?.addEventListener('click', () => {
    document.getElementById('criteria-modal').style.display = 'none';
  });

  // Close modal when clicking outside
  document.getElementById('criteria-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'criteria-modal') {
      document.getElementById('criteria-modal').style.display = 'none';
    }
  });
});

function showLoading() {
  document.getElementById('loading').style.display = 'block';
  document.getElementById('results').style.display = 'none';
  document.getElementById('error').style.display = 'none';
}

function showError() {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('results').style.display = 'none';
  document.getElementById('error').style.display = 'block';
}

function displayResults(analysis) {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('error').style.display = 'none';
  document.getElementById('results').style.display = 'block';

  // Update badge
  const badge = document.getElementById('badge');
  const rating = document.getElementById('rating');
  const score = document.getElementById('score');

  badge.className = `badge ${analysis.rating}`;
  rating.className = `rating ${analysis.rating}`;
  
  switch (analysis.rating) {
    case 'good':
      badge.textContent = '✓';
      rating.textContent = 'Excellent';
      break;
    case 'average':
      badge.textContent = '~';
      rating.textContent = 'Good';
      break;
    case 'poor':
      badge.textContent = '✗';
      rating.textContent = 'Needs Improvement';
      break;
    default:
      badge.textContent = '?';
      rating.textContent = 'Unknown';
  }

  score.textContent = `Score: ${Math.round(analysis.score)}%`;

  // Update practice items
  const practices = [
    'imageOptimization',
    'minifiedResources', 
    'compressionEnabled',
    'reducedRequests',
    'energyEfficientDesign'
  ];

  practices.forEach(practice => {
    const item = document.getElementById(practice);
    const status = item.querySelector('.status');
    
    if (analysis.details[practice]) {
      status.textContent = '✓';
      status.className = 'status good';
    } else {
      status.textContent = '✗';
      status.className = 'status poor';
    }
  });
}

async function triggerAnalysis(tabId) {
  try {
    await chrome.runtime.sendMessage({
      action: 'analyzeTab',
      tabId: tabId
    });
  } catch (error) {
    console.error('Error triggering analysis:', error);
  }
}
