const { 
    getAllTables, 
    getTableValues,
    saveTable,
    dropTable
} = require('../model/tables')

//Получить список таблиц в БД
const handleGetAllTables = async () => {
    return await getAllTables()
}

//Данные о полях таблицы
const handlerGetTableValues = async (_event, tableName) => {
    return await getTableValues(tableName)
}

//Сохранить таблицу
const handlerSaveTable = async (_event, obj) => {
    return await saveTable(obj)
}

//Удалить таблицу
const handleDeleteTable = async (_event, tableName) => {
    return await dropTable(tableName)
} 

module.exports = { 
    handleGetAllTables,
    handlerGetTableValues,
    handlerSaveTable,
    handleDeleteTable
}