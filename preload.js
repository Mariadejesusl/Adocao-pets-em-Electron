const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  carregar: () => ipcRenderer.invoke('carregar'),
  confirmarExclusao: (nome) => ipcRenderer.invoke('animais:confirmar-exclusao', nome),
  onMenuNovoCadastro: (callback) => {
    ipcRenderer.on('animais:novo-cadastro', () => callback());
  }
});