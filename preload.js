const { ipcRenderer } = require('electron')
const { contextBridge } = require('electron/renderer')

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron
})

contextBridge.exposeInMainWorld('api', {
    getTables: () => ipcRenderer.invoke('getTables'),
    getDataFromTable: (tableName) => ipcRenderer.invoke('getDataFromTable', tableName),
    getDataFromClientForm: (tableName, columns) => ipcRenderer.invoke('getDataFromClientForm', { tableName, columns }),
    deleteTable: (tableName) => ipcRenderer.invoke('deleteTable', tableName),
    updateENV: (settingsObj) => ipcRenderer.invoke('updateENV', settingsObj),
})