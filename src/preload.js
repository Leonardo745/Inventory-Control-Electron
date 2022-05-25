const { ipcRenderer, contextBridge } = require("electron");
const path = require('path');

contextBridge.exposeInMainWorld("Api", {
    sayHello: (arg) => ipcRenderer.invoke("say-hello", arg)
});



