const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
const path = require('node:path');

let janela = null;

function criarJanela() {
  janela = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    },
  });

  janela.loadFile(path.join(__dirname, 'src', 'index.html'));

  janela.on('closed', function () {
    janela = null;
  });
}

function registrarHandlers() {
  ipcMain.handle('carregar', async function () {
    return [];
  });

  ipcMain.handle('animais:confirmar-exclusao', async function (evento, nome) {
    const resposta = await dialog.showMessageBox(janela, {
      type: 'question',
      buttons: ['Cancelar', 'Excluir'],
      defaultId: 0,
      cancelId: 0,
      message: `Excluir ${nome}?`
    });
    return resposta.response === 1;
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
  registrarHandlers();
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