const { ipcRenderer } = require('electron')
const { contextBridge } = require('electron/renderer')

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron
})

contextBridge.exposeInMainWorld('api', {
    getTables: () => ipcRenderer.invoke('getTables'),
    createTable: (tableName, cols, primeryKeyCol) => ipcRenderer.invoke('createTable', {tableName, cols, primeryKeyCol}),
    alterTable: (tableName, colName, dataType, method) => ipcRenderer.invoke('alterTable', {tableName, colName, dataType, method}),
    dropTable: (tableName) => ipcRenderer.invoke('dropTable', {tableName}),
    getDataFromTable: (tableName) => ipcRenderer.invoke('getDataFromTable', tableName)
})