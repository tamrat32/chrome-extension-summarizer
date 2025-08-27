# Quick Summarizer (Chrome Extension · Manifest V3)

Summarize selected text directly in your browser. Everything runs locally, no API keys required.

## Features
- Right-click → "Summarize selection"
- Popup UI to paste text
- Options page to choose number of summary sentences
- Injects a bubble on page with summary

## Installation (Developer Mode)
1. Download this repo or copy files into a folder.
2. Open Chrome → `chrome://extensions`.
3. Enable **Developer mode**.
4. Click **Load unpacked** → select this folder.
5. Pin the extension to the toolbar.

## Tech Highlights
- Manifest V3 background service worker
- Context menus & content scripts
- Vanilla JS + HTML + CSS
