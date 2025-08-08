# Green Software Indicator Extension - Copilot Instructions

This is a Chrome/Edge browser extension that evaluates websites for green software development practices and displays colored badges.

## Project Overview

**Type**: Browser Extension (Chrome/Edge)
**Language**: JavaScript
**Framework**: Manifest V3 Extension API
**Purpose**: Evaluate and indicate green software development practices on websites

## Project Structure

```
greenindicator/
├── manifest.json          # Extension configuration (Manifest V3)
├── background.js           # Service worker for analysis and badge management
├── content.js             # Content script for page monitoring
├── popup.html             # Extension popup interface
├── popup.css              # Popup styling
├── popup.js               # Popup functionality and UI logic
├── icons/                 # Extension icons (16, 32, 48, 128px)
│   ├── icon-16.png
│   ├── icon-32.png
│   ├── icon-48.png
│   └── icon-128.png
└── README.md              # Project documentation
```

## Key Features

1. **Real-time Website Analysis**: Automatically evaluates websites for green software practices
2. **Visual Badge System**: 
   - Green (✓) = Excellent (70%+ score)
   - Yellow (~) = Good (40-69% score)
   - Red (✗) = Needs improvement (<40% score)
   - Gray (?) = Unable to analyze
3. **Detailed Popup**: Shows breakdown of green software practices
4. **Performance Monitoring**: Tracks website efficiency metrics

## Green Software Evaluation Criteria

The extension evaluates websites based on:

1. **Image Optimization**: WebP/AVIF formats, lazy loading
2. **Minified Resources**: Compressed JavaScript and CSS files
3. **Compression**: Server-side compression enabled
4. **Reduced HTTP Requests**: Efficient resource bundling
5. **Energy Efficient Design**: Dark mode support, async loading

## Technical Implementation

- **Extension Architecture**: Manifest V3 with service worker
- **Analysis Engine**: JavaScript-based website evaluation
- **Storage**: Chrome storage API for caching results
- **UI**: HTML/CSS popup with real-time updates
- **Permissions**: activeTab, storage, scripting, host_permissions

## Development Guidelines

When working on this project:

1. **Follow Manifest V3 standards** - Use service workers instead of background scripts
2. **Security First** - Minimize permissions, validate all inputs
3. **Performance** - Cache analysis results, debounce evaluations
4. **User Experience** - Provide clear visual feedback and detailed information
5. **Green Software Principles** - Practice what we evaluate (efficient code, minimal resources)

## File Responsibilities

- **manifest.json**: Extension configuration, permissions, and metadata
- **background.js**: Core analysis logic, badge management, tab monitoring
- **content.js**: Page monitoring, performance metrics collection
- **popup.html/css/js**: User interface for displaying analysis results
- **icons/**: Visual branding (currently placeholders, need actual PNG files)

## Installation & Testing

1. Open Chrome/Edge and go to extensions page
2. Enable Developer mode
3. Load unpacked extension from project folder
4. Test on various websites to verify analysis accuracy

## Future Enhancements

Potential improvements to consider:
- Custom scoring weights for different practice types
- Website carbon footprint estimation
- Integration with Green Software Foundation APIs
- Detailed recommendations for improvements
- Export analysis reports
- Whitelist/blacklist functionality

## Code Quality Standards

- Use modern JavaScript (ES6+)
- Follow Chrome extension best practices
- Implement error handling and fallbacks
- Write clear, self-documenting code
- Test across different website types
