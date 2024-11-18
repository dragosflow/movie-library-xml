const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  loadXMLData: () => ipcRenderer.invoke("load-xml-data"),
  loadXMLDataFast: () => ipcRenderer.invoke("load-xml-data-fast"),
  loadXMLDataSax: () => ipcRenderer.invoke("load-xml-data-sax"),
  validateXMLWithDOMParser: (filePath = null) =>
    ipcRenderer.invoke("validate-xml-with-domparser", filePath),
  showOpenDialog: () => ipcRenderer.invoke("show-open-dialog"),
  runXpathQuery: (query) => ipcRenderer.invoke("run-xpath-query", query),
});
