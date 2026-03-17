// Quantsurf Browser - Main Application

class QuantsurfBrowser {
    constructor() {
        this.tabs = [];
        this.activeTabId = null;
        this.tabCounter = 0;
        this.webviews = new Map();
        
        this.init();
    }

    init() {
        // Get DOM elements
        this.tabsContainer = document.getElementById('tabs');
        this.newTabBtn = document.getElementById('new-tab-btn');
        this.backBtn = document.getElementById('back-btn');
        this.forwardBtn = document.getElementById('forward-btn');
        this.reloadBtn = document.getElementById('reload-btn');
        this.urlInput = document.getElementById('url-input');
        this.webviewContainer = document.getElementById('webview-container');
        this.watchlistContent = document.getElementById('watchlist-content');
        this.newsContent = document.getElementById('news-content');

        // Setup event listeners
        this.setupEventListeners();

        // Create first tab
        this.createTab('https://www.google.com');

        // Load sample data
        this.loadWatchlist();
        this.loadNews();
    }

    setupEventListeners() {
        // New tab button
        this.newTabBtn.addEventListener('click', () => {
            this.createTab('https://www.google.com');
        });

        // Navigation buttons
        this.backBtn.addEventListener('click', () => {
            const webview = this.getActiveWebview();
            if (webview && webview.canGoBack()) {
                webview.goBack();
            }
        });

        this.forwardBtn.addEventListener('click', () => {
            const webview = this.getActiveWebview();
            if (webview && webview.canGoForward()) {
                webview.goForward();
            }
        });

        this.reloadBtn.addEventListener('click', () => {
            const webview = this.getActiveWebview();
            if (webview) {
                webview.reload();
            }
        });

        // URL input
        this.urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.navigateToUrl(this.urlInput.value);
            }
        });
    }

    createTab(url) {
        const tabId = `tab-${this.tabCounter++}`;
        
        // Create tab element
        const tabEl = document.createElement('div');
        tabEl.className = 'tab';
        tabEl.dataset.tabId = tabId;
        tabEl.innerHTML = `
            <span class="tab-title">New Tab</span>
            <button class="tab-close">×</button>
        `;

        // Tab click
        tabEl.addEventListener('click', (e) => {
            if (!e.target.classList.contains('tab-close')) {
                this.activateTab(tabId);
            }
        });

        // Close button
        tabEl.querySelector('.tab-close').addEventListener('click', (e) => {
            e.stopPropagation();
            this.closeTab(tabId);
        });

        this.tabsContainer.appendChild(tabEl);

        // Create webview
        // Create webview
        const webview = document.createElement('webview');
        webview.src = url;
        webview.style.width = '100%';
        webview.style.height = '100%';
        webview.setAttribute('allowpopups', '');
        webview.setAttribute('allowfullscreen', '');

// Fullscreen support
        webview.addEventListener('enter-html-full-screen', () => {
        webview.style.position = 'fixed';
        webview.style.top = '0';
        webview.style.left = '0';
        webview.style.width = '100vw';
        webview.style.height = '100vh';
        webview.style.zIndex = '9999';
        });

        webview.addEventListener('leave-html-full-screen', () => {
        webview.style.position = '';
        webview.style.top = '';
        webview.style.left = '';
        webview.style.width = '100%';
         webview.style.height = '100%';
        webview.style.zIndex = '';  
            });

        // Webview events
        webview.addEventListener('page-title-updated', (e) => {
            const title = e.title || 'New Tab';
            tabEl.querySelector('.tab-title').textContent = title;
        });

        webview.addEventListener('did-navigate', (e) => {
            if (this.activeTabId === tabId) {
                this.urlInput.value = e.url;
            }
        });

        webview.addEventListener('did-navigate-in-page', (e) => {
            if (this.activeTabId === tabId) {
                this.urlInput.value = e.url;
            }
        });

        webview.addEventListener('new-window', (e) => {
            this.createTab(e.url);
        });

        this.webviewContainer.appendChild(webview);
        this.webviews.set(tabId, webview);

        // Store tab data
        this.tabs.push({ id: tabId, element: tabEl, webview: webview, url: url });

        // Activate this tab
        this.activateTab(tabId);
    }

    activateTab(tabId) {
        // Deactivate all tabs
        this.tabs.forEach(tab => {
            tab.element.classList.remove('active');
            tab.webview.classList.remove('active');
        });

        // Activate selected tab
        const tab = this.tabs.find(t => t.id === tabId);
        if (tab) {
            tab.element.classList.add('active');
            tab.webview.classList.add('active');
            this.activeTabId = tabId;

            // Update URL bar
            try {
                const url = tab.webview.getURL();
                if (url) this.urlInput.value = url;
            } catch (e) {
                this.urlInput.value = tab.url;
            }
        }
    }

    closeTab(tabId) {
        const index = this.tabs.findIndex(t => t.id === tabId);
        if (index === -1) return;

        const tab = this.tabs[index];

        // Remove elements
        if (tab.element) tab.element.remove();
        if (tab.webview) tab.webview.remove();

        // Remove from array
        this.tabs.splice(index, 1);
        this.webviews.delete(tabId);

        // Activate another tab or create new one
        if (this.activeTabId === tabId) {
            if (this.tabs.length > 0) {
                const newIndex = Math.max(0, index - 1);
                this.activateTab(this.tabs[newIndex].id);
            } else {
                this.createTab('https://www.google.com');
            }
        }
    }

    getActiveWebview() {
        return this.webviews.get(this.activeTabId);
    }

    navigateToUrl(input) {
        const webview = this.getActiveWebview();
        if (!webview || !input) return;

        let url = input.trim();

        // Check if it's a URL or search query
        if (url.includes('.') && !url.includes(' ')) {
            // Looks like a URL
            if (!url.match(/^https?:\/\//)) {
                url = 'https://' + url;
            }
        } else {
            // Search query
            url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
        }

        webview.loadURL(url);
    }

    loadWatchlist() {
        const saved = localStorage.getItem('quantsurf_watchlist');
        this.watchlistSymbols = saved ? JSON.parse(saved) : ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA'];
        this.renderWatchlist();

        // Add stock button
        const addBtn = document.getElementById('add-stock-btn');
        const addInput = document.getElementById('add-stock-input');

        addBtn.addEventListener('click', () => this.addStock(addInput));
        addInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addStock(addInput);
        });
    }

    addStock(input) {
        const symbol = input.value.trim().toUpperCase();
        if (!symbol || this.watchlistSymbols.includes(symbol)) return;
        this.watchlistSymbols.push(symbol);
        localStorage.setItem('quantsurf_watchlist', JSON.stringify(this.watchlistSymbols));
        this.renderWatchlist();
        input.value = '';
    }

    removeStock(symbol) {
        this.watchlistSymbols = this.watchlistSymbols.filter(s => s !== symbol);
        localStorage.setItem('quantsurf_watchlist', JSON.stringify(this.watchlistSymbols));
        this.renderWatchlist();
    }

    renderWatchlist() {
        this.watchlistContent.innerHTML = this.watchlistSymbols.map(symbol => {
            const price = (Math.random() * 400 + 50).toFixed(2);
            const change = (Math.random() * 10 - 5).toFixed(2);
            const percent = (Math.random() * 4 - 2).toFixed(2);
            const changeClass = change >= 0 ? 'positive' : 'negative';
            const sign = change >= 0 ? '+' : '';
            return `
                <div class="stock-item" data-symbol="${symbol}">
                    <button class="remove-btn" data-remove-stock="${symbol}">×</button>
                    <div class="stock-symbol">${symbol}</div>
                    <div class="stock-price">$${price}</div>
                    <div class="stock-change ${changeClass}">
                        ${sign}${change} (${sign}${percent}%)
                    </div>
                </div>
            `;
        }).join('');

        // Attach remove handlers
        this.watchlistContent.querySelectorAll('[data-remove-stock]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.removeStock(btn.dataset.removeStock);
            });
        });
    }

    loadNews() {
        const saved = localStorage.getItem('quantsurf_news_sources');
        this.newsSources = saved ? JSON.parse(saved) : [
            'https://bloomberg.com',
            'https://finance.yahoo.com',
            'https://reuters.com',
            'https://wsj.com',
            'https://cnbc.com'
        ];
        this.renderNews();

        // Add news button
        const addBtn = document.getElementById('add-news-btn');
        const addInput = document.getElementById('add-news-input');

        addBtn.addEventListener('click', () => this.addNewsSource(addInput));
        addInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addNewsSource(addInput);
        });
    }

    addNewsSource(input) {
        let url = input.value.trim();
        if (!url) return;
        if (!url.match(/^https?:\/\//)) url = 'https://' + url;
        if (this.newsSources.includes(url)) return;
        this.newsSources.push(url);
        localStorage.setItem('quantsurf_news_sources', JSON.stringify(this.newsSources));
        this.renderNews();
        input.value = '';
    }

    removeNewsSource(url) {
        this.newsSources = this.newsSources.filter(s => s !== url);
        localStorage.setItem('quantsurf_news_sources', JSON.stringify(this.newsSources));
        this.renderNews();
    }

    renderNews() {
        this.newsContent.innerHTML = this.newsSources.map(url => {
            const name = new URL(url).hostname.replace('www.', '');
            return `
                <div class="news-item clickable" data-news-url="${url}">
                    <button class="remove-btn" data-remove-news="${url}">×</button>
                    <div class="news-title">${name}</div>
                    <div class="news-source">${url}</div>
                </div>
            `;
        }).join('');

        // Attach click-to-open handlers
        this.newsContent.querySelectorAll('[data-news-url]').forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target.classList.contains('remove-btn')) return;
                this.navigateToUrl(item.dataset.newsUrl);
            });
        });

        // Attach remove handlers
        this.newsContent.querySelectorAll('[data-remove-news]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.removeNewsSource(btn.dataset.removeNews);
            });
        });
    }
}
// Toggle watchlist panel
    const toggleWatchlistBtn = document.getElementById('toggle-watchlist');
    const watchlistPanel = document.getElementById('watchlist-panel');
    let watchlistVisible = true;

    toggleWatchlistBtn.addEventListener('click', () => {
        watchlistVisible = !watchlistVisible;
        if (watchlistVisible) {
         watchlistPanel.classList.remove('hidden');
         toggleWatchlistBtn.classList.add('active');
     } else {
          watchlistPanel.classList.add('hidden');
          toggleWatchlistBtn.classList.remove('active');
      }
    });
    toggleWatchlistBtn.classList.add('active'); // Start visible

// Toggle news panel
    const toggleNewsBtn = document.getElementById('toggle-news');
    const newsPanel = document.getElementById('news-panel');
    let newsVisible = true;

    toggleNewsBtn.addEventListener('click', () => {
       newsVisible = !newsVisible;
      if (newsVisible) {
        newsPanel.classList.remove('hidden');
        toggleNewsBtn.classList.add('active');
      } else {
             newsPanel.classList.add('hidden');
         toggleNewsBtn.classList.remove('active');
     }
    });
    toggleNewsBtn.classList.add('active'); // Start visible

// Start the application
const browser = new QuantsurfBrowser();

// Overlay visibility toggle
const overlay = document.getElementById('browser-overlay');
const hideOverlayBtn = document.getElementById('hide-overlay-btn');

document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === '/') {
        overlay.classList.toggle('hidden-ui');
    }
});

hideOverlayBtn.addEventListener('click', () => {
    overlay.classList.add('hidden-ui');
});
