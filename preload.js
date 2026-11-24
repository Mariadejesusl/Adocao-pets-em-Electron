const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {

  carregar: () => ipcRenderer.invoke('animais:carregar'),

  salvar: (animais) => ipcRenderer.invoke('animais:salvar', animais),

  confirmarExclusao: (nome) => ipcRenderer.invoke('animais:confirmar-exclusao', nome),

  onMenuNovoCadastro: (callback) => {
    ipcRenderer.on('animais:novo-cadastro', () => callback());
  }
});
