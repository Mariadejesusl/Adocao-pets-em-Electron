const { app, BrowserWindow, Menu } = require('electron');
const path = require('node:path');

let janela = null;

function criarJanela() {
  janela = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  janela.loadFile(path.join(__dirname, 'src', 'index.html'));

  janela.on('closed', function () {
    janela = null;
  });
}

function criarMenu() {
  const modelo = [
    {
      label: 'Arquivo',
      submenu: [
        {
          label: 'Novo Cadastro',
          accelerator: 'CommandOrControl+N',
          click: function () {
            if (janela && !janela.isDestroyed()) {
              janela.webContents.send('animais:novo-cadastro');
            }
          }
        },
        { type: 'separator' },
        { label: 'Sair', role: 'quit' }
      ]
    },
    { role: 'editMenu' }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(modelo));
}

app.whenReady().then(function () {
  app.setName('Adoção Pet');
  criarMenu();
  criarJanela();
});

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) {
    criarJanela();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});