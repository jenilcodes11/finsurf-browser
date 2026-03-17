const { app, BrowserWindow, session } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webviewTag: true
    },
    fullscreenable: true
  });

  mainWindow.loadFile('renderer/index.html');

  // Block popups — load URL in current window instead
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    mainWindow.webContents.loadURL(url);
    return { action: 'deny' };
  });

  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    mainWindow.webContents.loadURL(url);
  });

  if (process.argv.includes('--dev')) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  // Ad blocking
  const blockedDomains = [
    'doubleclick.net',
    'googlesyndication.com',
    'googleadservices.com',
    'ads.yahoo.com',
    'amazon-adsystem.com',
    'adnxs.com',
    'ads-twitter.com',
    'facebookads.com'
  ];

  session.defaultSession.webRequest.onBeforeRequest((details, callback) => {
    if (blockedDomains.some(domain => details.url.includes(domain))) {
      callback({ cancel: true });
    } else {
      callback({ cancel: false });
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
