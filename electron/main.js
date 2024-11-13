const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const { DOMParser } = require("xmldom");
const { XMLParser } = require("fast-xml-parser");
const sax = require("sax");
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

  /// for homework 1, using DOMParser
  ipcMain.handle("load-xml-data", async () => {
    const xmlData = fs.readFileSync(
      path.join(__dirname, "assets/data/movieCollection.xml"),
      "utf8"
    );
    const doc = new DOMParser().parseFromString(xmlData, "application/xml");
    return xmlData;
  });
  /// for homework 1, using FastParser
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

  /// for homework 1, using SAXParser
  ipcMain.handle("load-xml-data-sax", async () => {
    const xmlData = fs.readFileSync(
      path.join(__dirname, "assets/data/movieCollection.xml"),
      "utf8"
    );

    return new Promise((resolve, reject) => {
      const parser = sax.parser(true);
      const result = {
        movies: [],
        actors: [],
        genres: [],
      };
      let currentElement = null;
      let currentMovie = null;
      let currentActor = null;
      let currentGenre = null;

      parser.onopentag = (node) => {
        currentElement = node.name;

        // Handle <movie> element
        if (node.name === "movie") {
          currentMovie = { actors: [] };
          currentMovie.id = node.attributes.id;
          currentMovie.genreId = node.attributes.genreId;
        }

        // Handle <actor> inside <movie>
        if (node.name === "actor" && currentMovie) {
          currentMovie.actors.push({ actorId: node.attributes.actorId });
        }

        // Handle standalone <actor>
        if (node.name === "actor" && !currentMovie) {
          currentActor = { id: node.attributes.id };
        }

        // Handle <genre>
        if (node.name === "genre") {
          currentGenre = { id: node.attributes.id };
        }
      };

      parser.ontext = (text) => {
        if (currentElement === "title" && currentMovie) {
          currentMovie.title = text;
        } else if (currentElement === "year" && currentMovie) {
          currentMovie.year = text;
        } else if (currentElement === "director" && currentMovie) {
          currentMovie.director = text;
        } else if (currentElement === "name" && currentActor) {
          currentActor.name = text;
        } else if (currentElement === "nationality" && currentActor) {
          currentActor.nationality = text;
        } else if (currentElement === "name" && currentGenre) {
          currentGenre.name = text;
        } else if (currentElement === "description" && currentGenre) {
          currentGenre.description = text;
        }
      };

      parser.onclosetag = (name) => {
        if (name === "movie" && currentMovie) {
          result.movies.push(currentMovie);
          currentMovie = null;
        }
        if (name === "actor" && currentActor) {
          result.actors.push(currentActor);
          currentActor = null;
        }
        if (name === "genre" && currentGenre) {
          result.genres.push(currentGenre);
          currentGenre = null;
        }
        currentElement = null;
      };

      parser.onerror = (error) => {
        reject(error);
      };

      parser.onend = () => {
        resolve(result);
      };

      parser.write(xmlData).close();
    });
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
