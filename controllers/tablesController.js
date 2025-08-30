const { 
    createTable, 
    getAllTables, 
    alterTableColumns,
    getTableValues,

} = require('../model/tables')

//Получить список таблиц в БД
const handleGetAllTables = async () => {
    return await getAllTables()
}

//Создане таблицы
const handleCreateTable = async (tableName, cols, primeryKeyCol) => {
    const dataObj = {
        tableName: tableName,
        cols: cols.map(col => (col.name + ' ' + col.dataType + ',').toString()),
        primaryKeyCol: primeryKeyCol
    }
    
    return await createTable(dataObj)
}

//Изменение таблицы
const handleAlterTable = async (tableName, colName, dataType, method) => {
    const dataObj = {
        tableName: tableName,
        colName: colName,
        dataType: dataType,
        method: method
    }

    return await alterTableColumns(dataObj)
}

//Удаление таблицы
const handlerDropTable = async (_event, tableName) => {
    return await dropTable(_event, tableName)
}

const handlerGetTableValues = async (_event, tableName) => {
    return await getTableValues(tableName)
}

module.exports = { 
    handleCreateTable, 
    handleGetAllTables,
    handleAlterTable, 
    handlerDropTable,
    handlerGetTableValues,
    
}