const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  onMenuNovoCadastro: (callback) => {
    ipcRenderer.on('animais:novo-cadastro', () => callback());
  }
});