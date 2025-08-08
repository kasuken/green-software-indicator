// Background service worker for the Green Software Indicator extension
chrome.runtime.onInstalled.addListener(() => {
  console.log('Green Software Indicator extension installed');
});

// Listen for tab updates to analyze the website
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && tab.url.startsWith('http')) {
    analyzeWebsite(tabId, tab.url);
  }
});

// Listen for tab activation to update badge
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.url && tab.url.startsWith('http')) {
      updateBadgeForTab(activeInfo.tabId);
    }
  });
});

async function analyzeWebsite(tabId, url) {
  try {
    // Inject content script to analyze the website
    const results = await chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: analyzeGreenSoftwarePractices
    });

    if (results && results[0] && results[0].result) {
      const analysis = results[0].result;
      
      // Store the analysis result
      await chrome.storage.local.set({
        [`analysis_${tabId}`]: {
          url: url,
          score: analysis.score,
          rating: analysis.rating,
          details: analysis.details,
          timestamp: Date.now()
        }
      });

      // Update the badge
      updateBadge(tabId, analysis.rating);
    }
  } catch (error) {
    console.error('Error analyzing website:', error);
    updateBadge(tabId, 'unknown');
  }
}

function updateBadge(tabId, rating) {
  let color, text;
  
  switch (rating) {
    case 'good':
      color = '#22C55E'; // Green
      text = '✓';
      break;
    case 'average':
      color = '#EAB308'; // Yellow
      text = '~';
      break;
    case 'poor':
      color = '#EF4444'; // Red
      text = '✗';
      break;
    default:
      color = '#6B7280'; // Gray
      text = '?';
  }

  chrome.action.setBadgeText({ text: text, tabId: tabId });
  chrome.action.setBadgeBackgroundColor({ color: color, tabId: tabId });
}

async function updateBadgeForTab(tabId) {
  try {
    const result = await chrome.storage.local.get(`analysis_${tabId}`);
    const analysis = result[`analysis_${tabId}`];
    
    if (analysis) {
      updateBadge(tabId, analysis.rating);
    } else {
      updateBadge(tabId, 'unknown');
    }
  } catch (error) {
    console.error('Error updating badge:', error);
    updateBadge(tabId, 'unknown');
  }
}

// Function to be injected into the page
function analyzeGreenSoftwarePractices() {
  const analysis = {
    score: 0,
    rating: 'poor',
    details: {
      imageOptimization: false,
      minifiedResources: false,
      compressionEnabled: false,
      reducedRequests: false,
      energyEfficientDesign: false
    }
  };

  let score = 0;
  const maxScore = 5;

  // Check for image optimization
  const images = document.querySelectorAll('img');
  let optimizedImages = 0;
  images.forEach(img => {
    if (img.src.includes('.webp') || img.src.includes('.avif') || 
        img.hasAttribute('loading') && img.getAttribute('loading') === 'lazy') {
      optimizedImages++;
    }
  });
  if (images.length > 0 && optimizedImages / images.length > 0.5) {
    analysis.details.imageOptimization = true;
    score++;
  }

  // Check for minified resources
  const scripts = document.querySelectorAll('script[src]');
  const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
  let minifiedResources = 0;
  let totalResources = scripts.length + stylesheets.length;
  
  scripts.forEach(script => {
    if (script.src.includes('.min.') || script.src.includes('minified')) {
      minifiedResources++;
    }
  });
  stylesheets.forEach(link => {
    if (link.href.includes('.min.') || link.href.includes('minified')) {
      minifiedResources++;
    }
  });
  
  if (totalResources > 0 && minifiedResources / totalResources > 0.3) {
    analysis.details.minifiedResources = true;
    score++;
  }

  // Check for compression hints
  const metaTags = document.querySelectorAll('meta');
  let hasCompressionHints = false;
  metaTags.forEach(meta => {
    if (meta.getAttribute('http-equiv') === 'Content-Encoding' ||
        meta.getAttribute('name') === 'compression') {
      hasCompressionHints = true;
    }
  });
  if (hasCompressionHints) {
    analysis.details.compressionEnabled = true;
    score++;
  }

  // Check for reduced HTTP requests (bundling, sprites, etc.)
  const totalExternalResources = scripts.length + stylesheets.length + images.length;
  if (totalExternalResources < 20) { // Arbitrary threshold for "reasonable" number of requests
    analysis.details.reducedRequests = true;
    score++;
  }

  // Check for energy-efficient design patterns
  const darkModeSupport = document.querySelector('meta[name="color-scheme"]') || 
                         document.querySelector('[data-theme]') ||
                         document.querySelector('.dark-mode') ||
                         getComputedStyle(document.body).backgroundColor === 'rgb(0, 0, 0)';
  
  const asyncScripts = document.querySelectorAll('script[async], script[defer]');
  const energyEfficient = darkModeSupport || asyncScripts.length > scripts.length * 0.5;
  
  if (energyEfficient) {
    analysis.details.energyEfficientDesign = true;
    score++;
  }

  // Calculate final score and rating
  analysis.score = (score / maxScore) * 100;
  
  if (analysis.score >= 70) {
    analysis.rating = 'good';
  } else if (analysis.score >= 40) {
    analysis.rating = 'average';
  } else {
    analysis.rating = 'poor';
  }

  return analysis;
}
