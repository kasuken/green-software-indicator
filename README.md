<p align="center"><img src="/icons/icon-128.png" /></p>

# Green Software Indicator

A Chrome/Edge browser extension that evaluates websites for green software development practices and displays colored badges indicating their environmental sustainability.

## Features

- **Real-time Analysis**: Automatically analyzes websites when you visit them
- **Visual Indicators**: Color-coded badges (green = excellent, yellow = good, red = needs improvement)
- **Detailed Breakdown**: Shows specific green software practices being followed
- **Performance Monitoring**: Tracks website efficiency metrics

## Green Software Practices Evaluated

1. **Image Optimization** - Uses modern image formats (WebP, AVIF) and lazy loading
2. **Minified Resources** - JavaScript and CSS files are compressed
3. **Compression** - Server-side compression enabled
4. **Reduced HTTP Requests** - Efficient resource bundling
5. **Energy Efficient Design** - Dark mode support, async loading

## Detailed Evaluation Criteria

### 1. Image Optimization (20% of score)
**What we check:**
- **Modern Formats**: Images using WebP or AVIF formats (more efficient compression)
- **Lazy Loading**: Images with `loading="lazy"` attribute to reduce initial page load
- **Threshold**: At least 50% of images must use optimization techniques

**Why it matters:** Optimized images can reduce data transfer by 25-35%, leading to lower energy consumption and faster load times.

### 2. Minified Resources (20% of score)
**What we check:**
- **JavaScript Files**: Scripts with `.min.js` extension or containing "minified" in the filename
- **CSS Files**: Stylesheets with `.min.css` extension or containing "minified" in the filename
- **Threshold**: At least 30% of external resources must be minified

**Why it matters:** Minified files reduce bandwidth usage by 10-40%, decreasing server load and energy consumption.

### 3. Compression Enabled (20% of score)
**What we check:**
- **HTTP Headers**: Meta tags indicating content encoding or compression
- **Server Configuration**: Evidence of gzip, brotli, or similar compression
- **Response Headers**: Content-Encoding headers (detected through meta tags)

**Why it matters:** Compression can reduce data transfer by 60-80%, significantly lowering network energy usage.

### 4. Reduced HTTP Requests (20% of score)
**What we check:**
- **Total Resource Count**: Combined external scripts, stylesheets, and images
- **Threshold**: Fewer than 20 external resources (indicates good bundling practices)
- **Resource Efficiency**: Evidence of sprite sheets, bundled assets, or CDN usage

**Why it matters:** Each HTTP request requires energy for DNS lookups, connection establishment, and data transfer. Fewer requests = less energy.

### 5. Energy Efficient Design (20% of score)
**What we check:**
- **Dark Mode Support**: 
  - `color-scheme` meta tag
  - `data-theme` attributes
  - CSS classes indicating dark mode
  - Black background colors
- **Async Loading**: Scripts with `async` or `defer` attributes (at least 50% of scripts)
- **Progressive Enhancement**: Non-blocking resource loading patterns

**Why it matters:** Dark themes can reduce screen energy consumption by 15-60% on OLED displays. Async loading prevents render-blocking and improves efficiency.

## Scoring System

- **Excellent (70-100%)**: Green badge ✓ - 4-5 criteria met
- **Good (40-69%)**: Yellow badge ~ - 2-3 criteria met  
- **Needs Improvement (0-39%)**: Red badge ✗ - 0-1 criteria met
- **Unable to Analyze**: Gray badge ? - Technical issues or restricted content

Each criterion contributes equally (20%) to the final score. The extension provides real-time feedback and detailed breakdowns to help developers understand which practices to implement.

## Installation

### For Development
1. Open Chrome/Edge and navigate to `chrome://extensions/` or `edge://extensions/`
2. Enable "Developer mode" in the top-right corner
3. Click "Load unpacked" and select this project folder
4. The extension icon should appear in your browser toolbar

### From Store (Coming Soon)
The extension will be available on the Chrome Web Store and Microsoft Edge Add-ons store.

## Usage

1. **Automatic Analysis**: The extension automatically analyzes websites as you browse
2. **View Results**: Click the extension icon to see detailed analysis
3. **Badge Indicators**: 
# 🌱 Green Software Indicator
   - ~ Yellow badge = Good practices (40-69% score) 
   - ✗ Red badge = Needs improvement (<40% score)
This is a Chrome/Edge browser extension that evaluates websites for green software development practices and displays colored badges. ♻️🌍

## Technical Details
## 📦 Project Overview
### Architecture
**Type**: Browser Extension (Chrome/Edge) 🧩
**Language**: JavaScript 💻
**Framework**: Manifest V3 Extension API 🛠️
**Purpose**: Evaluate and indicate green software development practices on websites 🌿

### Files Structure
## 🗂️ Project Structure
greenindicator/
├── manifest.json          # Extension configuration
├── background.js           # Service worker for analysis
├── content.js             # Content script for page monitoring
├── popup.html             # Extension popup interface
├── popup.css              # Popup styling
├── popup.js               # Popup functionality
├── icons/                 # Extension icons (16, 32, 48, 128px)
## ✨ Key Features
```

## Development

### Prerequisites
- Chrome/Edge browser with developer mode enabled
- Basic knowledge of JavaScript, HTML, CSS

### Testing
1. Load the extension in developer mode
2. Visit various websites to test analysis
## 📋 Green Software Evaluation Criteria
4. Use Chrome DevTools to inspect extension behavior

## 🛠️ Technical Implementation
1. Fork the repository
2. Create a feature branch
## 📝 Development Guidelines
4. Test thoroughly
5. Submit a pull request
## 📁 File Responsibilities
## Green Software Foundation
This extension is inspired by the principles of the [Green Software Foundation](https://greensoftware.foundation/), which promotes sustainable software development practices.
## 🧪 Installation & Testing
## License
MIT License - see [LICENSE](LICENSE) file for details
## 🔮 Future Enhancements
## Privacy
This extension:
## 🏆 Code Quality Standards
- Does not track browsing history
- Analyzes only the current page's technical characteristics
- Stores analysis results locally in your browser

## Support
For issues, feature requests, or contributions, please visit our GitHub repository.