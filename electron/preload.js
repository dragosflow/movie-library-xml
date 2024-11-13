const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  loadXMLData: () => ipcRenderer.invoke("load-xml-data"),
  loadXMLDataFast: () => ipcRenderer.invoke("load-xml-data-fast"),
  loadXMLDataSax: () => ipcRenderer.invoke("load-xml-data-sax"),
});
