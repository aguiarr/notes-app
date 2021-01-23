const { app, BrowserWindow } = require('electron');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 500,
    icon: "./config/img/icon.png",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true
    }
  });

  win.setResizable(false);
  win.removeMenu();
  win.loadFile('./src/index.html');
}
app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
