<img src="assets/icon.png" alt="finsurf Logo" width="80" height="80" />

# finsurf Browser

**A futuristic, AI-powered desktop browser built for traders and power users.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Made with Electron](https://img.shields.io/badge/Made%20with-Electron-47848F?logo=electron)](https://electronjs.org)
[![Version](https://img.shields.io/badge/version-1.0.0-brightgreen.svg)](CHANGELOG.md)

[Features](#-features) · [Screenshots](#-screenshots) · [Installation](#-installation) · [Usage](#-usage) · [Tech Stack](#-tech-stack) · [Contributing](#-contributing)



---

## 🌟 Overview

finsurf is a desktop web browser built with **Electron** and designed from the ground up for the modern financial workspace. It wraps a full Chromium browsing engine with a sleek, dark-mode interface, a real-time stock watchlist, curated news panel, and a powerful AI assistant that can control the browser using natural language.

Think of it as your browser + Bloomberg Terminal + AI copilot — all in one window.

---

## ✨ Features

### 🤖 AI-Powered Assistant
- Chat with an AI that understands **browser commands** in natural language
  - *"Open TradingView"*, *"Add AAPL to watchlist"*, *"Hide the news panel"*
- Supports **three AI providers**: Groq (Llama 3.3), OpenAI (GPT-4o mini), Google Gemini
- Seamless API key management per provider

### 🛡️ Smart Ad Blocker
- Dual-layer ad blocking: filter list + **AI heuristic detector**
- Blocks tracking pixels, ad networks, and suspicious request patterns
- Zero-config — works out of the box

### 🎨 Deep UI Customization
- Floating **Customize UI panel** with 5 sections:
  - **Theme**: Accent color, background, glass blur, border radius, font, preset themes
  - **Layout**: Tab position, sidebar width, component visibility
  - **Widgets**: Toggle Watchlist, News, AI panel, Split View
  - **Behavior**: Animations, Focus mode, Tab grouping style
  - **Advanced**: AI layout suggestions, profile saving, JSON export/import
- Live preview — changes apply instantly, persisted across sessions

### 📊 Financial Workspace
- **Live Watchlist** — track stock symbols with price & change indicators
- **News Panel** — curate and open financial news sources in one click
- Both panels are toggleable, resizable, and AI-controllable

### 🗂️ Tab Management
- Multi-tab browsing with smooth pill-style tabs
- **Split View** — browse two pages side by side
- **Picture-in-Picture** video support
- **Vertical / bottom tab** positioning via Customize panel

### ⚡ Performance
- Background tab optimization — sleeping inactive tabs
- Smart context menu with custom actions
- Full keyboard shortcut support

---

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

| Tool | Version | Link |
|------|---------|------|
| **Node.js** | v18+ | [nodejs.org](https://nodejs.org) |
| **npm** | v9+ | Bundled with Node.js |
| **Git** | Any | [git-scm.com](https://git-scm.com) |

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/finsurf-browser.git

# 2. Navigate into the project directory
cd finsurf-browser

# 3. Install dependencies
npm install

# 4. Start the application
npm start
```

That's it! finsurf will launch as a desktop application window.

### Development Mode

To start with DevTools open for debugging:

```bash
npm run dev
```

### Build for Distribution

To package the app into a distributable installer:

```bash
# Build for your current platform
npm run dist

# Build directory-only (no installer, faster)
npm run pack
```

> Output will be placed in the `dist/` folder.

---

## 🧭 Usage Guide

### Basic Browsing
1. Type a URL or search query in the **bottom floating URL bar**
2. Press `Enter` to navigate
3. Use `←` `→` `↻` buttons for back, forward, and reload
4. Press `Ctrl + /` to hide/show the entire UI overlay (distraction-free mode)

### Stock Watchlist
- Click `📊` in the toolbar to toggle the **Watchlist panel**
- Type a stock ticker (e.g. `AAPL`) in the input and press Enter/`+`
- Stocks update with simulated prices (live data integration coming soon)

### News Panel
- Click `📰` to toggle the **News panel**
- Add a news site URL (e.g. `bloomberg.com`)
- Click any item to open it in the main browser view

### AI Assistant
1. Click the **AI button** (bottom-right floating button)
2. Click ⚙️ to configure your **AI provider and API key**
3. Type natural language commands:
   - `"Open TradingView"` → navigates the browser
   - `"Add TSLA to my watchlist"`
   - `"Make the browser more minimal"`
   - `"Hide news panel"` / `"Show watchlist"`

### Customize UI
1. Click the **sliders icon** (top-right corner)
2. Use the 5-tab panel to customize everything in real-time:
   - **Save profiles** to switch between layouts
   - **Export** your layout as JSON to back it up
   - Use **AI suggestions** for instant preset optimizations

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Runtime** | [Electron](https://electronjs.org) v28 |
| **Frontend** | Vanilla HTML5, CSS3, JavaScript (ES2022) |
| **Styling** | Custom CSS with CSS Variables, Glassmorphism |
| **Fonts** | Google Fonts: Space Grotesk, DM Sans, JetBrains Mono |
| **AI — Groq** | [groq-sdk](https://www.npmjs.com/package/groq-sdk) (Llama 3.3 70B) |
| **AI — OpenAI** | [openai](https://www.npmjs.com/package/openai) (GPT-4o Mini) |
| **AI — Google** | [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai) (Gemini 1.5 Flash) |
| **Ad Blocking** | Custom heuristic AI detector + static filter list |
| **Packaging** | electron-builder |

---

## 📁 Folder Structure

finsurf-browser/
├── main.js
├── preload.js
├── renderer/
├── ai/
├── tabs/
├── adblock/
├── assets/
```

---

## 🔑 API Keys

finsurf requires an AI API key to use the AI assistant. You can choose any provider:

| Provider | Free Tier | Get Key |
|---|---|---|
| **Groq** | ✅ Generous free tier | [console.groq.com](https://console.groq.com) |
| **OpenAI** | ❌ Paid | [platform.openai.com](https://platform.openai.com/api-keys) |
| **Google Gemini** | ✅ Free tier available | [aistudio.google.com](https://aistudio.google.com) |

> Keys are stored locally in your browser's localStorage and are **never sent to any server** other than the chosen AI provider.

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for how to get started.

Quick steps:
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📋 Roadmap

- [ ] Live stock price API integration (Yahoo Finance / Alpha Vantage)
- [ ] Browser extensions support
- [ ] Vertical tab sidebar
- [ ] Cloud sync for layouts and profiles
- [ ] Bookmark manager with AI tagging
- [ ] Voice command support

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [Electron](https://electronjs.org) — the foundation that makes this possible
- [Groq](https://groq.com) — blazing-fast LLM inference
- [Google Fonts](https://fonts.google.com) — beautiful typography
---


**Made with ❤️ and a lot of `npm start`**

⭐ Star this repo if you found it useful!




Open for contribution , it will be great to receive updates!


