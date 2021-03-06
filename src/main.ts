import { app, BrowserWindow } from "electron";
import * as path from "path";

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 768,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    width: 1366,
  });

  mainWindow.center();

  // mainWindow.menuBarVisible = false;
  // mainWindow.resizable = false;

  mainWindow.loadFile(path.join(__dirname, "app/index.html"));
}

app.on("ready", () => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
