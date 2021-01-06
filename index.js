const { app, BrowserWindow } = require('electron');
const configExpress = require('./config/express');
const connection = require('./src/models/infrastructure/connection');
const Tables = require('./src/models/infrastructure/tables');

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
  win.loadFile('./src/views/index.html');
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

connection.connect( erro => {

    if(erro){
        console.log(erro);
    }else{
        console.log('connetion');
        
        Tables.init(connection);
        const aplication = configExpress();
        aplication.listen(3000, () => console.log('Server on port 3000'));
    }
});