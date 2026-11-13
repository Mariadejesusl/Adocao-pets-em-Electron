const { app, BrowserWindow,ipcMain  } = require('electron');
const path = require('node:path');


ipcMain.handle('carregar', async () => {
  return [];
});

function criarJanela() {
  const janela = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    },
  });

  janela.loadFile(path.join(__dirname, 'src', 'index.html'));
}

app.whenReady().then(criarJanela);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});