const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  carregar: () => ipcRenderer.invoke('carregar')
});