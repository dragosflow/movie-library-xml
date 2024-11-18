const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;
const { DOMParser } = require("xmldom");
const { XMLParser } = require("fast-xml-parser");
const sax = require("sax");
const { validateXML, memoryPages } = require("xmllint-wasm");
const xpath = require("xpath");

function createWindow() {
  const win = new BrowserWindow({
    width: 1600,
    height: 1200,
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

        // Handle <actorRef> inside <movie>
        if (node.name === "actorRef" && currentMovie) {
          currentElement = "actorRef";
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
          currentMovie.title = (currentMovie.title || "") + text;
        } else if (currentElement === "year" && currentMovie) {
          currentMovie.year = (currentMovie.year || "") + text;
        } else if (currentElement === "director" && currentMovie) {
          currentMovie.director = (currentMovie.director || "") + text;
        } else if (currentElement === "actorRef" && currentMovie) {
          currentMovie.actors.push(text.trim());
        } else if (currentElement === "name") {
          if (currentActor) {
            currentActor.name = (currentActor.name || "") + text;
          } else if (currentGenre) {
            currentGenre.name = (currentGenre.name || "") + text;
          }
        } else if (currentElement === "nationality" && currentActor) {
          currentActor.nationality = (currentActor.nationality || "") + text;
        } else if (currentElement === "description" && currentGenre) {
          currentGenre.description = (currentGenre.description || "") + text;
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

  ipcMain.handle(
    "validate-xml-with-domparser",
    async (e, xmlFilePath = null) => {
      const defaultXMLPath = path.join(
        __dirname,
        "assets/data/movieCollection.xml"
      );
      const schemaPath = path.join(__dirname, "assets/data/movieSchema.xsd");
      const dependencyXSDPath = path.join(
        __dirname,
        "assets/data/movieSchema.xsd"
      ); // Example dependency, if applicable

      const xmlPath = xmlFilePath || defaultXMLPath;
      console.log("Validating XML file:", xmlPath);
      try {
        // Load the XML and XSD files asynchronously
        const xmlData = await fsPromises.readFile(xmlPath, "utf8");
        const xsdData = await fsPromises.readFile(schemaPath, "utf8");
        const dependencyXsdData = await fsPromises.readFile(
          dependencyXSDPath,
          "utf8"
        );

        // Run validation with configuration for `xmllint-wasm`
        const validationResult = await validateXML({
          xml: [
            {
              fileName: path.basename(xmlPath),
              contents: xmlData,
            },
          ],
          schema: [
            {
              fileName: path.basename(schemaPath),
              contents: xsdData,
            },
          ],
          preload: [
            {
              fileName: "xml.xsd",
              contents: dependencyXsdData,
            },
          ],
          initialMemoryPages: 256,
          maxMemoryPages: 2 * memoryPages.GiB,
        });

        if (validationResult.valid) {
          return { valid: true, message: "XML is valid against the schema" };
        } else {
          return {
            valid: false,
            message: "XML validation errors found",
            errors: validationResult.errors,
          };
        }
      } catch (error) {
        console.error("Validation error:", error);
        return {
          valid: false,
          message: "An error occurred during validation",
          error: error.message,
        };
      }
    }
  );

  ipcMain.handle("run-xpath-query", async (event, { expression }) => {
    try {
      const xmlData = fs.readFileSync(
        path.join(__dirname, "assets/data/movieCollection.xml"),
        "utf8"
      );
      const doc = new DOMParser().parseFromString(xmlData, "application/xml");
      const result = xpath.select(expression, doc);

      const output = result.map((node) => node.toString());
      return { success: true, result: output };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
  ipcMain.handle("show-open-dialog", async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [{ name: "XML Files", extensions: ["xml"] }],
    });

    if (canceled) return { canceled, filePaths: [] };
    return { canceled, filePaths };
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
