const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

// listen for the app to be ready
app.on("ready", () => {
  mainWindow = new BrowserWindow();

  // setup the main window
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "main.html"),
      protocol: "file:",
      slashes: true
    })
  );

  // quit app when closed
  mainWindow.on("close", () => {
    app.quit();
  });

  // build the menu
  const mainMenu = Menu.buildFromTemplate(menuTemplate);

  // set the menu
  Menu.setApplicationMenu(mainMenu);
});

// create menu template
const menuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Quit",
        accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        }
      }
    ]
  }
];

// push empty menuItem for mac os
if (process.platform == "darwin") {
  menuTemplate.unshift({});
}

// add developer tools if dev mode
if (process.env.NODE_ENV !== "production") {
  menuTemplate.push({
    label: "Developer Tools",
    submenu: [
      {
        label: "Toggle DevTools",
        accelerator: process.platform == "darwin" ? "Command+I" : "Ctrl+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: "reload"
      }
    ]
  });
}
