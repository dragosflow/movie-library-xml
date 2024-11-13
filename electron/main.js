const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const { DOMParser } = require("xmldom");
const { XMLParser } = require("fast-xml-parser");
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
  });

  win.loadURL("http://localhost:5173");

  ipcMain.handle("load-xml-data", async () => {
    const xmlData = fs.readFileSync(
      path.join(__dirname, "assets/data/movieCollection.xml"),
      "utf8"
    );
    const doc = new DOMParser().parseFromString(xmlData, "application/xml");
    return xmlData;
  });

  ipcMain.handle("load-xml-data-fast", async () => {
    const xmlData = fs.readFileSync(
      path.join(__dirname, "assets/data/movieCollection.xml"),
      "utf8"
    );

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "",
    });
    const jsonData = parser.parse(xmlData);
    return jsonData;
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
