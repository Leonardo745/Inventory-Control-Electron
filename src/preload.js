const { ipcRenderer, contextBridge } = require("electron");
const path = require('path');

contextBridge.exposeInMainWorld("Api", {
    saveData: (arg) => ipcRenderer.invoke("save-data", arg),
    readData: () => ipcRenderer.invoke("read-data")
});



