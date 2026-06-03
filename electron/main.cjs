const { app, BrowserWindow, shell } = require('electron');
const fs = require('fs');
const http = require('http');
const path = require('path');

let staticServer;

const mimeTypes = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain',
  '.webp': 'image/webp',
};

function resolveStaticPath(requestUrl) {
  const outDir = path.join(__dirname, '..', 'out');
  const url = new URL(requestUrl, 'http://127.0.0.1');
  const decodedPath = decodeURIComponent(url.pathname);
  const normalizedPath = path.normalize(decodedPath).replace(/^(\.\.(\/|\\|$))+/, '');
  let filePath = path.join(outDir, normalizedPath);

  if (!filePath.startsWith(outDir)) {
    return path.join(outDir, '404.html');
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  } else if (!path.extname(filePath)) {
    const cleanUrlFile = `${filePath}.html`;
    filePath = fs.existsSync(cleanUrlFile) ? cleanUrlFile : path.join(filePath, 'index.html');
  }

  return fs.existsSync(filePath) ? filePath : path.join(outDir, '404.html');
}

function startStaticServer() {
  return new Promise((resolve, reject) => {
    staticServer = http.createServer((request, response) => {
      const filePath = resolveStaticPath(request.url || '/');
      const extension = path.extname(filePath);

      response.writeHead(filePath.endsWith('404.html') ? 404 : 200, {
        'Content-Type': mimeTypes[extension] || 'application/octet-stream',
      });

      fs.createReadStream(filePath).pipe(response);
    });

    staticServer.on('error', reject);
    staticServer.listen(0, '127.0.0.1', () => {
      const address = staticServer.address();
      resolve(`http://127.0.0.1:${address.port}`);
    });
  });
}

async function createWindow() {
  const baseUrl = await startStaticServer();
  const window = new BrowserWindow({
    width: 1280,
    height: 840,
    minWidth: 960,
    minHeight: 640,
    title: 'Muum Repo Explorer',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  window.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  await window.loadURL(baseUrl);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (staticServer) {
    staticServer.close();
  }

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
