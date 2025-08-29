const { 
    createTable, 
    getAllTables, 
    alterTableColumns, 
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
const handlerDropTable = async (tableName) => {
    return await dropTable(tableName)
}

module.exports = { 
    handleCreateTable, 
    handleGetAllTables,
    handleAlterTable, 
    handlerDropTable
}