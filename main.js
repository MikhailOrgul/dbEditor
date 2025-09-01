const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const controllers = require('./controllers/tablesController')

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		title: 'dbEditor',
		webPreferences:{
			preload: path.join(__dirname, 'preload.js')
		}
  	})
	win.setMenuBarVisibility(false)
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
ipcMain.handle('deleteTable', controllers.handleDeleteTable)
ipcMain.handle('updateENV', controllers.settingsUpdate)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin'){
		app.quit()
	}
})