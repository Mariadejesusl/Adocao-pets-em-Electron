const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  carregar: () => ipcRenderer.invoke('carregar'),
  confirmarExclusao: (nome) => ipcRenderer.invoke('animais:confirmar-exclusao', nome)
});