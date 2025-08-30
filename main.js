const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const controllers = require('./controllers/tablesController')

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences:{
			preload: path.join(__dirname, 'preload.js')
		}
  	})
	win.loadURL("http://localhost:5173")
}

app.whenReady().then(() => {
	createWindow()
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0){
			createWindow()
		}	
	})
})

ipcMain.handle('getTables', controllers.handleGetAllTables)
ipcMain.handle('getDataFromTable', controllers.handlerGetTableValues)
ipcMain.handle('getDataFromClientForm', controllers.handlerSaveTable)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin'){
		app.quit()
	}
})