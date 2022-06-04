const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const storage = require('electron-json-storage');
storage.setDataPath(path.join(__dirname, '../../data'));

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    minWidth: 800,
    minHeight: 600,
    resizable: false,
    title: 'Sistema de Estoque',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.handle('save-data', (event, args) => {
  console.log(args);

  storage.set('save', args, function (error) {
    if (error) throw error;
  });

  return 0;
});

ipcMain.handle('read-data', event => {
  var updatSave = false;
  var newSave = { category: [], count: 0 };
  try {
    var data = storage.getSync('save');

    newSave = data;
  } catch (error) {
    updatSave = true;
  }

  if (data != undefined) {
    if (!data.hasOwnProperty('category')) {
      console.log('Nao tem Category');
      newSave = { ...newSave, category: [] };
      updatSave = true;
    }

    if (!data.hasOwnProperty('count')) {
      console.log('Nao tem Count');
      newSave = { ...newSave, count: 0 };
      updatSave = true;
    }
  }

  if (updatSave) {
    storage.set('save', newSave, function (error) {
      if (error) throw error;
    });
    data = newSave;
  }
  console.log('Data lida na Main.js');
  return data;
});
