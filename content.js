// Content script for additional page analysis
(function() {
  'use strict';

  // Monitor for dynamic content changes
  const observer = new MutationObserver((mutations) => {
    // Debounce the analysis to avoid excessive processing
    clearTimeout(window.greenSoftwareAnalysisTimeout);
    window.greenSoftwareAnalysisTimeout = setTimeout(() => {
      // Notify background script that content has changed
      chrome.runtime.sendMessage({
        action: 'contentChanged',
        url: window.location.href
      });
    }, 2000);
  });

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'style']
  });

  // Additional analysis functions that can be called from background script
  window.getPageMetrics = function() {
    return {
      domNodes: document.querySelectorAll('*').length,
      images: document.querySelectorAll('img').length,
      scripts: document.querySelectorAll('script').length,
      stylesheets: document.querySelectorAll('link[rel="stylesheet"]').length,
      hasServiceWorker: 'serviceWorker' in navigator,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };
  };

  // Performance monitoring
  window.getPerformanceMetrics = function() {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0];
      const resources = performance.getEntriesByType('resource');
      
      return {
        loadTime: navigation ? navigation.loadEventEnd - navigation.loadEventStart : 0,
        domContentLoaded: navigation ? navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart : 0,
        resourceCount: resources.length,
        totalTransferSize: resources.reduce((total, resource) => total + (resource.transferSize || 0), 0)
      };
    }
    return null;
  };

})();
